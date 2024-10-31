import React, { useState } from 'react';

import { addDays, format } from 'date-fns';
import Calendar from './calendar/calendarDay';

type Props = {
  name: string;
  handleDate: () => void;
};

const DateRangePicker: React.FC<Props> = ({ name, handleDate }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Toggle calendar visibility
  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);

  // Callback to update selected dates
  const handleDateSelect = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    setIsCalendarOpen(false); // Close calendar after selection
  };

  // Format selected dates for display in input
  const formatDate = (date: Date | null) =>
    date ? format(date, 'MM/dd/yyyy') : '';

  return (
    <div className="relative">
      {/* Date Input */}
      <input
        title="Rentang tanggal"
        type="text"
        readOnly
        value={
          startDate && endDate
            ? `${formatDate(startDate)} - ${formatDate(endDate)}`
            : 'Pilih tanggal inap'
        }
        onClick={toggleCalendar}
        className="border p-2 w-full cursor-pointer"
      />

      {/* Calendar (conditionally rendered) */}
      {isCalendarOpen && (
        <div className="absolute top-full mt-2 z-10">
          <Calendar
            initialStartDate={startDate ?? new Date()}
            initialEndDate={endDate ?? addDays(new Date(), 1)}
            onDateSelect={handleDateSelect}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
