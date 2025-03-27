import { getPockets } from "./api";
import { pocketKeys } from "./keys";

export const usePockets = (userId: number) => {
  return {
    queryKey: [pocketKeys.pockets, userId],
    queryFn: async () => {
      const response = await getPockets(userId);
      return response;
    },
  };
};
