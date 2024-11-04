'use client';
import { useState, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/config/axios.config';
import type { Rooms } from '@prisma/client';

const AddPeakSeason = ({ rooms }: { rooms: Rooms[] }) => {
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [rates, setRates] = useState('');
  const [rateCategory, setRateCategory] = useState('');
  const [room, setRoom] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!start_date || !end_date || !rates || !rateCategory || !room) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    try {
      await api.post('/peak-season', {
        start_date: start_date,
        end_date: end_date,
        rates: Number(rates),
        rateCategory: rateCategory,
        room_id: Number(room),
      });

      setSuccess('Availability added successfully!');
      router.refresh();
      setStart_date('');
      setEnd_date('');
      setRates('');
      setRateCategory('');
      setRoom('');
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(null);
      }, 1500);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'An error occurred while adding availability';
      setError(errorMessage);
      console.error('Error adding availability:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn bg-[#62CDFF]" onClick={handleModal}>
        Add Peak Season
      </button>

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Peak Season</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={start_date}
                onChange={(e) => setStart_date(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={end_date}
                onChange={(e) => setEnd_date(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">
                Rates <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={rates}
                onChange={(e) => setRates(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">
                Rate Catego <span className="text-red-500">*</span>
              </label>
              <select
                value={rateCategory}
                onChange={(e) => setRateCategory(e.target.value)}
                className="select select-bordered"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="every">Every</option>
                <option value="once">Once</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">
                Room <span className="text-red-500">*</span>
              </label>
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="select select-bordered"
                required
              >
                <option value="" disabled>
                  Select a room
                </option>
                {rooms.map((room) => (
                  <option value={room.id} key={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="alert alert-error mt-4">
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="alert alert-success mt-4">
                <span>{success}</span>
              </div>
            )}

            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button
                type="submit"
                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPeakSeason;
