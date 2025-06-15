import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import { useState } from "react";
import { PocketRequest } from "../../lib/types/Pocket";
import { useCreatePocket } from "../../services/pockets/mutations";
import { Input } from "../atoms/Input";
import { MaiButton } from "../atoms/MaiButton";

type CreatePocketModalProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
};

export const CreatePocketModal = ({
  isDialogOpen,
  setIsDialogOpen,
}: CreatePocketModalProps) => {
  const [formData, setFormData] = useState<PocketRequest>({
    name: "",
    balance: 0,
    excludeBalance: false,
  });

  const { mutate, isPending } = useCreatePocket();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    mutate(
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
  };

  return (
    <Dialog
      header={<span className="text-xl font-medium">Nuevo bolsillo</span>}
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
        <label className="flex items-center justify-between text-gray-400 text-sm">
          Excluir saldo del balance general
          <InputSwitch
            checked={formData.excludeBalance}
            onChange={(e) =>
              setFormData({ ...formData, excludeBalance: e.target.value })
            }
          />
        </label>
        <MaiButton
          label="Crear"
          type="submit"
          loading={isPending}
          disabled={!formData.name.trim()}
          className="w-full"
        />
      </form>
    </Dialog>
  );
};
