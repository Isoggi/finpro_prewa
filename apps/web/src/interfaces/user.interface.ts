export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  phone_number: string;
  user_role?: 'user' | 'tenant' | undefined;
  image?: string | undefined;
}

export enum users_role {
  user,
  tenant,
}
