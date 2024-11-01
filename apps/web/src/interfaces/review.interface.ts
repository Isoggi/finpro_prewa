import { User } from './user.interface';

export interface Review {
  id: number;
  rating?: number;
  comment: string;
  prev_review_id?: number;
  created_at?: Date;
  updated_at?: Date;
  User: User;
}
