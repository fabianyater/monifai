import { useQuery } from "@tanstack/react-query";
import { formatAmount } from "../../lib/helpers/formatAmount";
import { usePocketStore } from "../../lib/store/usePocketStore";
import { useTotalBalance } from "../../services/pockets/queries";
import { TransactionTypeSelector } from "../atoms/TransactionTypeSelector";

export const TransactionSummary = () => {
  const selectedPocket = usePocketStore((state) => state.selectedPocket);

  const { queryKey, queryFn } = useTotalBalance(selectedPocket?.id ?? 0);
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn,
    enabled: !!selectedPocket?.id,
  });

  return (
    <div className="flex flex-col">
      <TransactionTypeSelector />
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm lg:text-base text-center font-medium">
          Total{" "}
        </span>
        <span className="text-sm lg:text-base font-black">
          {isLoading ? "..." : formatAmount(data?.currentBalance ?? 0)}
        </span>
      </div>
    </div>
  );
};
