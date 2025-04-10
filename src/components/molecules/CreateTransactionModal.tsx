import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { usePocketStore } from "../../lib/store/usePocketStore";
import {
  ClassifiedTransaction,
  TransactionRequest,
} from "../../lib/types/Transactions";
import { useCreateTransactionMutation } from "../../services/transactions/mutations";
import { Input } from "../atoms/Input";
import { MaiButton } from "../atoms/MaiButton";

type CreateTransactionModalProps = {
  transaction: ClassifiedTransaction;
  onClose: () => void;
};

export const CreateTransactionModal = ({
  onClose,
  transaction,
}: CreateTransactionModalProps) => {
  const pocketId = usePocketStore((state) => state.selectedPocket?.id);
  const [formData, setFormData] = useState<TransactionRequest>({
    date: transaction.date,
    periodicity: transaction.periodicity,
    description: transaction.description,
    amount: transaction.value,
    transactionType: transaction.type,
    category: {
      name: transaction.category,
    },
    pocketId: pocketId ?? 0,
  });
  const { mutate } = useCreateTransactionMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    mutate(
      {
        ...formData,
      },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          console.error("Error al crear transacción:", error);
        },
      }
    );
  };

  return (
    <Dialog
      header="Crear transacción"
      visible={true}
      closable={true}
      onHide={onClose}
    >
      <div className="p-4">
        <form
          className="flex flex-col gap-4 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <Input
            label="Fecha"
            type="date"
            placeholder="dd/mm/aaaa"
            required
            name="date"
            value={new Date(transaction.date).toISOString().split("T")[0]}
            onChange={handleChange}
            error=""
          />
          <Input
            label="Período"
            type="text"
            placeholder="Período"
            required
            name="periodicity"
            value={transaction.periodicity}
            onChange={handleChange}
            error=""
          />
          <Input
            label="Descripción"
            type="text"
            placeholder="Descripción"
            required
            name="description"
            value={transaction.description}
            onChange={handleChange}
            error=""
          />
          <Input
            label="Importe"
            type="number"
            placeholder="Importe"
            required
            name="amount"
            value={transaction.value.toString()}
            onChange={handleChange}
            error=""
          />
          <Input
            label="Tipo de transacción"
            type="text"
            placeholder="Tipo de transacción"
            required
            name="type"
            value={transaction.type}
            onChange={handleChange}
            error=""
          />
          <Input
            label="Categoria"
            type="text"
            placeholder="Categoria"
            required
            name="category"
            value={transaction.category}
            onChange={handleChange}
            error=""
          />
          <MaiButton type="submit" label="Crear transacción" />
          <MaiButton type="button" label="Cancelar" onClick={onClose} />
        </form>
      </div>
    </Dialog>
  );
};
