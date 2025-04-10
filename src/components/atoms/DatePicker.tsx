import { ChangeEvent, useRef, useState } from "react";

type DatePickerProps = {
  value: string;
  onChange: (date: string) => void;
};

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(false);
  };

  const handleToggle = () => {
    inputRef.current?.showPicker?.();
    inputRef.current?.focus();
    setIsOpen(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 150);
  };

  const getRelativeDateLabel = (dateStr: string): string => {
    const today = new Date();
    const selected = new Date(dateStr);
    const diffTime = selected.getTime() - today.setHours(0, 0, 0, 0);
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoy";
    if (diffDays === -1) return "Ayer";
    if (diffDays === 1) return "Mañana";

    return selected.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const displayValue = value ? getRelativeDateLabel(value) : "";

  return (
    <div
      className="relative inline-flex items-center"
      onClick={handleToggle}
      onBlur={handleBlur}
    >
      <input
        type="text"
        readOnly
        value={displayValue}
        placeholder="Selecciona una fecha"
        className="bg-[#1a1a1a] text-white pr-10 pl-1 py-2 rounded cursor-pointer min-w-0"
        
      />
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <svg
          className={`w-4 h-4 text-white transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={handleChange}
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
      />
    </div>
  );
}
