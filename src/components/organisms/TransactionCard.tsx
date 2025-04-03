import { useQuery } from "@tanstack/react-query";
import { usePocketStore } from "../../lib/store/usePocketStore";

import { useTransactionStore } from "../../lib/store/useTransactionStore";
import { useMonthlyBalance } from "../../services/transactions/queries";
import { FormattedAmount } from "../atoms/FormattedAmount";
import { VoiceInput } from "../atoms/VoiceInput";
import { TransactionSummary } from "../molecules/TransactionSummary";

export const TransactionCard = () => {
  const selectedPocket = usePocketStore((state) => state.selectedPocket);
  const transactionType = useTransactionStore((state) => state.transactionType);
  const { queryKey, queryFn } = useMonthlyBalance(
    selectedPocket?.id ?? 0,
    transactionType
  );
  const { data } = useQuery({
    queryKey,
    queryFn,
    enabled: !!selectedPocket && !!selectedPocket.id,
  });

  console.log(transactionType);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-[#2D2D2D] rounded-3xl py-4">
      <TransactionSummary amount={selectedPocket?.balance ?? 0} />
      <div className="my-4">
        <FormattedAmount amount={data ?? 0} />
      </div>
      <VoiceInput />
    </div>
  );
};
