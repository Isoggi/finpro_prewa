import React from 'react';

type Props = { className?: string | undefined; lat: number; lng: number };

export default function MapLocation({ className, lat, lng }: Props) {
  return (
    <>
      <iframe
        title="maps"
        src={`https://maps.google.com/maps?q=${lat},${lng}&output=embed`}
        className={className || 'w-full h-64 mt-2'}
        allowFullScreen
      ></iframe>
    </>
  );
}
