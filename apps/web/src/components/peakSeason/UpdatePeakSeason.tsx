'use client';
import { useState, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/config/axios.config';
import { FaEdit } from 'react-icons/fa';

type PeakSeason = {
  id: number;
  start_date: string;
  end_date: string;
  rates: number;
  rateCategory: string;
  room_id: number;
};

const UpdatePeakSeason = ({ peakSeason }: { peakSeason: PeakSeason }) => {
  const [startDate, setStartDate] = useState(peakSeason.start_date);
  const [endDate, setEndDate] = useState(peakSeason.end_date);
  const [rates, setRates] = useState(peakSeason.rates);
  const [rateCategory, setRateCategory] = useState(peakSeason.rateCategory);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await api.put(`/peak-season/${peakSeason.id}`, {
        start_date: startDate,
        end_date: endDate,
        rates,
        rateCategory,
      });

      router.refresh();
      setIsOpen(false);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error updating peak season');
      console.error('Error updating peak season:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModal = () => setIsOpen(!isOpen);

  return (
    <div>
      <button className="btn bg-[#62CDFF] btn-sm" onClick={handleModal}>
        <FaEdit size={20} />
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Peak Season</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Rates</label>
              <input
                type="number"
                value={rates}
                onChange={(e) => setRates(Number(e.target.value))}
                className="input input-bordered"
                placeholder="Rates"
                min="0"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Rate Category</label>
              <select
                value={rateCategory}
                onChange={(e) => setRateCategory(e.target.value)}
                className="select select-bordered"
                required
              >
                <option value="every">Every</option>
                <option value="once">Once</option>
              </select>
            </div>

            {error && (
              <div className="alert alert-error mt-4">
                <span>{error}</span>
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
                {isLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePeakSeason;
