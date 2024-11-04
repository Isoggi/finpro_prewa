import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

type MapProps = {
  lat: number;
  lng: number;
};

const Map = ({ lat, lng }: MapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', // Replace with your API key
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      center={{ lat, lng }}
      zoom={15}
      mapContainerClassName="w-full h-96 rounded-lg"
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
};

export default Map;
