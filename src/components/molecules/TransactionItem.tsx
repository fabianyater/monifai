import { formatAmount } from "../../lib/helpers/formatAmount";
import { formatDateWithTime } from "../../lib/helpers/formatDate";
import { GoalTransactionsResponse } from "../../lib/types/Goal";

type TransactionItemProps = {
  transaction: GoalTransactionsResponse;
};

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  return (
    <div className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-gray-600 hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
      <div className="w-full flex gap-4 items-center justify-between">
        <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
          {transaction.emoji}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">
            {transaction.categoryName}
          </span>
          <span className="text-sm text-neutral-400">{transaction.name}</span>
        </div>
        <div className="flex flex-col items-end ml-auto">
          <span>{formatAmount(transaction.amount, undefined, "COP")}</span>
          <span className="text-sm text-neutral-400">
            {formatDateWithTime(transaction.date)}
          </span>
        </div>
      </div>
    </div>
  );
};
