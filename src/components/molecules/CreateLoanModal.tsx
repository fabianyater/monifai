import { useQuery } from "@tanstack/react-query";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { LOAN_TYPE_OPTIONS } from "../../lib/constants/selectOptions";
import { LoanRequest, LoanType } from "../../lib/types/Loan";
import { useCreateLoan } from "../../services/loans/mutations";
import { usePockets } from "../../services/pockets/queries";
import { Input } from "../atoms/Input";
import { MaiButton } from "../atoms/MaiButton";

type CreateLoanModalProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
};

export const CreateLoanModal = ({
  isDialogOpen,
  setIsDialogOpen,
}: CreateLoanModalProps) => {
  const [formData, setFormData] = useState<LoanRequest>({
    amount: 0,
    loanParty: "",
    description: "",
    loanType: "LENDER",
    pocketId: 0,
  });
  const { queryFn, queryKey } = usePockets();
  const { data: pockets } = useQuery({
    queryKey,
    queryFn,
  });

  const { mutate, isPending } = useCreateLoan();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.loanParty.trim()) return;

    mutate(
      { ...formData },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          setFormData({
            amount: 0,
            loanParty: "",
            description: "",
            loanType: "LENDER",
            pocketId: 0,
          });
        },
        onError: (error) => {
          console.error("Error al crear bolsillo:", error);
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
        <form
          onSubmit={handleCreate}
          className="flex flex-col gap-4 p-8"
          style={{
            fontFamily: "'Ubuntu', sans-serif",
          }}
        >
          <select
            name="loanType"
            className="w-max bg-transparent text-white py-2 rounded"
            onChange={(e) =>
              setFormData({
                ...formData,
                loanType: e.target.value as LoanType,
              })
            }
          >
            {LOAN_TYPE_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-black text-white"
              >
                {option.label}
              </option>
            ))}
          </select>

          <Input
            label="Nombre de la persona/entidad"
            type="text"
            placeholder={`${
              formData.loanType === "LENDER"
                ? "¿A quién prestas?"
                : "¿De quién tomas prestado?"
            }`}
            required
            name="loanParty"
            value={formData.loanParty}
            onChange={(e) =>
              setFormData({ ...formData, loanParty: e.target.value })
            }
            error={formData.loanParty ? "" : "Este campo es requerido"}
            className="bg-transparent text-white border-gray-500"
          />
          <Input
            label="Monto del préstamo"
            type="number"
            placeholder="0.00"
            required
            name="amount"
            value={String(formData.amount)}
            onChange={(e) =>
              setFormData({ ...formData, amount: Number(e.target.value) })
            }
            className="bg-transparent text-white border-gray-500"
          />
          <Input
            label="Descripción"
            type="text"
            placeholder="Viaje"
            required
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            error={formData.description ? "" : "Este campo es requerido"}
            className="bg-transparent text-white border-gray-500"
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
          <MaiButton
            icon="pi pi-check"
            className="rounded-xl w-full mt-4"
            type="submit"
            loading={isPending}
          />
        </form>
      )}
    ></Dialog>
  );
};
