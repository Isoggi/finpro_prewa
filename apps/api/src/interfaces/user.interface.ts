export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  phone_number: string;
  user_role?: 'user' | 'tenant' | undefined;
  image?: string | undefined;
}
