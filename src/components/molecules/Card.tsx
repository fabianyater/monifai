interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "bordered";
  onClick?: () => void;
  isSelected?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
  onClick,
  isSelected
}) => {
  const baseStyles = "bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/10 group";
  const selectedStyles = "shadow-emerald-900/10 dark:bg-slate-900 dark:border-purple-600";

  const variantStyles = {
    default: "bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/20",
    glass: "backdrop-blur-lg bg-white/10 dark:bg-gray-800/40 shadow-xl",
    bordered:
      "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${
        isSelected ? selectedStyles : ""
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ children, className = "" }) => {
  return (
    <div
      className={`p-5 border-b border-gray-100 dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
};

export const CardTitle: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ children, className = "" }) => {
  return (
    <h3
      className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`}
    >
      {children}
    </h3>
  );
};

export const CardContent: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ children, className = "" }) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ children, className = "" }) => {
  return (
    <div
      className={`p-5 border-t border-gray-100 dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
