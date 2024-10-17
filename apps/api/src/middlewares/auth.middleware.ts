import { JWT_SECRET } from '../config';
import { ErrorHandler } from '../helpers/response.helper';
import { IUser } from '../interfaces/user.interface';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    const token = authorization?.replace('Bearer ', '');
    console.log(token);

    if (!token) throw new ErrorHandler('unauthorized', 401);
    req.user = verify(token, JWT_SECRET) as IUser;
    next();
  } catch (error) {
    next(error);
  }
};
