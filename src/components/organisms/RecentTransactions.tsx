import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { formatCurrency } from "../../lib/helpers/formatAmount";
import { formatDateWithTime } from "../../lib/helpers/formatDate";
import { useLatestTransactions } from "../../services/transactions/queries";
import Card, { CardContent, CardHeader, CardTitle } from "../molecules/Card";

interface RecentTransactionsProps {
  pocketId: number;
}

const RecentTransactions = ({ pocketId }: RecentTransactionsProps) => {
  const { queryFn, queryKey } = useLatestTransactions(pocketId);
  const { data: transactions } = useQuery({
    queryKey,
    queryFn,
    enabled: !!pocketId,
  });

  const navigate = useNavigate();

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Transacciones Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions?.map((transaction) => {
            return (
              <div
                key={transaction.id}
                className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  {transaction.type === "EXPENSE" ? (
                    <i className="pi pi-arrow-up-right text-xl text-red-500" />
                  ) : (
                    <i className="pi pi-arrow-down-left text-xl text-green-500" />
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDateWithTime(transaction.date)}
                  </p>
                </div>

                <div
                  className={`text-right ${
                    transaction.type === "EXPENSE"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  <p className="font-medium">
                    {transaction.type === "EXPENSE" ? "-" : "+"}
                    {formatCurrency(transaction.value)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {transaction.category}
                  </p>
                </div>
              </div>
            );
          })}

          {transactions?.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400">
                No hay transacciones recientes
              </p>
            </div>
          )}

          {transactions && transactions?.length > 0 && (
            <button
              className="w-full mt-4 py-2 text-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
              onClick={() => navigate("/transactions/all")}
            >
              Ver todas las transacciones
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
