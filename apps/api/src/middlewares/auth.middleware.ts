import { JWT_SECRET } from '../config';
import { ErrorHandler } from '../helpers/response.helper';
import { IUser } from '../interfaces/user.interface';
import { Request, Response, NextFunction } from 'express';
import { verify, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization, 'user-agent': userAgent } = req.headers;
    console.log('User Agent:', userAgent);
    const token = authorization?.replace('Bearer ', '');
    console.log('Extracted Token:', token);
    if (!token) {
      throw new ErrorHandler('Unauthorized: No token provided', 401);
    }
    req.user = verify(token, JWT_SECRET) as IUser;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return next(new ErrorHandler('Invalid token', 401));
    }
    if (error instanceof TokenExpiredError) {
      return next(new ErrorHandler('Token expired', 401));
    }
    next(error);
  }
};
