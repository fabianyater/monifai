import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { MaiButton } from "../components/atoms/MaiButton";
import { CreateLoanModal } from "../components/molecules/CreateLoanModal";
import { formatAmount } from "../lib/helpers/formatAmount";
import { useLoans } from "../services/loans/queries";

export const LoansPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { queryFn, queryKey } = useLoans();
  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn,
  });
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return toast.error("Something went wrong");

  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <div className="flex gap-2 items-start flex-col">
          <h2 className="font-semibold text-3xl tracking-tight">Deudas</h2>
          <span className="text-gray-300 text-sm">
            {data ? "Total de deudas: " + data.length : "0 deudas"}
          </span>
        </div>
        <MaiButton
          icon="pi pi-plus"
          label="Añadir deuda"
          size="small"
          className="border border-gray-400 text-gray-200 hover:bg-gray-200 hover:text-black transition-colors duration-200"
          onClick={() => setIsDialogOpen(true)}
        />
      </div>

      {data && data.length > 0 ? (
        <div className="flex flex-wrap items-start gap-4">
          {data?.map((loan) => (
            <div
              key={loan.id}
              className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-gray-600 hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
              onClick={() =>
                navigate(`/loans/${loan.id}?loanType=${loan.loanType}`)
              }
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                  <span className="text-lg font-semibold">
                    {loan.loanParty.charAt(0)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">
                    {loan.loanType === "LENDER"
                      ? `${loan.loanParty} me debe`
                      : `Debo a ${loan.loanParty}`}
                  </span>
                  <span className="text-sm text-gray-300">
                    {loan.description}
                  </span>
                </div>
              </div>
              <div className="text-lg font-semibold text-right">
                {formatAmount(loan.amount)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-24">
          <div className="text-6xl mb-4">📂</div>
          <h2 className="text-lg font-semibold">Sin deudas</h2>
          <p className="text-gray-500">
            Intenta añadir una deuda haciendo clic en el botón de arriba.
          </p>
        </div>
      )}
      {isDialogOpen && (
        <CreateLoanModal
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
    </>
  );
};
