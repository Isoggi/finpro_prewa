'use client';
import { useState, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/config/axios.config';
import type { Rooms } from '@prisma/client';

const AddAvailability = ({ rooms }: { rooms: Rooms[] }) => {
  const [stock, setStock] = useState('');
  const [date, setDate] = useState('');
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

    // Validate input
    if (!stock || !date || !room) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    try {
      await api.post('/availability', {
        stock: Number(stock),
        date: date,
        room_id: Number(room), // Changed from roomId to room_id
      });

      setSuccess('Availability added successfully!');
      router.refresh();
      // Reset form fields
      setStock('');
      setDate('');
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
      <button className="btn" onClick={handleModal}>
        Add New Availability
      </button>

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Availability</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="input input-bordered"
                placeholder="Stock"
                required
                min="0"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input input-bordered"
                required
              />
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

export default AddAvailability;
