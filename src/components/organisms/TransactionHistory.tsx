import { GoalTransactionsResponse } from "../../lib/types/Goal";
import { TransactionItem } from "../molecules/TransactionItem";

type TransactionHistoryProps = {
  isLoading: boolean;
  isError: boolean;
  transactions: GoalTransactionsResponse[];
};

export const TransactionHistory = ({
  isLoading,
  isError,
  transactions,
}: TransactionHistoryProps) => {
  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return <div className="text-red-500">Error al cargar los pagos</div>;

  if (!transactions.length)
    return <div className="text-neutral-400">No hay pagos registrados</div>;

  return transactions?.map((transaction) => (
    <TransactionItem key={transaction.id} transaction={transaction} />
  ));
};
