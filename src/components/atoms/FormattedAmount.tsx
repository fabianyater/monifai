type FormattedAmountProps = {
  amount: number;
  currency?: string;
  locale?: string; // Opcional: en, es, fr, etc.
};

export const FormattedAmount = ({
  amount,
  currency = "$",
  locale = "es-CO",
}: FormattedAmountProps) => {
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const parts = formatter.formatToParts(amount);
  const intPart = parts
    .filter((p) => p.type === "integer" || p.type === "group")
    .map((p) => p.value)
    .join("");
  const decimalPart = parts.find((p) => p.type === "fraction")?.value ?? "";

  return (
    <span className="text-6xl font-bold">
      {currency}
      {intPart}
      <sup className="align-bottom font-normal ml-0.5">,{decimalPart}</sup>
    </span>
  );
};
