import { useQuery } from "@tanstack/react-query";
import { ProgressBar } from "primereact/progressbar";
import { useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { AddGoalTransactionDialog } from "../components/molecules/AddGoalTransactionDialog";
import { TransactionHistory } from "../components/organisms/TransactionHistory";
import { formatAmount } from "../lib/helpers/formatAmount";
import { formatDateWithTime } from "../lib/helpers/formatDate";
import { GoalTransactionType } from "../lib/types/Goal";
import { useGoal, useGoalTransactions } from "../services/goals/queries";

export const GoalDetailsPage = () => {
  const [transactionType, setTransactionType] =
    useState<GoalTransactionType>("DEPOSIT");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { goalId } = useParams<{ goalId: string }>();
  const { queryKey, queryFn } = useGoal(Number(goalId));
  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn,
    enabled: !!goalId,
  });
  const {
    queryKey: goalTransactionsQueryKey,
    queryFn: goalTransactionsQueryFn,
  } = useGoalTransactions(Number(goalId));

  const {
    data: goalTransactions,
    isLoading: isGoalTransactionsLoading,
    isError: isGoalTransactionsError,
  } = useQuery({
    queryKey: goalTransactionsQueryKey,
    queryFn: goalTransactionsQueryFn,
    enabled: !!goalId,
  });

  const paidAmount = data ? data.amount - data.balance : 0;
  const progress = data ? Math.min((paidAmount / data.amount) * 100, 100) : 0;
  const dayLeft = data
    ? new Date(data.dueDate).getTime() - new Date().getTime()
    : 0;

  const valueTemplate = (value: number) => {
    return <div>{Math.round(value)}%</div>;
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) return toast.error("Something went wrong");

  return data ? (
    <div>
      <div className="bg-neutral-800 rounded-xl p-6 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full w-12 h-12 p-4 flex items-center justify-center text-xl bg-neutral-600 text-white font-bold">
              {data.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">{data.name}</span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 rounded-xl mt-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start">
              <span>Ahorrado</span>
              {formatAmount(paidAmount)}
            </div>
            <div className="flex flex-col gap-2 items-start">
              <span>Restante</span>
              {formatAmount(data.balance)}
            </div>
          </div>
          <ProgressBar
            value={progress}
            showValue={true}
            displayValueTemplate={valueTemplate}
            className={`${progress === 100 ? "bg-green-500" : "bg-gray-500"}`}
          />
        </div>
        <div className="w-full flex flex-col gap-2 mt-5">
          <div className="flex gap-4">
            <span className=" font-semibold">Valor total</span>
            <span className=" text-neutral-400">
              {formatAmount(data.amount)}
            </span>
          </div>
          <div className="flex gap-4">
            <span className=" font-semibold">Fecha</span>
            <span className=" text-neutral-400">
              {formatDateWithTime(data.dueDate)}
              <span>
                {dayLeft > 0
                  ? ` (${Math.ceil(
                      dayLeft / (1000 * 60 * 60 * 24)
                    )} días restantes)`
                  : ""}
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-evenly gap-4 mt-8">
          <div
            className="flex flex-col gap-2 items-center justify-center cursor-pointer hover:text-blue-500 transition-colors duration-200"
            onClick={() => {
              setTransactionType("DEPOSIT");
              setIsDialogOpen(true);
            }}
          >
            <i className="pi pi-arrow-down-left text-2xl text-neutral-400"></i>
            <span>Depositar</span>
          </div>
          <div
            className="flex flex-col gap-2 items-center justify-center cursor-pointer hover:text-blue-500 transition-colors duration-200"
            onClick={() => {
              setTransactionType("WITHDRAWAL");
              setIsDialogOpen(true);
            }}
          >
            <i className="pi pi-arrow-up-right text-2xl text-neutral-400"></i>
            <span>Retirar</span>
          </div>
        </div>
      </div>
      <div className="bg-neutral-800 rounded-xl p-6 flex flex-col gap-2 mt-6">
        <h2 className="text-lg font-semibold">Historial de pagos</h2>
        <div className="w-full flex flex-col gap-4 mt-6">
          <TransactionHistory
            isLoading={isGoalTransactionsLoading}
            isError={isGoalTransactionsError}
            transactions={goalTransactions ?? []}
          />
        </div>
      </div>
      <AddGoalTransactionDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        transactionType={transactionType}
        goalId={data.id}
      />
    </div>
  ) : (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="text-6xl mb-4">📂</div>
      <h2 className="text-lg font-semibold">
        La información de la metas no está disponible
      </h2>
    </div>
  );
};
