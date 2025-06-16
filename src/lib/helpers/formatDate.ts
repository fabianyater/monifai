export const formatDate = (date: string | Date, showDay: boolean = true) => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: showDay ? "numeric" : undefined,
    timeZone: "UTC",
  };

  return new Intl.DateTimeFormat("es-CO", options).format(dateObj);
};

export const formatDateWithTime = (date: string | Date) => {
  const dateObj = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Bogota",
  };

  return new Intl.DateTimeFormat("es-CO", options)
    .format(dateObj)
    .replace(",", ",");
};
