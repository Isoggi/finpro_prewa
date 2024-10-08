import { IUser } from '../interfaces/user.interface';
import {
  JWT_SECRET,
  VERIFICATION_JWT_SECRET,
  FORGETPASSWORD_JWT_SECRET,
} from '../config';
import { sign, verify } from 'jsonwebtoken';

export const generateToken = (payload: any, expiresIn: string = '1hr') => {
  return sign(payload, JWT_SECRET, { expiresIn, algorithm: 'HS256' });
};

export const decodeToken = (token: string) => {
  return verify(token, JWT_SECRET) as IUser;
};

export const generateForgetPaswordToken = (
  payload: any,
  expiresIn: string = '1hr',
) => {
  return sign(payload, FORGETPASSWORD_JWT_SECRET, {
    expiresIn,
    algorithm: 'HS256',
  });
};

export const decodeForgetPasswordToken = (token: string) => {
  return verify(token, FORGETPASSWORD_JWT_SECRET) as IUser;
};

export const generateVerifyToken = (
  payload: any,
  expiresIn: string = '1hr',
) => {
  return sign(payload, VERIFICATION_JWT_SECRET, {
    expiresIn,
    algorithm: 'HS256',
  });
};
export const decodeVerifyToken = (token: string) => {
  return verify(token, VERIFICATION_JWT_SECRET) as IUser;
};
