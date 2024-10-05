import prisma from '../prisma';
import { Prisma, users_role } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { Request } from 'express';
import fs from 'fs';
import { IUser } from '../interfaces/user.interface';
import { ErrorHandler } from '../helpers/response.helper';
import { generateToken } from '../libs/token.lib';

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
    const data: Prisma.UsersCreateInput = {
      name,
      email,
      phone_number,
      role: role.toLowerCase() as unknown as users_role,
      created_at: new Date().toUTCString(),
      updated_at: new Date().toUTCString(),
    };

    // if (req?.file) {
    //   const image = req.file;
    //   data.image = image.filename;
    // }

    await prisma.$transaction(async (trx) => {
      const newData = await trx.users.create({ data });
      return newData;
    });

    return null;
  }

  static async confirmPassword(req: Request) {
    const { password, token } = req.body;
    const hashPassword = await hash(password, 10);
    return hashPassword;
  }

  static async forgetPassword(req: Request) {}

  static async getProfile(req: Request) {
    try {
      if (req.user) {
        const { id } = req.user;
        const user = (await prisma.users.findFirst({
          where: { id: id },
        })) as IUser;
        if (!user) {
          throw new ErrorHandler('User not found', 404);
        }
        delete user.password;
        return user;
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
