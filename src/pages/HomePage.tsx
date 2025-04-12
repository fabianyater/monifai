import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Greet } from "../components/atoms/Greet";
import { MaiButton } from "../components/atoms/MaiButton";
import { MaiSelect } from "../components/atoms/MaiSelect";
import { CreateTransactionModal } from "../components/molecules/CreateTransactionModal";
import { CategoryChart } from "../components/organisms/CategoryChart";
import { TransactionCard } from "../components/organisms/TransactionCard";
import { usePocketStore } from "../lib/store/usePocketStore";
import { useTransactionStore } from "../lib/store/useTransactionStore";
import { useUserStore } from "../lib/store/useUserStore";
import { Pocket } from "../lib/types/Pocket";
import { usePockets } from "../services/pockets/queries";

export const HomePage = () => {
  const isTransactionModalOpen = useTransactionStore(
    (state) => state.isTransactionModalOpen
  );
  const setisTransactionModalOpen = useTransactionStore(
    (state) => state.setIsTransactionModalOpen
  );
  const userId = useUserStore((state) => state.userId);
  const user = useUserStore((state) => state.user);
  const selectedPocket = usePocketStore((state) => state.selectedPocket);
  const setSelectedPocket = usePocketStore((state) => state.setSelectedPocket);
  const { queryKey, queryFn } = usePockets(Number(userId));
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn,
  });

  useEffect(() => {
    if (data && data.length > 0 && !selectedPocket) {
      setSelectedPocket(data[0]);
    }
  }, [data, selectedPocket, setSelectedPocket]);

  const openModal = () => {
    setisTransactionModalOpen(true);
  };

  return (
    <div className="">
      <section className="w-full flex flex-col  gap-4 md:flex-row">
        <div className="w-full md:w-2/5 flex flex-col gap-2 items-start">
          <Greet name={user?.name} />
          <div className="w-max">
            <span>Este mes en </span>
            <MaiSelect<Pocket>
              data={data || []}
              selectedValue={selectedPocket}
              setSelectedValue={(value: Pocket) => setSelectedPocket(value)}
              isLoading={isLoading}
              optionLabel="name"
              optionValue="id"
            />
          </div>
          <MaiButton
            icon="pi pi-plus"
            label="Añadir transaccción"
            className="w-full bg-transparent border-dashed border-2 border-gray-500 hover:bg-primary rounded-2xl"
            type="button"
            onClick={openModal}
          />
        </div>
        <div className="w-full flex flex-col gap-2 items-center justify-start">
          <TransactionCard />
          {selectedPocket && <CategoryChart pocketId={selectedPocket.id} />}
        </div>
      </section>
      {isTransactionModalOpen && (
        <CreateTransactionModal
          onClose={() => {
            setisTransactionModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
