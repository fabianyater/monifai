import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { usePocketStore } from "../../lib/store/usePocketStore";
import { Pocket } from "../../lib/types/Pocket";
import { usePockets } from "../../services/pockets/queries";
import { MaiSelect } from "./MaiSelect";

export const PocketSelector = () => {
  const selectedPocket = usePocketStore((state) => state.selectedPocket);
  const setSelectedPocket = usePocketStore((state) => state.setSelectedPocket);

  const { queryKey, queryFn } = usePockets();
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn,
  });

  useEffect(() => {
    if (data && data.length > 0 && !selectedPocket) {
      setSelectedPocket(data[0]);
    }
  }, [data, selectedPocket, setSelectedPocket]);
  return (
    <MaiSelect<Pocket>
      data={data || []}
      selectedValue={selectedPocket}
      setSelectedValue={(value: Pocket) => setSelectedPocket(value)}
      isLoading={isLoading}
      optionLabel="name"
      optionValue="id"
      classname="w-full"
    />
  );
};
