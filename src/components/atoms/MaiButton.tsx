import { Button, ButtonProps } from "primereact/button";

type MaiButtonProps = Pick<
  ButtonProps,
  | "label"
  | "type"
  | "icon"
  | "size"
  | "onClick"
  | "rounded"
  | "style"
  | "severity"
  | "className"
> & {};

export const MaiButton = ({
  label,
  type,
  icon,
  size,
  onClick,
  rounded,
  style,
  severity,
  className
}: MaiButtonProps) => {
  return (
    <Button
      label={label}
      type={type}
      icon={icon}
      size={size}
      rounded={rounded}
      style={style}
      severity={severity}
      onClick={onClick}
      className={className}
    />
  );
};
