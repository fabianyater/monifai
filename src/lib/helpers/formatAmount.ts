export const formatAmount = (
  amount: number,
  locale: string = "es-CO",
  currency: string = "COP"
): string => {
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  if (currency) {
    options.style = "currency";
    options.currency = currency;
  }

  return new Intl.NumberFormat(locale, options).format(amount);
};
