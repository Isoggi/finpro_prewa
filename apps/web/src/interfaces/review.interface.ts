import { User } from './user.interface';

export interface Review {
  id: number;
  comment: string;
  prev_review_id?: number;
  created_at?: Date;
  user: string;
}
