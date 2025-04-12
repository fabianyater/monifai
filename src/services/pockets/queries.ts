import { getPocketBalance, getPockets } from "./api";
import { pocketKeys } from "./keys";

export const usePockets = () => {
  return {
    queryKey: [pocketKeys.pockets],
    queryFn: async () => {
      const response = await getPockets();
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
