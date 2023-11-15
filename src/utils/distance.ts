export function getDistanceFromLatLonInKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  const EARTH_RADIUS = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = EARTH_RADIUS * c;
  return d;
}

