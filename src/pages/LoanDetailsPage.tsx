import { useQuery } from "@tanstack/react-query";
import { ProgressBar } from "primereact/progressbar";
import { useLocation, useParams } from "react-router";
import { toast } from "sonner";
import { MaiButton } from "../components/atoms/MaiButton";
import { formatAmount } from "../lib/helpers/formatAmount";
import { formatDateWithTime } from "../lib/helpers/formatDate";
import { useLoan } from "../services/loans/queries";
import { useLoanTransactions } from "../services/transactions/queries";

export const LoanDetailsPage = () => {
  const { loanId } = useParams<{ loanId: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const loanType = queryParams.get("loanType");
  const { queryKey, queryFn } = useLoan(Number(loanId));
  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn,
    enabled: !!loanId,
  });
  const {
    queryKey: loanTransactionsQueryKey,
    queryFn: loanTransactionsQueryFn,
  } = useLoanTransactions(Number(loanId), loanType ?? "");
  const {
    data: loanTransactions,
    isLoading: isLoanTransactionsLoading,
    isError: isLoanTransactionsError,
  } = useQuery({
    queryKey: loanTransactionsQueryKey,
    queryFn: loanTransactionsQueryFn,
    enabled: !!loanId,
  });

  const paidAmount = data ? data.amount - data.balance : 0;
  const progress = data ? Math.min((paidAmount / data.amount) * 100, 100) : 0; // Limitar entre 0 y 100

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
              {data.loanParty.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">{data.loanParty}</span>
              <span className="text-sm text-neutral-400">
                {data.loanType === "LENDER" ? "Por cobrar" : "Por pagar"}
              </span>
            </div>
          </div>
          <MaiButton
            icon="pi pi-plus"
            size="small"
            type="button"
            label="Añadir pago"
          />
        </div>
        <div className="w-full flex flex-col gap-2 rounded-xl mt-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start">
              <span>{data.loanType === "LENDER" ? "Recibido" : "Pagado"}</span>
              {formatAmount(paidAmount)}
            </div>
            <div className="flex flex-col gap-2 items-start">
              <span>Quedan</span>
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
              {formatDateWithTime(data.startDate)}
            </span>
          </div>
          <div className="flex gap-4">
            <span className=" font-semibold">Bolsillo</span>
            <span className=" text-neutral-400">{data.pocketName}</span>
          </div>
          <div className="flex gap-4">
            <span className=" font-semibold">Descripción</span>
            <span className=" text-neutral-400">{data.description}</span>
          </div>
        </div>
      </div>
      <div className="bg-neutral-800 rounded-xl p-6 flex flex-col gap-2 mt-6">
        <h2 className="text-lg font-semibold">Historial de pagos</h2>
        <div className="w-full flex flex-col gap-2 mt-6">
          {isLoanTransactionsLoading && <div>Loading...</div>}
          {isLoanTransactionsError && (
            <div className="text-red-500">Error al cargar los pagos</div>
          )}
          {loanTransactions?.length === 0 && (
            <div className="text-neutral-400">No hay pagos registrados</div>
          )}
          {loanTransactions?.map((transaction) => (
            <div
              key={transaction.id}
              className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-gray-600 hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
            >
              <div className="w-full flex gap-4 items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                  {transaction.emoji}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    {transaction.categoryName}
                  </span>
                  <span className="text-sm text-neutral-400">
                    {transaction.pocketName}
                  </span>
                </div>
                <div className="flex flex-col items-end ml-auto">
                  <span>
                    {formatAmount(transaction.amount, undefined, "COP")}
                  </span>
                  <span className="text-sm text-neutral-400">
                    {formatDateWithTime(transaction.date)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="text-6xl mb-4">📂</div>
      <h2 className="text-lg font-semibold">
        La información de la deuda no está disponible
      </h2>
    </div>
  );
};
