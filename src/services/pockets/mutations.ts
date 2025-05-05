import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPocket, transferBetweenPockets } from "./api";
import { pocketKeys } from "./keys";

export const useCreatePocket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...pocketKeys.pockets, "create"],
    mutationFn: createPocket,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [pocketKeys.pockets],
        refetchType: "active",
      });
    },
  });
};

export const useTransferBetweenPockets = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...pocketKeys.pockets, "transfer"],
    mutationFn: transferBetweenPockets,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [pocketKeys.pockets],
        refetchType: "active",
      });
    },
  });
};
