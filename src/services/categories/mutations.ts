import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "./api";
import { categoriesKeys } from "./keys";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...categoriesKeys.categories, "create"],
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesKeys.categories,
        refetchType: "active",
      });
    },
  });
};
