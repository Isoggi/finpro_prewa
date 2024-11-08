import { api } from '@/config/axios.config';
import React from 'react';

type Props = {
  token: string;
  trx_id?: string;
  prop_id?: string;
  prev_review_id?: number;
};

interface Comment {
  text: string;
  time: string | undefined;
  id: number;
  user: string;
}

export default function ReviewBox({
  token,
  trx_id,
  prop_id,
  prev_review_id,
}: Props) {
  const [newComment, setNewComment] = React.useState('');
  const [done, setDone] = React.useState<boolean>(false);
  const addComment = async () => {
    if (!newComment.trim()) return;
    const response = await api.post(
      '/review',
      {
        text: newComment,
        transaction_id: trx_id,
        property_id: prop_id,
        prev_review_id: prev_review_id,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (response.data.data) {
      setDone(true);
    }
    setNewComment('');
  };

  return (
    <>
      {!done && (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="input input-bordered w-full"
          />
          <button
            title="tambah komentar"
            onClick={addComment}
            className="btn btn-primary"
          >
            Tambahkan
          </button>
        </div>
      )}
    </>
  );
}
