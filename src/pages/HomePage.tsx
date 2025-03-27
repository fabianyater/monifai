import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "primereact/skeleton";
import { useEffect, useState } from "react";
import { MaiSelect } from "../components/atoms/MaiSelect";
import { useUserStore } from "../lib/store/useUserStore";
import { Pocket } from "../lib/types/Pocket";
import { TransactionType, transactionTypes } from "../lib/types/Transactions";
import { usePockets } from "../services/pockets/queries";

export const HomePage = () => {
  const [selectedPocket, setSelectedPocket] = useState<Pocket | null>(null);
  const [transactionType, setTransactionType] = useState<TransactionType>(
    transactionTypes[1]
  );

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
      <section className="w-full mt-4 flex">
        <div className="w-2/5 flex flex-col gap-2 items-start">
          <div className="flex items-center justify-start">
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
        </div>
        <div className="w-full flex flex-col gap-2 items-center justify-start">
          <div className="flex items-center justify-center w-full bg-gray-600 rounded-3xl">
            <div className="flex flex-col">
              <MaiSelect<TransactionType>
                data={transactionTypes}
                selectedValue={transactionType}
                setSelectedValue={setTransactionType}
                optionLabel="label"
                optionValue="value"
              />
              <div className="flex items-center justify-center gap-2">
                <span className="text-center font-medium">Total </span>
                <span
                  className="
                    font-black"
                >
                  $-50.90
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
