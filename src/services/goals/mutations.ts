import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGoal, makeDeposit, makeWithdraw } from "./api";
import { goalKeys } from "./keys";

export const useCreateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...goalKeys.goals, "create"],
    mutationFn: createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [goalKeys.goals],
        refetchType: "active",
      });
    },
  });
};

export const useMakeDeposit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...goalKeys.deposit, "deposit"],
    mutationFn: makeDeposit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [goalKeys.goals],
        refetchType: "active",
      });
    },
  });
};

export const useMakeWithdraw = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...goalKeys.withdraw, "withdraw"],
    mutationFn: makeWithdraw,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [goalKeys.goals],
        refetchType: "active",
      });
    },
  });
};
