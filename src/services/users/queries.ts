import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "./api";
import { userKeys } from "./keys";

export const useUser = (id: number) => {
  return useQuery({
    queryKey: [userKeys.user(id)],
    queryFn: async () => {
      const response = await getUserInfo(id);
      return response.data;
    },
  });
};
