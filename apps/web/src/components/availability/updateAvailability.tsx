'use client';
import { useState, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/config/axios.config';
import { FaEdit } from 'react-icons/fa';

type Availability = {
  id: number;
  room_id: number;
  stock: number;
  date: string; // Assuming date is stored as a string
};

const UpdateAvailability = ({
  availability,
}: {
  availability: Availability;
}) => {
  const [stock, setStock] = useState(availability.stock);
  const [date, setDate] = useState(availability.date);
  const [isCanceled, setIsCanceled] = useState(availability);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.put(`/availability/${availability.id}`, {
        stock,
        date,
      });

      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating availability:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModal = () => setIsOpen(!isOpen);

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        <FaEdit size={20} />
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Availability</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="input input-bordered"
                placeholder="Stock"
                min="0"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {isLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAvailability;
