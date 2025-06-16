import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { MaiButton } from "../components/atoms/MaiButton";
import { VoiceInput } from "../components/atoms/VoiceInput";
import { CreateTransactionModal } from "../components/molecules/CreateTransactionModal";
import { CreateTransferModal } from "../components/molecules/CreateTransferModal";
import { ExpenseSummary } from "../components/molecules/ExpenseSummary";
import { CategoryChart } from "../components/organisms/CategoryChart";
import RecentTransactions from "../components/organisms/RecentTransactions";
import { useDateSelectorStore } from "../lib/store/useDateSelectorStore";
import { usePocketStore } from "../lib/store/usePocketStore";
import { useTransactionStore } from "../lib/store/useTransactionStore";

export const HomePage = () => {
  const date = useDateSelectorStore((state) => state.date);
  const setDate = useDateSelectorStore((state) => state.setDate);
  const [isTransferModalOpen, setIsTransferModalOpen] =
    useState<boolean>(false);
  const isTransactionModalOpen = useTransactionStore(
    (state) => state.isTransactionModalOpen
  );
  const setisTransactionModalOpen = useTransactionStore(
    (state) => state.setIsTransactionModalOpen
  );
  const selectedPocket = usePocketStore((state) => state.selectedPocket);

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-3">
        <ExpenseSummary/>
      </div>
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between">
          <Button
            icon="pi pi-arrow-left"
            size="small"
            onClick={handlePreviousMonth}
          />
          <Calendar
            value={date}
            onChange={(e) => {
              if (e.target.value) {
                setDate(e.target.value);
              }
            }}
            view="month"
            dateFormat="MM"
            showButtonBar
          />
          <Button
            icon="pi pi-arrow-right"
            size="small"
            onClick={handleNextMonth}
          />
        </div>
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
      <div className="fixed bottom-0 left-0 right-0 flex justify-center items-end flex-col gap-4 p-4">
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
        <VoiceInput />
      </div>
    </div>
  );
};
