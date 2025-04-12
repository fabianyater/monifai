import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePocketStore } from "../../lib/store/usePocketStore";
import { useTransactionStore } from "../../lib/store/useTransactionStore";
import { classifyTransaction, createTransaction } from "./api";
import { transactionKeys } from "./keys";

export const useClassifyTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...transactionKeys.classifyTransaction, "create"],
    mutationFn: classifyTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionKeys.classifyTransaction,
        refetchType: "active",
      });
    },
  });
};

export const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient();
  const pocketId = usePocketStore.getState().selectedPocket?.id;
  const transactionType = useTransactionStore.getState().transactionType;

  return useMutation({
    mutationKey: [...transactionKeys.createTransaction, "create"],
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          transactionKeys.transactionSummaryByCategory,
          pocketId,
          transactionType,
        ],
        refetchType: "active",
      });
    },
  });
};
