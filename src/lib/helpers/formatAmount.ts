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

export const formatCurrency = (
  amount: number, 
  currency: string = 'COP', 
  locale: string = 'es-CO'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
};
