import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { Greet } from "../components/atoms/Greet";
import { MaiButton } from "../components/atoms/MaiButton";
import { MaiSelect } from "../components/atoms/MaiSelect";
import { TransactionCard } from "../components/organisms/TransactionCard";
import { usePocketStore } from "../lib/store/usePocketStore";
import { useTransactionStore } from "../lib/store/useTransactionStore";
import { useUserStore } from "../lib/store/useUserStore";
import { Pocket } from "../lib/types/Pocket";
import { usePockets } from "../services/pockets/queries";
import { useClassifyTransaction } from "../services/transactions/mutations";

export const HomePage = () => {
  const userId = useUserStore((state) => state.userId);
  const user = useUserStore((state) => state.user);
  const selectedPocket = usePocketStore((state) => state.selectedPocket);
  const setSelectedPocket = usePocketStore((state) => state.setSelectedPocket);
  const transactionInput = useTransactionStore(
    (state) => state.transactionInput
  );
  const { queryKey, queryFn } = usePockets(Number(userId));
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn,
  });
  const { mutate } = useClassifyTransaction();

  const handleClassifyTransaction = () => {
    mutate(transactionInput, {
      onSuccess: () => {
        console.log("✅ Transacción clasificada");
        toast.success("Transacción clasificada correctamente");
      },
      onError: (error) => {
        console.error("Error al clasificar la transacción:", error);
        toast.error("Error al clasificar la transacción");
      },
    });
  };

  useEffect(() => {
    if (data && data.length > 0 && !selectedPocket) {
      setSelectedPocket(data[0]);
    }
  }, [data, selectedPocket, setSelectedPocket]);

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
            onClick={() => handleClassifyTransaction()}
          />
        </div>
        <div className="w-full flex flex-col gap-2 items-center justify-start">
          <TransactionCard />
        </div>
      </section>
    </div>
  );
};
