import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "../../lib/helpers/formatAmount";
import { formatDate } from "../../lib/helpers/formatDate";
import { useDateSelectorStore } from "../../lib/store/useDateSelectorStore";
import { usePocketStore } from "../../lib/store/usePocketStore";
import { useTransactionStore } from "../../lib/store/useTransactionStore";
import { useTotalBalance } from "../../services/pockets/queries";
import { useMonthlyBalance } from "../../services/transactions/queries";
import Card, { CardContent } from "./Card";

export const ExpenseSummary = () => {
  const startDate = useDateSelectorStore((state) => state.date);
  const selectedPocket = usePocketStore((state) => state.selectedPocket);
  const transactionType = useTransactionStore((state) => state.transactionType);
  const setTransactionType = useTransactionStore(
    (state) => state.setTransactionType
  );

  const { queryKey, queryFn } = useTotalBalance(
    selectedPocket?.id ?? 0,
    startDate
  );
  const { data } = useQuery({
    queryKey,
    queryFn,
    enabled: !!selectedPocket?.id,
  });

  const { queryKey: queryKeyIncome, queryFn: queryFnIngreso } =
    useMonthlyBalance(selectedPocket?.id ?? 0, "INCOME", startDate);
  const { data: monthlyIncome } = useQuery({
    queryKey: queryKeyIncome,
    queryFn: queryFnIngreso,
    enabled: !!selectedPocket?.id,
  });

  const { queryKey: queryKeyExpense, queryFn: queryFnGasto } =
    useMonthlyBalance(selectedPocket?.id ?? 0, "EXPENSE", startDate);
  const { data: monthlyExpense } = useQuery({
    queryKey: queryKeyExpense,
    queryFn: queryFnGasto,
    enabled: !!selectedPocket?.id,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card
        variant="glass"
        className="relative overflow-hidden"
        isSelected={false}
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/10 rounded-full -mt-8 -mr-8"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-600/10 rounded-full -mb-4 -ml-4"></div>
        <CardContent>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Disponible
              </p>
              <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(data?.currentBalance ?? 0)}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <span className="text-purple-600 dark:text-purple-400">
                <i className="pi pi-check text-xl text-green-500" />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card
        variant="glass"
        className="relative overflow-hidden"
        isSelected={false}
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/10 rounded-full -mt-8 -mr-8"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-600/10 rounded-full -mb-4 -ml-4"></div>
        <CardContent>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Balance Neto
              </p>
              <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(data?.monthlyNetChange ?? 0)}
              </h3>
              <div className="mt-1 flex items-center">
                {data && data.balanceTrendPercentage > 0 ? (
                  <>
                    <span className="text-xs font-medium text-green-500 mr-1">
                      <i className="pi pi-arrow-up-right text-xs text-green-500" />
                    </span>
                    <span className="text-xs font-medium text-green-500">
                      + {(data?.balanceTrendPercentage ?? 0).toFixed(1)}%
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xs font-medium text-red-500 mr-1">
                      <i className="pi pi-arrow-down-left text-xl text-red-500" />
                    </span>
                    <span className="text-xs font-medium text-red-500">
                      {(data?.balanceTrendPercentage ?? 0).toFixed(1)}%
                    </span>
                  </>
                )}
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                  vs mes anterior
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <span className="text-purple-600 dark:text-purple-400">
                {selectedPocket?.emoji}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card
        variant="glass"
        className="relative overflow-hidden"
        onClick={() => setTransactionType("INCOME")}
        isSelected={transactionType === "INCOME"}
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/10 rounded-full -mt-8 -mr-8"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-600/10 rounded-full -mb-4 -ml-4"></div>
        <CardContent>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Ingresos
              </p>
              <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(monthlyIncome ?? 0)}
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {formatDate(startDate, false)}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <span className="text-purple-600 dark:text-purple-400">
                <i className="pi pi-arrow-down-left text-xl text-green-500" />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card
        variant="glass"
        className="relative overflow-hidden"
        onClick={() => setTransactionType("EXPENSE")}
        isSelected={transactionType === "EXPENSE"}
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/10 rounded-full -mt-8 -mr-8"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-600/10 rounded-full -mb-4 -ml-4"></div>
        <CardContent>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Gastos
              </p>
              <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(monthlyExpense ?? 0)}
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {formatDate(startDate, false)}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <span className="text-purple-600 dark:text-purple-400">
                <i className="pi pi-arrow-up-right text-xl text-red-500" />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
