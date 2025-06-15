import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PocketRequest, PocketResponse } from "../../lib/types/Pocket";
import {
  useCreatePocket,
  useUpdatePocket,
} from "../../services/pockets/mutations";
import { Input } from "../atoms/Input";
import { MaiButton } from "../atoms/MaiButton";

type CreatePocketModalProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  pocketToEdit?: PocketResponse;
};

export const CreatePocketModal = ({
  isDialogOpen,
  setIsDialogOpen,
  pocketToEdit,
}: CreatePocketModalProps) => {
  const [formData, setFormData] = useState<PocketRequest>({
    name: "",
    balance: 0,
    excludeBalance: false,
    emoji: "",
  });

  const { mutate: createPocket, isPending: isCreating } = useCreatePocket();
  const { mutate: updatePocket, isPending: isUpdating } = useUpdatePocket();

  useEffect(() => {
    if (pocketToEdit) {
      setFormData({
        name: pocketToEdit.name,
        balance: pocketToEdit.balance,
        excludeBalance: pocketToEdit.excludeBalance,
        emoji: pocketToEdit.emoji,
      });
    } else {
      setFormData({ name: "", balance: 0, excludeBalance: false, emoji: "" });
    }
  }, [pocketToEdit]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (pocketToEdit) {
      updatePocket(
        {
          pocketId: pocketToEdit.id,
          pocket: { ...formData },
        },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            setFormData({ name: "", balance: 0, excludeBalance: false });
            toast.success("Bolsillo actualizado correctamente", {
              icon: "🎉",
            });
          },
          onError: (error) => {
            console.error("Error al actuaalizar el bolsillo:", error);
          },
        }
      );
    } else {
      createPocket(
        {
          name: formData.name.trim(),
          balance: formData.balance,
          excludeBalance: formData.excludeBalance,
        },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            setFormData({ name: "", balance: 0, excludeBalance: false });
          },
          onError: (error) => {
            console.error("Error al crear bolsillo:", error);
          },
        }
      );
    }
  };

  return (
    <Dialog
      header={
        <span className="text-xl font-medium">
          {pocketToEdit ? "Editar bolsillo" : "Nuevo bolsillo"}
        </span>
      }
      visible={isDialogOpen}
      onHide={() => setIsDialogOpen(false)}
      dismissableMask
      closable
      style={{ width: "400px", borderRadius: "12px" }}
      className="p-dialog-custom"
    >
      <form className="flex flex-col gap-4" onSubmit={handleCreate}>
        <Input
          label="Nombre del bolsillo"
          type="text"
          placeholder="Viaje"
          required
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={formData.name ? "" : "Este campo es requerido"}
        />
        <Input
          label="Saldo inicial"
          type="number"
          placeholder="0.00"
          required
          name="balance"
          value={String(formData.balance)}
          onChange={(e) =>
            setFormData({ ...formData, balance: Number(e.target.value) })
          }
        />
        <div className="flex flex-col items-start justify-between">
          <p>Excluir del saldo</p>
          <label className="w-full flex items-center justify-between text-sm text-gray-400">
            Ignora el saldo de este bolsillo en modo total
            <InputSwitch
              className="scale-75"
              checked={formData.excludeBalance}
              onChange={(e) =>
                setFormData({ ...formData, excludeBalance: e.target.value })
              }
            />
          </label>
        </div>
        {pocketToEdit && (
          <Input
            label="Emoji"
            type="text"
            placeholder="🍔"
            name="emoji"
            value={formData.emoji}
            onChange={(e) =>
              setFormData({ ...formData, emoji: e.target.value })
            }
          />
        )}
        <MaiButton
          label={!pocketToEdit ? "Crear" : "Editar"}
          type="submit"
          loading={isCreating || isUpdating}
          disabled={!formData.name.trim()}
          className="w-full"
        />
      </form>
    </Dialog>
  );
};
