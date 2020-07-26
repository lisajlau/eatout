export const formatCurrencyToPounds = (x) => {
  return `£${Number.parseFloat(x).toFixed(2)}`;
};

export const formatDateTime = (date: Date) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const dateTimeFormat = new Intl.DateTimeFormat("en-GB", options);
  return dateTimeFormat.format(date);
};
