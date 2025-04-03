import { Dropdown } from "primereact/dropdown";

type MaiSelectProps<T> = {
  data: T[];
  selectedValue: T | null;
  setSelectedValue: (value: T) => void;
  isLoading?: boolean;
  optionLabel?: string;
  optionValue?: keyof T;
  placeholder?: string;
};

const ValueTemplate = <T,>({
  option,
  props,
  optionLabel,
}: {
  option: T | null;
  props: { placeholder: string };
  optionLabel: keyof T;
}) => {
  if (!option) {
    return <span className="text-gray-400">{props.placeholder}</span>;
  }

  const label = option[optionLabel];
  const isTransactionType =
    option &&
    typeof option === "object" &&
    "value" in option &&
    (option["value"] === "EXPENSE" || option["value"] === "INCOME");

  const labelClass = isTransactionType ? "text-md lg:text-xl font-semibold" : "";

  return (
    <div className="flex items-center gap-2 text-gray">
      {option && typeof option === "object" && "emoji" in option && (
        <span>{(option as { emoji: string }).emoji}</span>
      )}
      <span className={`${labelClass}`}>{label as React.ReactNode}</span>
    </div>
  );
};

export const MaiSelect = <T,>({
  data,
  selectedValue,
  setSelectedValue,
  isLoading,
  optionLabel = "name",
  optionValue = "value" as keyof T,
  placeholder,
}: MaiSelectProps<T>) => {
  return (
    <Dropdown
      className="bg-transparent outline-none border-none focus:ring-0 shadow-none"
      options={data}
      optionLabel={optionLabel}
      optionValue={optionValue as string}
      placeholder={placeholder ?? "Selecciona una opción"}
      onChange={(e) => {
        const selected = data.find((item) => item[optionValue] === e.value);
        setSelectedValue(selected as T);
      }}
      value={selectedValue ? selectedValue[optionValue] : null}
      loading={isLoading}
      valueTemplate={(option, props) => (
        <ValueTemplate
          option={option}
          props={{
            ...props,
            placeholder: props.placeholder ?? "Selecciona una opción",
          }}
          optionLabel={optionLabel as keyof T}
        />
      )}
      pt={{
        root: {
          className: "bg-transparent border-none outline-none shadow-none",
        },
        input: {
          className: "text-white placeholder:text-gray-400",
        },
        trigger: {
          className: "text-white",
        },
      }}
    />
  );
};
