import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { PocketTransferRequest } from "../../lib/types/Pocket";
import { useTransferBetweenPockets } from "../../services/pockets/mutations";
import { usePockets } from "../../services/pockets/queries";
import { Input } from "../atoms/Input";

type CreateTransferModalProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
};

export const CreateTransferModal = ({
  isDialogOpen,
  setIsDialogOpen,
}: CreateTransferModalProps) => {
  const [formData, setFormData] = useState<PocketTransferRequest>({
    fromPocketId: 0,
    toPocketId: 0,
    amount: 0,
  });
  const { queryKey, queryFn } = usePockets();
  const { data } = useQuery({
    queryKey,
    queryFn,
    enabled: !!formData.fromPocketId,
  });
  const { mutate, isPending } = useTransferBetweenPockets();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fromPocketId || !formData.toPocketId || !formData.amount)
      return;

    mutate(
      {
        fromPocketId: formData.fromPocketId,
        toPocketId: formData.toPocketId,
        amount: formData.amount,
      },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          setFormData({
            fromPocketId: 0,
            toPocketId: 0,
            amount: 0,
          });
        },
        onError: (error) => {
          console.error("Error al transferir:", error);
        },
      }
    );
  };

  return (
    <Dialog
      visible={isDialogOpen}
      onHide={() => setIsDialogOpen(false)}
      dismissableMask={true}
      modal={true}
      className="w-3/4 sm:w-[26rem] rounded-3xl shadow-2xl bg-[#2D2D2D]"
      content={() => (
        <div className="flex flex-col gap-4 p-8">
          <h2 className="text-2xl font-bold">Transferir</h2>
          <form
            className="flex flex-col gap-4"
            style={{
              fontFamily: "'Ubuntu', sans-serif",
            }}
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col gap-2">
              <span>Desde</span>
              <Dropdown
                value={formData.fromPocketId}
                options={data?.map((pocket) => ({
                  label: pocket.name,
                  value: pocket.id,
                }))}
                name="fromPOcketId"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    fromPocketId: e.value as number,
                  }))
                }
                placeholder="Selecciona un bolsillo"
                required
              />
            </label>
            <span className="text-center text-2xl font-bold">
              <i className="pi pi-arrow-right-arrow-left"></i>
            </span>
            <label className="flex flex-col gap-2">
              <span>Hacia</span>
              <Dropdown
                value={formData.toPocketId}
                options={data?.map((pocket) => ({
                  label: pocket.name,
                  value: pocket.id,
                }))}
                name="toPOcketId"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    toPocketId: e.value as number,
                  }))
                }
                placeholder="Selecciona un bolsillo"
                required
              />
            </label>
            <Input
              label="Valor"
              type="number"
              placeholder="Valor"
              name="amount"
              value={formData.amount === 0 ? "" : formData.amount.toString()}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  amount: Number(e.target.value),
                }))
              }
            />

            <Button
              icon="pi pi-check"
              className="w-full"
              type="submit"
              loading={isPending}
              disabled={
                !formData.fromPocketId ||
                !formData.toPocketId ||
                !formData.amount
              }
            />
          </form>
        </div>
      )}
    ></Dialog>
  );
};
