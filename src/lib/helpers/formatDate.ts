export const formatDate = (date: string | Date) => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("es-CO", options).format(dateObj);
};

export const formatDateWithTime = (date: string | Date) => {
  const dateObj = new Date(date);

  const dateFormatted = formatDate(dateObj);

  const timeFormatted = dateObj.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${dateFormatted}, ${timeFormatted.toLowerCase()}`;
};
