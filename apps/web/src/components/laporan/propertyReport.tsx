'use client';
import React from 'react';
import CalendarDay from '../calendar/calendarDay';

type Props = {};

export default function propertyReport({}: Props) {
  return (
    <div>
      <CalendarDay onDateSelect={() => {}} />
    </div>
  );
}
