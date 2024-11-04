'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/config/axios.config';
import { MdDelete } from 'react-icons/md';
import type { IRooms } from '@/interfaces/room.interface';

const DeleteRoom = ({ id, name }: { id: number; name: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await api.delete(`/room/${id}`);
      router.refresh();
      setIsOpen(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete room');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={() => setIsOpen(true)}>
        <MdDelete size={20} />
      </button>

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete "{name}"?
          </h3>

          {error && (
            <div className="alert alert-error mt-4">
              <span>{error}</span>
            </div>
          )}

          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className={`btn btn-error ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRoom;
