import { getPocketBalance, getPockets } from "./api";
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

export const useTotalBalance = (pocketId: number) => {
  return {
    queryKey: [pocketKeys.totalBalance, pocketId],
    queryFn: async () => {
      const response = await getPocketBalance(pocketId);
      return response;
    },
    enabled: !!pocketId,
  };
};
