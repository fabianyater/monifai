import { useState } from "react";
import { MaiButton } from "../components/atoms/MaiButton";
import { PocketSelector } from "../components/atoms/PocketSelector";
import { CreateTransactionModal } from "../components/molecules/CreateTransactionModal";
import { CreateTransferModal } from "../components/molecules/CreateTransferModal";
import { ExpenseSummary } from "../components/molecules/ExpenseSummary";
import { MonthSelector } from "../components/molecules/MonthSelector";
import { CategoryChart } from "../components/organisms/CategoryChart";
import RecentTransactions from "../components/organisms/RecentTransactions";
import { usePocketStore } from "../lib/store/usePocketStore";
import { useTransactionStore } from "../lib/store/useTransactionStore";

export const HomePage = () => {
  const [isTransferModalOpen, setIsTransferModalOpen] =
    useState<boolean>(false);
  const isTransactionModalOpen = useTransactionStore(
    (state) => state.isTransactionModalOpen
  );
  const setisTransactionModalOpen = useTransactionStore(
    (state) => state.setIsTransactionModalOpen
  );
  const selectedPocket = usePocketStore((state) => state.selectedPocket);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <PocketSelector />
      </div>
      <div className="lg:col-span-2">
        <MonthSelector />
      </div>
      <div className="lg:col-span-3">
        <ExpenseSummary />
      </div>
      <div className="lg:col-span-2">
        {selectedPocket && <CategoryChart pocketId={selectedPocket.id} />}
      </div>
      <div className="lg:col-span-1">
        <RecentTransactions pocketId={selectedPocket?.id ?? 0} />
      </div>
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
      <div className="w-min fixed bottom-0 right-2 flex justify-center items-end flex-col gap-4 p-4">
        <MaiButton
          icon="pi pi-plus text-white text-sm"
          className=" bg-purple-600 shadow-sm p-0 group border-none"
          type="button"
          rounded
          onClick={() => setisTransactionModalOpen(true)}
        />
        <MaiButton
          icon="pi pi-arrow-right-arrow-left text-white text-sm"
          className="bg-purple-600 shadow-sm p-0 group border-none"
          type="button"
          rounded
          onClick={() => setIsTransferModalOpen(true)}
        />
        {/* <VoiceInput /> */}
      </div>
    </div>
  );
};
