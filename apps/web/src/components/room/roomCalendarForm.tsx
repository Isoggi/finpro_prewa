import React, { useState } from 'react';

interface CalendarDate {
  date: Date;
  availability: number | null; // for example, availability as a number of rooms
  peakSeasonRate: number | null; // rate for the peak season
}

interface CalendarProps {
  // any props you want to pass into the calendar
}

const BookingCalendar: React.FC<CalendarProps> = () => {
  // State to store each date's availability and peak season rate
  const [calendarData, setCalendarData] = useState<
    Record<string, CalendarDate>
  >({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availability, setAvailability] = useState<number | null>(null);
  const [peakSeasonRate, setPeakSeasonRate] = useState<number | null>(null);

  // Handler for date click
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const dateKey = date.toDateString();
    const selectedDateData = calendarData[dateKey] || {
      date,
      availability: null,
      peakSeasonRate: null,
    };
    setAvailability(selectedDateData.availability);
    setPeakSeasonRate(selectedDateData.peakSeasonRate);
  };

  // Save availability and rate for the selected date
  const handleSave = () => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toDateString();
    setCalendarData((prevData) => ({
      ...prevData,
      [dateKey]: {
        date: selectedDate,
        availability,
        peakSeasonRate,
      },
    }));
    // Reset inputs
    setSelectedDate(null);
    setAvailability(null);
    setPeakSeasonRate(null);
  };

  return (
    <div>
      {/* Calendar rendering (for simplicity, showing dates as buttons) */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 30 }).map((_, i) => {
          const date = new Date();
          date.setDate(i + 1);
          const dateKey = date.toDateString();
          const data = calendarData[dateKey];

          return (
            <button
              key={i}
              onClick={() => handleDateClick(date)}
              className={`p-2 border ${data?.availability ? 'bg-green-200' : 'bg-gray-200'}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Input form for availability and peak season rate */}
      {selectedDate && (
        <div className="mt-4 p-4 border">
          <h3>
            Set Availability and Peak Season Rate for{' '}
            {selectedDate.toDateString()}
          </h3>
          <label>
            Availability:
            <input
              type="number"
              value={availability || ''}
              onChange={(e) => setAvailability(Number(e.target.value))}
              className="border ml-2"
            />
          </label>
          <br />
          <label>
            Peak Season Rate:
            <input
              type="number"
              value={peakSeasonRate || ''}
              onChange={(e) => setPeakSeasonRate(Number(e.target.value))}
              className="border ml-2"
            />
          </label>
          <br />
          <button
            onClick={handleSave}
            className="mt-2 bg-blue-500 text-white p-2 rounded"
          >
            Save
          </button>
        </div>
      )}

      {/* Display saved data for debugging */}
      <div className="mt-4">
        <h3>Current Calendar Data:</h3>
        <pre>{JSON.stringify(calendarData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default BookingCalendar;
