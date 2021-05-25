export const getRandomSet = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

export const calculateScore = (distance) => {
  const maxDistance = 5000; //km
  const distFromMax = maxDistance - distance/1000;
  return distFromMax > 0 ? Math.round(distFromMax) : 0
}