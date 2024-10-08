type Coordinate = {
  lat: number;
  lon: number;
};
const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

export const getDistance = async (coords1: Coordinate, coords2: Coordinate) => {
  const R = 6371; // Radius of the Earth in km
  const lat1 = toRadians(coords1.lat);
  const lon1 = toRadians(coords1.lon);
  const lat2 = toRadians(coords2.lat);
  const lon2 = toRadians(coords2.lon);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in km
  return distance;
};
