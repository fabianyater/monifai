import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import {
  GoalTransactionRequest,
  GoalTransactionType,
} from "../../lib/types/Goal";
import {
  useMakeDeposit,
  useMakeWithdraw,
} from "../../services/goals/mutations";
import { usePockets } from "../../services/pockets/queries";
import { Input } from "../atoms/Input";

type AddGoalTransactionDialogProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  transactionType: GoalTransactionType;
  goalId: number;
};

export const AddGoalTransactionDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  transactionType,
  goalId,
}: AddGoalTransactionDialogProps) => {
  const [formData, setFormData] = useState<GoalTransactionRequest>({
    goalId: goalId,
    amount: 0,
    type: transactionType,
    pocketId: 0,
  });

  const { queryFn, queryKey } = usePockets();
  const { data: pockets } = useQuery({
    queryKey,
    queryFn,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      type: transactionType,
    }));
  }, [transactionType]);

  const { mutate: deposit, isPending: isDepositPending } = useMakeDeposit();
  const { mutate: withdraw, isPending: isWithdrawPending } = useMakeWithdraw();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount) return;

    if (transactionType === "DEPOSIT") {
      deposit(
        { ...formData },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            setFormData({
              goalId: goalId,
              amount: 0,
              type: transactionType,
              pocketId: 0,
            });
          },
          onError: (error) => {
            console.error("Error al crear meta:", error);
          },
        }
      );
    }

    if (transactionType === "WITHDRAWAL") {
      withdraw(
        { ...formData },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            setFormData({
              goalId: goalId,
              amount: 0,
              type: transactionType,
              pocketId: 0,
            });
          },
          onError: (error) => {
            console.error("Error al crear meta:", error);
          },
        }
      );
    }
  };

  const isPending = isDepositPending || isWithdrawPending;
  const isDeposit = transactionType === "DEPOSIT" ? "deposito" : "retiro";

  return (
    <Dialog
      visible={isDialogOpen}
      onHide={() => setIsDialogOpen(false)}
      dismissableMask={true}
      modal
      className="w-3/4 sm:w-[26rem] rounded-3xl shadow-2xl bg-[#2D2D2D]"
      content={() => (
        <section className="flex flex-col gap-4 p-8">
          <h2 className="text-2xl font-bold">Hacer {isDeposit}</h2>
          <form
            onSubmit={handleCreate}
            className="flex flex-col gap-4"
            style={{
              fontFamily: "'Ubuntu', sans-serif",
            }}
          >
            <Input
              name="amount"
              label="Cantidad"
              type="number"
              placeholder="10000"
              required
              min={0}
              onChange={(e) =>
                setFormData({ ...formData, amount: Number(e.target.value) })
              }
              error={formData.amount ? "" : "Este campo es requerido"}
              className="bg-transparent text-white border-gray-500"
            />
            <label className="flex flex-col gap-2">
              <span>
                {transactionType === "DEPOSIT"
                  ? "¿De dónde sale el dinero?"
                  : "¿Hacia dónde va el dinero?"}
              </span>
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
            <Button
              label={transactionType === "DEPOSIT" ? "Depositar" : "Retirar"}
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              loading={isPending}
              disabled={isPending}
            />
          </form>
        </section>
      )}
    ></Dialog>
  );
};
