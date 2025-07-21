import { useQuery } from "@tanstack/react-query";
import { PocketSelector } from "../components/atoms/PocketSelector";
import { MonthSelector } from "../components/molecules/MonthSelector";
import { formatAmount } from "../lib/helpers/formatAmount";
import { formatDateWithTime } from "../lib/helpers/formatDate";
import { useDateSelectorStore } from "../lib/store/useDateSelectorStore";
import { usePocketStore } from "../lib/store/usePocketStore";
import { useTransactions } from "../services/transactions/queries";

export const TransactionsPage = () => {
  const selectedPocket = usePocketStore((state) => state.selectedPocket);
  const pocketId = selectedPocket?.id ?? 0;
  const startDate = useDateSelectorStore((state) => state.date);

  const { queryFn, queryKey } = useTransactions(pocketId, startDate);
  const { data: transactions } = useQuery({
    queryKey,
    queryFn,
    enabled: !!pocketId,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <PocketSelector />
      </div>
      <div className="lg:col-span-2">
        <MonthSelector />
      </div>
      <div className="lg:col-span-3">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-semibold text-3xl tracking-tight">
              Transacciones en {selectedPocket?.name}
            </h2>
          </div>
        </div>
        <div className="w-full flex flex-wrap gap-4">
          {transactions?.map((transaction) => (
            <div
              key={transaction.id}
              className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-gray-600 hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                  {transaction.emoji}
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">
                    {transaction.description}
                  </span>
                  <span className="text-sm text-gray-300">
                    {formatDateWithTime(transaction.date)}
                  </span>
                </div>
              </div>
              <div className="text-lg font-semibold text-right flex items-end flex-col">
                <span>{formatAmount(transaction.value, undefined, "COP")}</span>
                <span
                  className={`text-sm font-normal text-gray-300 ${
                    transaction.type === "EXPENSE"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {transaction.type === "EXPENSE" ? "Gasto" : "Ingreso"}
                </span>
              </div>
            </div>
          ))}
          {transactions?.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400">
                No hay transacciones recientes
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
