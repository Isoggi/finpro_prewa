'use client';
import React, { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isBefore,
  isSameDay,
  differenceInDays,
  isWithinInterval,
} from 'date-fns';
import CalendarDay from './calendarDayCell';
import {
  IAvailability,
  IPeakSeasonRate,
} from '@/interfaces/property.interface';

interface DateInfo {
  date: Date;
  price: number;
  available: boolean;
  discountRate?: number;
}

interface CalendarProps {
  initialStartDate?: Date;
  initialEndDate?: Date;
  onDateSelect: (start: Date, end: Date) => void;
  availability?: IAvailability[];
  peakSeasonRate?: IPeakSeasonRate[];
}

const Calendar: React.FC<CalendarProps> = ({
  initialStartDate,
  initialEndDate,
  onDateSelect,
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  // Update start and end dates when props change
  React.useEffect(() => {
    setStartDate(initialStartDate || null);
    setEndDate(initialEndDate || null);
  }, [initialStartDate, initialEndDate]);

  // Utility functions for navigation
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Get the start and end dates of the current month and ensure we include extra days to fill the weeks
  const startDateOfCalendar = startOfWeek(startOfMonth(currentMonth));
  const endDateOfCalendar = endOfWeek(endOfMonth(currentMonth));

  // Generate dates for the calendar display, including padding days from previous/next months
  const days = eachDayOfInterval({
    start: startDateOfCalendar,
    end: endDateOfCalendar,
  });
  const dates: DateInfo[] = days.map((date) => ({
    date,
    price: 0,
    available: Math.random() > 0.3,
    discountRate:
      Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 10 : undefined,
  }));

  // Calculate the total days between startDate and endDate
  const totalDays =
    startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;

  // Handle date selection
  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (isBefore(date, startDate)) {
        setStartDate(date);
      } else {
        setEndDate(date);
        onDateSelect(startDate, date); // Trigger callback with selected dates
      }
    }
  };

  return (
    <div className="calendar-component p-4 bg-white rounded shadow-md">
      {/* Month and Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-xl">
          &#8592;
        </button>
        <h2 className="text-2xl font-bold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button onClick={nextMonth} className="text-xl">
          &#8594;
        </button>
      </div>

      {/* Display total days if range is selected */}
      {startDate && endDate && (
        <div className="text-center text-gray-700 mb-4">
          Total Days Selected: {totalDays}
        </div>
      )}

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-2 text-center text-gray-600 mb-2">
        {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jumat', 'Sab'].map((day) => (
          <div key={day} className="font-semibold">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {dates.map((dayInfo, index) => (
          <CalendarDay
            key={index}
            dayInfo={dayInfo}
            isSelected={
              (!!startDate && isSameDay(dayInfo.date, startDate)) ||
              (!!endDate && isSameDay(dayInfo.date, endDate))
            }
            isInRange={
              !!startDate &&
              !!endDate &&
              isWithinInterval(dayInfo.date, { start: startDate, end: endDate })
            }
            onClick={() => handleDateClick(dayInfo.date)}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
