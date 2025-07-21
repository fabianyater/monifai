import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLoan, makePayment } from "./api";
import { loanKeys } from "./keys";

export const useCreateLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...loanKeys.loans, "create"],
    mutationFn: createLoan,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [loanKeys.loans],
        refetchType: "active",
      });
    },
  });
};

export const useCreateLoanPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...loanKeys.loanTrasaction, "create"],
    mutationFn: makePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: loanKeys.loans,
        refetchType: "active",
      });

      queryClient.refetchQueries(loanKeys.loanTrasaction);
    },
  });
};
