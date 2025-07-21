import { getCategories } from "./api";
import { categoriesKeys } from "./keys";

export const useCategories = () => {
  return {
    queryKey: categoriesKeys.categories,
    queryFn: async () => {
      const categories = await getCategories();
      return categories;
    },
  };
};
