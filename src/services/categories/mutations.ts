import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory, updateCategoryDefaultEmoji } from "./api";
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

export const useUpdateCategoryDefaultEmoji = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...categoriesKeys.categories, "updateCategoryDefaultEmoji"],
    mutationFn: updateCategoryDefaultEmoji,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesKeys.categories,
        refetchType: "active",
      });
    },
  });
};
