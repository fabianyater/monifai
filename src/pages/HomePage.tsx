import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "primereact/skeleton";
import { useEffect, useState } from "react";
import { MaiSelect } from "../components/atoms/MaiSelect";
import { useUserStore } from "../lib/store/useUserStore";
import { Pocket } from "../lib/types/Pocket";
import { usePockets } from "../services/pockets/queries";

export const HomePage = () => {
  const [selectedPocket, setSelectedPocket] = useState<Pocket | null>(null);
  const userId = useUserStore((state) => state.userId);
  const user = useUserStore((state) => state.user);
  const { queryKey, queryFn } = usePockets(Number(userId));
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn,
  });

  useEffect(() => {
    if (data && data.length > 0 && !selectedPocket) {
      setSelectedPocket(data[0]);
    }
  }, [data, selectedPocket]);

  return (
    <div>
      <h1 className="text-3xl">
        ¡Hola 👋🏻,{" "}
        {user?.name ? (
          <span className="font-bold">{user.name.split(" ")[0]}</span>
        ) : (
          <Skeleton />
        )}
        !
      </h1>
      <section className="w-2/5 mt-4">
        <div className="flex flex-col gap-2 items-start">
          <div className="flex items-center justify-start">
            <span>Este mes en </span>
            <MaiSelect
              data={data || []}
              selectedPocket={selectedPocket}
              setSelectedPocket={setSelectedPocket}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center justify-start"></div>
      </section>
    </div>
  );
};
