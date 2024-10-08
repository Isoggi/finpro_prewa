import prisma from '../prisma';
import { Prisma, users_role } from '@prisma/client';
import { compare, hash,  } from 'bcrypt';
import { Request } from 'express';
import fs, { readSync } from 'fs';
import { IUser } from '../interfaces/user.interface';
import { ErrorHandler } from '../helpers/response.helper';
import {
  sendForgetPasswordEmail as sendFPMail,
  sendVerificationEmail as sendVerifyMail,
} from '../libs/nodemailer.lib';
import { generateForgetPaswordToken, generateToken } from '../libs/token.lib';
import { FORGETPASSWORD_URL_PATH, WEB_URL } from '@/config';

export class AuthService {
  static async login(req: Request) {
    const { phone_number, password, email } = req.body;
    const data = await prisma.users.findFirst({
      where: { OR: [{ phone_number: phone_number }, { email: email }] },

      select: {
        id: true,
        email: true,
        name: true,
        phone_number: true,
        image: true,
        role: true,
        password: true,
        isVerified: true,
      },
    });
    if (!data) {
      throw new ErrorHandler('User not found', 404);
    }
    const isMatch = await compare(password, String(data.password));
    if (!isMatch) {
      data.isVerified;
      throw new ErrorHandler('Password incorrect', 400);
    } else {
      const user = {
        ...data,
        user_role: data.role as unknown as users_role,
        image: data.image,
      } as IUser;
      delete user.password;
      return generateToken(user, '3h');
    }
  }
  static async register(req: Request) {
    const { name, email, phone_number, role } = req.body;
    const user_role = role.toLowerCase() as unknown as users_role;
    // if(user_role === 'tenant')
    const data: Prisma.UsersCreateInput = {
      name,
      email,
      phone_number,
      role: role.toLowerCase() as unknown as users_role,
      created_at: new Date().toUTCString(),
      updated_at: new Date().toUTCString(),
      tenant: user_role === 'tenant' ? {} : undefined 
    };

    
    const result = await prisma.$transaction(async (trx) => {
      const newData = await trx.users.create({ data });
      return newData;
    });

    sendVerifyMail(result.email, {
      email: result.email,
      verification_url: `${WEB_URL}${FORGETPASSWORD_URL_PATH}${generateForgetPaswordToken(
        {
          id: await hash(result.id.toString(), 10),
          email: await hash(result.email, 10),
        },
      )}`,
    });

    return null;
  }
  static async sendVerifyEmail(req: Request) {}

  static async confirmPassword(req: Request) {
    const { password, token, id } = req.body;
    const data = await prisma.users.findUnique({
      where: { id },
      select: {
        forget_password_token: true,
        isVerified: true,
      },
    });
    if (data) {
      
      const isMatch = token == data.forget_password_token;
      const hashPassword = await hash(password, 10);
      const result = await prisma.$transaction(async (trx) => {
        return await trx.users.update({
          where: { id },
          data: { password: isMatch ? hashPassword : undefined },
        });
      });
      return result;
    }
    return null;
  }

  static async sendForgetPasswordEmail(req: Request) {
    try {
      if (req.user) {
        const { user } = req;
        const result = await prisma.$transaction(async (trx) => {
          const userData = (await trx.users.update({
            where: { id: user.id, isVerified: true },
            data: {
              forget_password_token: generateForgetPaswordToken({
                id: await hash(user.id, 10),
                email: await hash(user.email, 10),
              }),
            },
          })) as IUser;
          if (!userData) {
            throw new ErrorHandler('User not found', 404);
          }
          sendFPMail(userData.name, {
            email: userData.email,
            forgetPasswordUrl: `${WEB_URL}${FORGETPASSWORD_URL_PATH}${result}`,
          });
        });
        return true;
      } else {
        throw new ErrorHandler('Unauthorized', 401);
      }
    } catch (error) {
      throw new ErrorHandler(error, 500);
    }
  }

  static async forgetPassword(req: Request) {
    const { password, token, id } = req.body;
    const data = await prisma.users.findUnique({
      where: { id },
      select: {
        forget_password_token: true,
      },
    });
    if (data) {
      const isMatch = token == data.forget_password_token;
      const hashPassword = await hash(password, 10);
      const result = await prisma.$transaction(async (trx) => {
        return await trx.users.update({
          where: { id },
          data: { password: isMatch ? hashPassword : undefined },
        });
      });
      return result;
    }
    return null;
  }

  static async getProfile(req: Request) {
    try {
      if (req.user) {
        const { user } = req;
        const userData = (await prisma.users.findFirst({
          where: { id: user.id },
        })) as IUser;
        if (!userData) {
          throw new ErrorHandler('User not found', 404);
        }
        delete userData.password;
        return userData;
      } else {
        throw new ErrorHandler('Unauthorized', 401);
      }
    } catch (error) {
      throw new ErrorHandler(error, 500);
    }
  }

  static async updateProfile(req: Request) {
    const data = req.body as IUser;
    if (req.file) {
      data.image = req.file.filename;
    }
    console.log(req);
    if (req.user) {
      const { id } = req.user;
      const exist = await prisma.users.findUnique({
        where: { id: id },
      });
      if (!exist) {
        throw new ErrorHandler('User not found', 404);
      }
      await prisma.users.update({
        where: { id: id },
        data: {
          name: data.name,
          email: data.email,
          phone_number: data.phone_number,
          image: data.image,
        },
      });

      if (exist.image && data.image && exist.image !== data.image)
        fs.unlink(
          __dirname + '/../public/images/avatars/' + exist.image,
          (err: unknown) => {
            if (err) console.log(err);
          },
        );

      const user = (await prisma.users.findUnique({
        where: {
          id,
        },
      })) as IUser;
      delete user.password;
      const token = generateToken(user, '2d');
      return token;
    } else {
      throw new ErrorHandler('Unauthorized', 401);
    }
  }
}
