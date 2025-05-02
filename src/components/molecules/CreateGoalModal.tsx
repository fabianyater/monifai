import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { GoalRequest } from "../../lib/types/Goal";
import { useCreateGoal } from "../../services/goals/mutations";
import { Input } from "../atoms/Input";
import { MaiButton } from "../atoms/MaiButton";

type CreateGoalModalProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
};

export const CreateGoalModal = ({
  isDialogOpen,
  setIsDialogOpen,
}: CreateGoalModalProps) => {
  const [formData, setFormData] = useState<GoalRequest>({
    name: "",
    amount: 0,
    dueDate: new Date(),
  });

  const { mutate, isPending } = useCreateGoal();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    mutate(
      { ...formData },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          setFormData({
            name: "",
            amount: 0,
            dueDate: new Date(),
          });
        },
        onError: (error) => {
          console.error("Error al crear meta:", error);
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
          <Input
            label="Nombre de la meta"
            type="text"
            placeholder="Moto"
            required
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={formData.name ? "" : "Este campo es requerido"}
            className="bg-transparent text-white border-gray-500"
          />

          <Input
            label="Cantidad"
            type="number"
            placeholder="10000"
            required
            name="amount"
            onChange={(e) =>
              setFormData({ ...formData, amount: Number(e.target.value) })
            }
            error={formData.amount ? "" : "Este campo es requerido"}
            className="bg-transparent text-white border-gray-500"
          />

          <Calendar
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.value || new Date() })
            }
            placeholder="Fecha de vencimiento"
            required
            name="dueDate"
            className="bg-transparent text-white border-gray-500"
          />

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
