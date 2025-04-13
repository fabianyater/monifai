import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPocket } from "./api";
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
