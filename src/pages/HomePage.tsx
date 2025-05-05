import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Greet } from "../components/atoms/Greet";
import { MaiButton } from "../components/atoms/MaiButton";
import { MaiSelect } from "../components/atoms/MaiSelect";
import { CreateTransactionModal } from "../components/molecules/CreateTransactionModal";
import { CreateTransferModal } from "../components/molecules/CreateTransferModal";
import { CategoryChart } from "../components/organisms/CategoryChart";
import { TransactionCard } from "../components/organisms/TransactionCard";
import { usePocketStore } from "../lib/store/usePocketStore";
import { useTransactionStore } from "../lib/store/useTransactionStore";
import { useUserStore } from "../lib/store/useUserStore";
import { Pocket } from "../lib/types/Pocket";
import { usePockets } from "../services/pockets/queries";

export const HomePage = () => {
  const [isTransferModalOpen, setIsTransferModalOpen] =
    useState<boolean>(false);
  const isTransactionModalOpen = useTransactionStore(
    (state) => state.isTransactionModalOpen
  );
  const setisTransactionModalOpen = useTransactionStore(
    (state) => state.setIsTransactionModalOpen
  );
  const user = useUserStore((state) => state.user);
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
          <div className="w-full flex gap-2 items-center justify-start">
            <MaiButton
              icon="pi pi-plus"
              label="Añadir transaccción"
              className="w-full bg-transparent text-white border-dashed border-2 border-gray-500 hover:bg-primary rounded-2xl"
              type="button"
              onClick={openModal}
            />
            <MaiButton
              icon="pi pi-arrow-right-arrow-left"
              type="button"
              className="bg-transparent text-white border-dashed border-2 border-gray-500 hover:bg-primary rounded-xl"
              onClick={() => setIsTransferModalOpen(true)}
            />
          </div>
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
      {isTransferModalOpen && (
        <CreateTransferModal
          isDialogOpen={isTransferModalOpen}
          setIsDialogOpen={setIsTransferModalOpen}
        />
      )}
    </div>
  );
};
