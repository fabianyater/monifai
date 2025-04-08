import { useMutation, useQueryClient } from "@tanstack/react-query";
import { classifyTransaction } from "./api";
import { transactionKeys } from "./keys";

export const useClassifyTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...transactionKeys.classifyTransaction, "create"],
    mutationFn: classifyTransaction,
    onSuccess: () => {
      console.log("✅ Transacción clasificada");
      queryClient.invalidateQueries({
        queryKey: transactionKeys.classifyTransaction,
        refetchType: "active",
      });
    },
  });
};
