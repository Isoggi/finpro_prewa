'use client';
import { api } from '@/config/axios.config';
import { Review } from '@/interfaces/review.interface';
import React from 'react';
import { UserChatReview } from './chatReview';

type Props = { property_slug: string };

export default function ReviewContainer({ property_slug }: Props) {
  const [firstReview, setFirstReview] = React.useState<Review[]>([]);
  React.useEffect(() => {
    const fetchReview = async () => {
      const response = await api.get(`/review/${property_slug}`);
      setFirstReview(response.data.data as Review[]);
    };
    fetchReview();
  }, []);
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md shadow-lg bg-base-100">
      {firstReview.length > 0 &&
        firstReview.map((review, index) => (
          <UserChatReview
            key={index}
            id={review.id}
            text={review.comment}
            time={review.created_at}
            user={review.User.name}
          />
        ))}
    </div>
  );
}
