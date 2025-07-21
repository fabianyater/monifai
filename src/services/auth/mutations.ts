import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "./api";
import { authKeys } from "./keys";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...authKeys.signOut],
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authKeys.signOut,
        refetchType: "active",
      });
    },
  });
};
