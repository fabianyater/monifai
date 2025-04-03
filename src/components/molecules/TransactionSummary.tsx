import { formatAmount } from "../../lib/helpers/formatAmount";
import { TransactionTypeSelector } from "../atoms/TransactionTypeSelector";

type TransactionSummaryProps = {
  amount: number;
};

export const TransactionSummary = ({ amount }: TransactionSummaryProps) => {
  return (
    <div className="flex flex-col">
      <TransactionTypeSelector />
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm lg:text-base text-center font-medium">
          Total{" "}
        </span>
        <span className="text-sm lg:text-base font-black">
          {formatAmount(amount)}
        </span>
      </div>
    </div>
  );
};
