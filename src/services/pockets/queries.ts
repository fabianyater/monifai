import { getPocketBalance, getPockets, getTotalBalance } from "./api";
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

export const useTotalBalance = (pocketId: number, startDate: Date) => {
  return {
    queryKey: [pocketKeys.totalBalance, pocketId, startDate],
    queryFn: async () => {
      const response = await getPocketBalance(pocketId, startDate);
      return response;
    },
    enabled: !!pocketId,
  };
};

export const useAllPocketsBalance = () => {
  return {
    queryKey: [pocketKeys.allPocketsBalance],
    queryFn: async () => {
      const response = await getTotalBalance();
      return response;
    },
  };
};
