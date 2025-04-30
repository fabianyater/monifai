import { useQuery } from "@tanstack/react-query";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { useParams } from "react-router";
import { LoanPaymentRequest } from "../../lib/types/Loan";
import { useCreateLoanPayment } from "../../services/loans/mutations";
import { usePockets } from "../../services/pockets/queries";
import { Input } from "../atoms/Input";
import { MaiButton } from "../atoms/MaiButton";

type CreateLoanPaymentModalProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  loanType: string;
};

export const CreateLoanPaymentModal = ({
  isDialogOpen,
  setIsDialogOpen,
  loanType,
}: CreateLoanPaymentModalProps) => {
  const { loanId } = useParams<{ loanId: string }>();
  const [formData, setFormData] = useState<LoanPaymentRequest>({
    loanId: Number(loanId),
    pocketId: 0,
    amount: 0,
  });
  const { queryFn, queryKey } = usePockets();
  const { data: pockets } = useQuery({
    queryKey,
    queryFn,
  });

  const { mutate, isPending } = useCreateLoanPayment();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.loanId || !formData.pocketId || !formData.amount) return;

    mutate(
      { ...formData, loanId: Number(formData.loanId) },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          setFormData({
            loanId: 0,
            pocketId: 0,
            amount: 0,
          });
        },
        onError: (error) => {
          console.error("Error al crear pago:", error);
        },
      }
    );
  };

  return (
    <Dialog
      visible={isDialogOpen}
      onHide={() => setIsDialogOpen(false)}
      dismissableMask={true}
      modal
      className="w-3/4 sm:w-[26rem] rounded-3xl shadow-2xl bg-[#2D2D2D]"
      content={() => (
        <div className="flex flex-col gap-4 p-8">
          <h2 className="text-2xl font-bold">
            {loanType === "LENDER" ? "Agregar cobro" : "Agregar reembolso"}
          </h2>
          <form
            onSubmit={handleCreate}
            className="flex flex-col gap-4 "
            style={{
              fontFamily: "'Ubuntu', sans-serif",
            }}
          >
            <div className="flex flex-col gap-4">
              <Input
                label="Monto"
                type="number"
                placeholder="0.00"
                required
                name="amount"
                onChange={(e) =>
                  setFormData({ ...formData, amount: Number(e.target.value) })
                }
              />
              <label className="flex flex-col gap-2">
                <span>Bolsillo</span>
                <Dropdown
                  placeholder="Selecciona un bolsillo"
                  options={pockets?.map((pocket) => ({
                    label: pocket.name,
                    value: pocket.id,
                  }))}
                  name="pocketId"
                  value={formData.pocketId}
                  onChange={(e) =>
                    setFormData({ ...formData, pocketId: e.value as number })
                  }
                />
              </label>
            </div>
            <MaiButton
              icon="pi pi-check"
              className="w-full"
              type="submit"
              loading={isPending}
            />
          </form>
        </div>
      )}
    />
  );
};
