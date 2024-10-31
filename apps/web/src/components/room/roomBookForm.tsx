import { showAlert } from '@/lib/utils';
import React from 'react';
import DateRangePicker from '../DatePickerRange';
import { api } from '@/config/axios.config';

type Props = { room_id: number };

export default function RoomBookForm({}: Props) {
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const handleDate = () => {};
  const handleSubmit = async () => {
    try {
      await api.post('');
      showAlert({
        title: 'Berhasil booking!',
        text: 'Tunggu kami arahkan ke halaman pembayaran...',
        icon: 'success',
      });
    } catch (error) {
      showAlert({
        title: 'Gagal!',
        text: 'Sepertinya ada masalah',
        icon: 'error',
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <DateRangePicker name={'bookingDate'} handleDate={handleDate} />
        <button
          type="submit"
          title="booking"
          className="btn btn-sm btn-primary"
        ></button>
      </form>
    </div>
  );
}
