import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { PERIODICITY_OPTIONS } from "../../lib/constants/selectOptions";
import { usePocketStore } from "../../lib/store/usePocketStore";
import { useTransactionStore } from "../../lib/store/useTransactionStore";
import {
  ClassifiedTransaction,
  TransactionRequest,
  TransactionType,
} from "../../lib/types/Transactions";
import { useCreateTransactionMutation } from "../../services/transactions/mutations";
import { DatePicker } from "../atoms/DatePicker";
import { MaiButton } from "../atoms/MaiButton";
import TransactionToggle from "../atoms/TranscationToggle";
import { CategoryPillsWrapper } from "./CategoryPillsWrapper";
import { CreateCategoryModal } from "./CreateCategoryModal";

type CreateTransactionModalProps = {
  onClose: () => void;
};

export const CreateTransactionModal = ({
  onClose,
}: CreateTransactionModalProps) => {
  const transaction = useTransactionStore(
    (state) => state.classifiedTransaction
  );
  const setTransaction = useTransactionStore(
    (state) => state.setClassifiedTransaction
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const defaultTransaction: ClassifiedTransaction = {
    description: "",
    value: 0,
    date: new Date(),
    periodicity: "ONCE",
    type: "EXPENSE",
    category: "",
  };
  const todayStr = new Date().toISOString().split("T")[0];

  const tx = transaction ?? defaultTransaction;
  const pocketId = usePocketStore((state) => state.selectedPocket?.id);

  const [formData, setFormData] = useState<TransactionRequest>({
    date: tx.date ? new Date(tx.date) : new Date(todayStr),
    periodicity: tx.periodicity,
    description: tx.description,
    amount: tx.value,
    transactionType: tx.type,
    category:
      typeof tx.category === "string" ? { name: tx.category } : tx.category,
    pocketId: pocketId ?? 0,
  });

  const { mutate } = useCreateTransactionMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "amount") {
      setFormData((prev) => ({ ...prev, amount: Number(value) }));
    } else if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        category: { name: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => onClose(),
      onError: (error) => console.error("Error al crear transacción:", error),
    });
  };

  function setTransactionType(value: TransactionType): void {
    setFormData((prev) => ({ ...prev, transactionType: value }));
  }

  return (
    <>
      <Dialog
        visible={true}
        onHide={() => {
          setTransaction(null);
          onClose();
        }}
        dismissableMask={true}
        modal={true}
        className="w-full sm:w-[26rem] rounded-3xl shadow-2xl bg-[#2D2D2D]"
        content={() => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-4"
            style={{
              fontFamily: "'Ubuntu', sans-serif",
            }}
          >
            <div className="w-full flex items-center justify-start gap-4">
              <DatePicker
                value={formData.date.toISOString().split("T")[0]}
                onChange={(newDate) =>
                  setFormData((prev) => ({ ...prev, date: new Date(newDate) }))
                }
              />
              <select
                name="periodicity"
                className="w-max bg-transparent text-white py-2 rounded"
                onChange={(e) =>
                  handleSelectChange("periodicity", e.target.value)
                }
              >
                {PERIODICITY_OPTIONS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-black text-white"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              placeholder="Descripción"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="bg-transparent text-white py-2 rounded text-4xl font-semibold outline-none"
            />
            <input
              type="number"
              placeholder="Valor"
              name="amount"
              value={formData.amount === 0 ? "" : formData.amount}
              onChange={handleChange}
              className={`bg-transparent ${
                formData.transactionType === "EXPENSE"
                  ? "text-red-500"
                  : "text-green-500"
              } py-2 rounded text-4xl font-semibold outline-none`}
              required
              content="number"
            />
            <div className="flex items-center justify-start gap-2">
              <MaiButton
                icon="pi pi-plus"
                type="button"
                size="small"
                rounded
                className="h-10  w-10 bg-transparent text-whit transition-colors duration-200 border-gray-600"
                onClick={() => setIsDialogOpen(true)}
              />
              <CategoryPillsWrapper
                selectedCategory={formData.category.name}
                setSelectedCategory={(category: string) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: { name: category },
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between mt-10 gap-4">
              <TransactionToggle
                value={formData.transactionType}
                onChange={setTransactionType}
              />
              <MaiButton
                icon="pi pi-check"
                className="rounded-xl w-full"
                type="submit"
              />
            </div>
          </form>
        )}
      ></Dialog>
      {isDialogOpen && (
        <CreateCategoryModal
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
    </>
  );
};
