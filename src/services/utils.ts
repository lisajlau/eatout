export const formatCurrencyToPounds = (x) => {
  return `£${Number.parseFloat(x).toFixed(2)}`;
};
