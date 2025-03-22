import { InputText, InputTextProps } from "primereact/inputtext";

type InputProps = Pick<
  InputTextProps,
  "type" | "placeholder" | "value" | "required" | "onChange" | "name"
> & {
  label: string;
  error?: string;
};

export const Input = ({
  label,
  type = "text",
  placeholder,
  required,
  name,
  error,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <InputText
        name={name}
        id={name}
        required={required}
        type={type}
        placeholder={placeholder}
        invalid={!!error}
        {...props}
      />
      {error && <small className="text-red-500 break-words">{error}</small>}
    </div>
  );
};
