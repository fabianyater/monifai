import React from "react";
import { TransactionType } from "../../lib/types/Transactions";

interface ToggleButtonProps {
  value: TransactionType;
  onChange?: (value: TransactionType) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ value, onChange }) => {
  const toggleValue = () =>
    onChange?.(value === "EXPENSE" ? "INCOME" : "EXPENSE");

  const backgroundColor = value === "INCOME" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className="relative w-[100px] h-[48px] bg-[#1c1c1c] rounded-xl p-2 select-none flex items-center justify-between text-2xl cursor-pointer"
      onClick={toggleValue}
    >
      <div
        className={`w-10 h-10 flex items-center justify-center z-10 font-bold transition-colors duration-300 ${
          value === "EXPENSE" ? "text-black" : "text-white"
        }`}
      >
        <i className="pi pi-minus"></i>
      </div>
      <div
        className={`w-10 h-10 flex items-center justify-center z-10 font-bold transition-colors duration-300 ${
          value === "INCOME" ? "text-black" : "text-white"
        }`}
      >
        <i className="pi pi-plus"></i>
      </div>
      <div
        className={`absolute h-10 w-10 rounded-md ${backgroundColor} transition-all duration-300 ease-in-out z-0 ${
          value === "INCOME" ? "left-[48px]" : "left-2"
        }`}
      />
    </div>
  );
};

export default ToggleButton;
