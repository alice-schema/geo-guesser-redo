const rad = (x) => {
  return x * Math.PI / 180;
};

export const getDisplayDistance = (d) => {
  if (d > 1000) {
    return Math.round(d / 1000) + ' km'}
  return Math.round(d) + ' m'
}

export const getDistance = (p1, p2) => {
  const R = 6378137; // Earth’s mean radius in meter
  
  const dLat = rad(p2.lat - p1.lat);
  const dLong = rad(p2.lng- p1.lng);

  const a = Math.sin(dLat / 2)    * Math.sin(dLat / 2) +
            Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
            Math.sin(dLong / 2)   * Math.sin(dLong / 2);
  
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};