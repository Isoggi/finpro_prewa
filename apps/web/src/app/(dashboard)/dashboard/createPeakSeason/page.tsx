import React from 'react';
import CategoryForm from '@/components/category/categoryForm';
import AvailabilityForm from '@/components/availability/availabilityForm';
import FormPeakSeason from '@/components/peakSeason/peakSeasonForm';
type Props = {};
export default function page() {
  return (
    <div>
      <FormPeakSeason />
    </div>
  );
}
