import prisma from '../prisma';
import { Prisma, users_role } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { Request } from 'express';
import fs from 'fs';
import { IUser } from '../interfaces/user.interface';
import { ErrorHandler } from '../helpers/response.helper';
import {
  sendForgetPasswordEmail as sendFPMail,
  sendVerificationEmail as sendVerifyMail,
} from '../libs/nodemailer.lib';
import {
  decodeForgetPasswordToken,
  decodeGeneralToken,
  decodeToken,
  decodeVerifyToken,
  generateForgetPaswordToken,
  generateGeneralToken,
  generateToken,
  generateVerifyToken,
} from '../libs/token.lib';
import {
  FORGETPASSWORD_URL_PATH,
  VERIFICATION_URL_PATH,
  WEB_URL,
} from '@/config';

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
      throw new ErrorHandler('Password incorrect', 400);
    } else if (!data.isVerified) {
      throw new ErrorHandler('User not verified', 400);
    } else {
      const user = {
        ...data,
        user_role: data.role as unknown as users_role,
        image: data.image,
      } as IUser;
      delete user.password;
      console.log('Masuk', user.name);
      return generateToken(user, '3h');
    }
  }
  static async register(req: Request) {
    const { name, email, phone_number, role } = req.body;
    // const user_role = role.toLowerCase() as unknown as users_role;
    const data: Prisma.UsersCreateInput = {
      name,
      email,
      phone_number,
      role: role.toLowerCase() as unknown as users_role,
      // tenant: user_role === 'tenant' ? {connectOrCreate:{accountNumber:'0213125678',bankAccount:'BCA'}} : undefined,
    };

    const result = await prisma.$transaction(async (trx) => {
      return await trx.users.create({ data });
    });

    const token = generateVerifyToken({
      id: generateGeneralToken(result.id.toString()),
      email: generateGeneralToken(result.email),
    });

    await prisma.$transaction(async (trx) => {
      return await trx.users.update({
        where: { id: result.id },
        data: { forget_password_token: token },
      });
    });

    sendVerifyMail(data.email, {
      email: data.email,
      verification_url: `${WEB_URL}${VERIFICATION_URL_PATH}${token}`,
    });

    return 'Email Send';
  }

  static async sendVerifyEmail(req: Request) {
    const { phone_number, email } = req.body;
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
    if (data.isVerified) {
      throw new ErrorHandler('User already verified', 400);
    }

    const token = generateVerifyToken({
      id: generateGeneralToken(data.id.toString()),
      email: generateGeneralToken(data.email),
    });

    await prisma.$transaction(async (trx) => {
      return await trx.users.update({
        where: { id: data.id },
        data: { forget_password_token: token },
      });
    });

    sendVerifyMail(data.email, {
      email: data.email,
      verification_url: `${WEB_URL}${VERIFICATION_URL_PATH}${token}`,
    });

    return 'Email Send';
  }

  static async confirmPassword(req: Request) {
    const { password, token } = req.body;
    const userData = decodeVerifyToken(token);
    if (!userData) {
      throw new ErrorHandler('Invalid token', 400);
    }
    const data = await prisma.users.findUnique({
      where: { id: Number(decodeGeneralToken(userData.id)) },
      select: {
        id: true,
        forget_password_token: true,
        isVerified: true,
      },
    });
    if (data) {
      if (token == data.forget_password_token) {
        const hashPassword = await hash(password, 10);
        await prisma.$transaction(async (trx) => {
          return await trx.users.update({
            where: { id: data.id },
            data: {
              password: hashPassword,
              isVerified: true,
              verified_at: new Date().toISOString(),
              forget_password_token: null,
            },
          });
        });
        return 'Verify success';
      }
      throw new ErrorHandler('Invalid Token', 400);
    }
    throw new ErrorHandler('User not found', 404);
  }

  static async sendForgetPasswordEmail(req: Request) {
    try {
      const { email } = req.body;
      console.log('cek email lupa passwor:', email);
      if (email) {
        const user = await prisma.users.findUnique({
          where: { email: email },
        });
        if (!user) {
          throw new ErrorHandler('User not found', 404);
        }
        const token = generateForgetPaswordToken({
          id: generateGeneralToken(user.id.toString()),
          email: generateGeneralToken(email),
        });
        console.log('token:', token);
        await prisma.$transaction(async (trx) => {
          await trx.users.update({
            where: { email: email },
            data: { forget_password_token: token },
          });
        });
        sendFPMail(email, {
          email,
          forgetPasswordUrl: `${WEB_URL}${FORGETPASSWORD_URL_PATH}${token}`,
        });
        return true;
      } else {
        throw new ErrorHandler('Bad Request: Email is required', 400);
      }
    } catch (error) {
      throw new ErrorHandler(error, 500);
    }
  }

  static async forgetPassword(req: Request) {
    const { password, token } = req.body;
    const userData = decodeForgetPasswordToken(token);
    if (!userData) {
      throw new ErrorHandler('Invalid token', 400);
    }
    const userId = Number(decodeGeneralToken(userData.id));
    const data = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        forget_password_token: true,
      },
    });

    if (data) {
      const isMatch = token === data.forget_password_token;
      if (isMatch) {
        const hashPassword = await hash(password, 10);
        await prisma.$transaction(async (trx) => {
          return await trx.users.update({
            where: { id: data.id },
            data: { password: hashPassword },
          });
        });
      } else {
        throw new ErrorHandler('Invalid token', 400);
      }
    } else {
      throw new ErrorHandler('User not found', 404);
    }
    return 'Password changed successfully';
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

  static async refreshJWT(req: Request) {
    const { user, body } = req;
    const { token } = body;
    delete user?.password;
    if (user) {
      console.log('refresh-token: user');
      return generateToken(user, '3h');
    } else {
      console.log('refresh-token: token');
      return generateToken(decodeToken(token), '3h');
    }
  }
}
