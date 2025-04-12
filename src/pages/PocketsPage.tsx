import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { MaiButton } from "../components/atoms/MaiButton";
import { PocketCard } from "../components/atoms/PocketCard";
import { CreatePocketModal } from "../components/molecules/CreatePocketMotdal";
import { usePockets } from "../services/pockets/queries";

export const PocketsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { queryFn, queryKey } = usePockets(); // Replace 1 with the actual userId
  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return toast.error("Something went wrong");

  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-semibold text-4xl tracking-tight">Bolsillos</h1>
        <MaiButton
          icon="pi pi-plus"
          label="Nuevo bolsillo"
          size="small"
          className="border border-gray-400 text-gray-200 hover:bg-gray-200 hover:text-black transition-colors duration-200"
          onClick={() => setIsDialogOpen(true)}
        />
      </div>
      {data && data.length > 0 ? (
        <div className="flex flex-wrap items-start gap-4">
          {data.map((pocket) => (
            <PocketCard key={pocket.id} pocket={pocket} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-24">
          <div className="text-6xl mb-4">📂</div>
          <h2 className="text-lg font-semibold">
            No hay bolsillos disponibles
          </h2>
          <p className="text-gray-500">
            Intenta añadir un bolsillo nuevo haciendo clic en el botón de
            arriba.
          </p>
        </div>
      )}
      {isDialogOpen && (
        <CreatePocketModal
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
    </>
  );
};
