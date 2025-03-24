type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  type?: "submit" | "button";
  width?: "full" | "max";
};

export const Button = ({
  children,
  onClick,
  className,
  variant = "primary",
  type = "button",
  width = "max",
}: ButtonProps) => {
  const baseStyles = `w-${width} py-4 px-8 rounded-lg text-white font-semibold transition-all`;
  const variantStyles = {
    primary:
      "bg-[#0f28b8] hover:bg-[#1a3ed1] focus:ring-4 focus:ring-[#1a3ed1]",
    secondary:
      "bg-[#f59e0b] hover:bg-[#f97316] focus:ring-4 focus:ring-[#f97316]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
