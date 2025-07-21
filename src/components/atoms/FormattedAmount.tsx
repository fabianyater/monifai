import { useEffect, useState } from "react";

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
  const [displayAmount, setDisplayAmount] = useState(0);
  const duration = 1000; // Duración fija de 1 segundo

  useEffect(() => {
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const newAmount = Math.min(amount, (progress / duration) * amount);
      setDisplayAmount(newAmount);
      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [amount]);

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const parts = formatter.formatToParts(displayAmount);
  const intPart = parts
    .filter((p) => p.type === "integer" || p.type === "group")
    .map((p) => p.value)
    .join("");
  const decimalPart = parts.find((p) => p.type === "fraction")?.value ?? "";

  return (
    <span className="text-4xl lg:text-5xl font-bold">
      {currency}
      {intPart}
      <sup className="align-bottom font-normal ml-0.5">,{decimalPart}</sup>
    </span>
  );
};
