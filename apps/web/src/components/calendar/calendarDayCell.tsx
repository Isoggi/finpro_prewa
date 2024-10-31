import { format, isSameMonth } from 'date-fns';
import React from 'react';

interface DateInfo {
  date: Date;
  price: number;
  available: boolean;
  discountRate?: number;
}
interface CalendarDayProps {
  dayInfo: DateInfo;
  isSelected: boolean;
  isInRange: boolean;
  onClick: () => void;
}

const CalendarDayCell: React.FC<CalendarDayProps> = ({
  dayInfo,
  isSelected,
  isInRange,
  onClick,
}) => {
  const isCurrentMonth = isSameMonth(dayInfo.date, new Date());
  return (
    <div
      onClick={onClick}
      className={`day-cell p-2 text-center rounded relative cursor-pointer
      ${isSelected ? 'bg-blue-500 text-white' : isInRange ? 'bg-blue-200' : dayInfo.available ? 'bg-green-200' : 'bg-gray-200'}
      ${!isCurrentMonth ? 'text-gray-400' : ''}`}
    >
      <span>
        {
          format(new Date(dayInfo.date), 'dd')
          // .toLocaleString('id-ID', { weekday: 'long' })
        }
      </span>
      {dayInfo.discountRate && (
        <span className="discount-badge bg-red-500 text-white rounded-full text-xs px-2 absolute top-1 right-1">
          {dayInfo.price + dayInfo.discountRate}
        </span>
      )}
    </div>
  );
};

export default CalendarDayCell;
