import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "./api";

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await getUserInfo(id);
      return response.data;
    },
  });
};
