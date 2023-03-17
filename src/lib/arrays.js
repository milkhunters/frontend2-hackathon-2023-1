export const group = (array, unwrap) => {
  const result = {};
  for (const value of array) {
    const key = unwrap(value);
    if (!result[key]) result[key] = [];
    result[key].push(value);
  }
  return result;
};
