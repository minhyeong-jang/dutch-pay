export const uuidv4 = () => {
  return 'xxxx-xxxx-xxxx-xxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const formatNumber = (value: string): number => {
  return parseInt(value.replace(/[^0-9]/g, ''));
};

/**
 * Number 값을 가진 Object의 합을 return
 * @param obj
 * @returns number
 */
export const sumObjValue = (obj: { [key: string]: number }): number => {
  return Object.keys(obj).reduce(
    (sum, key) => sum + Math.floor(obj[key] || 0),
    0,
  );
};
