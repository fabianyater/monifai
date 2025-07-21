import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PocketRequest } from "../../lib/types/Pocket";
import { createPocket, transferBetweenPockets, updatePocket } from "./api";
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

export const useUpdatePocket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...pocketKeys.pockets, "update"],
    mutationFn: (data: { pocketId: number; pocket: PocketRequest }) =>
      updatePocket(data),
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
