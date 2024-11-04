'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/config/axios.config';
import { MdDelete } from 'react-icons/md';

const DeletePeakSeason = ({
  id,
  start_date,
  end_date,
  rates,
  rateCategory,
}: {
  id: number;
  start_date: Date | string; // Allow Date or string if date parsing is needed
  end_date: Date | string;
  rates: number;
  rateCategory: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await api.delete(`/peak-season/${id}`);
      router.refresh(); // Consider alternatives if this is over-fetching
      setIsOpen(false);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to delete peak season');
      console.error('Delete error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={() => setIsOpen(true)}>
        <MdDelete size={20} />
      </button>

      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Are you sure you want to delete peak season from{' '}
              {new Date(start_date).toLocaleDateString()} to{' '}
              {new Date(end_date).toLocaleDateString()}?
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
                onClick={() => {
                  setIsOpen(false);
                  setError(null); // Clear error on close
                }}
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
      )}
    </div>
  );
};

export default DeletePeakSeason;
