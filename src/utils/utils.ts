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
