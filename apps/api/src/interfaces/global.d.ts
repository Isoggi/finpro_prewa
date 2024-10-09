import { IUser } from './user.interface';

declare global {
  namespace Express {
    interface Request {
      user?:
        | {
            id: number;
            name: string;
            email: string;
            password?: string;
            phone_number: string;
            user_role?: 'user' | 'tenant' | undefined;
            image?: string | undefined;
          }
        | IUser
        | undefined;
    }
  }
}
