import { Dialog } from "primereact/dialog";
import { useCallback, useState } from "react";
import { CategoryRequest } from "../../lib/types/Category";
import { useCreateCategory } from "../../services/categories/mutations";
import { Input } from "../atoms/Input";
import { MaiButton } from "../atoms/MaiButton";

type CreateCategoryModalProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
};

export const CreateCategoryModal = ({
  isDialogOpen,
  setIsDialogOpen,
}: CreateCategoryModalProps) => {
  const [formData, setFormData] = useState<CategoryRequest>({
    name: "",
  });

  const { mutate, isPending } = useCreateCategory();

  const handleCreate = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name.trim()) return;

      mutate(
        { name: formData.name.trim() },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            setFormData({ name: "" });
          },
          onError: (error) => {
            console.error("Error al crear categoría:", error);
          },
        }
      );
    },
    [formData.name, mutate, setIsDialogOpen]
  );
  return (
    <Dialog
      header={<span className="text-xl font-medium">Nueva Categoría</span>}
      visible={isDialogOpen}
      onHide={() => setIsDialogOpen(false)}
      dismissableMask
      closable
      style={{ width: "400px", borderRadius: "12px" }}
      className="p-dialog-custom"
    >
      <form className="flex flex-col gap-4" onSubmit={handleCreate}>
        <Input
          label="Nombre de la categoría"
          type="text"
          placeholder="Transporte"
          required
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={formData.name ? "" : "Este campo es requerido"}
        />
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
