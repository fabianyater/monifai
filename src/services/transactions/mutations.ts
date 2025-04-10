import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  return useMutation({
    mutationKey: [...transactionKeys.createTransaction, "create"],
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionKeys.createTransaction,
        refetchType: "active",
      });
    },
  });
};
