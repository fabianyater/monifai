import { getLoan, getLoans } from "./api";
import { loanKeys } from "./keys";

export const useLoans = () => {
  return {
    queryKey: [loanKeys.loans],
    queryFn: async () => {
      const response = await getLoans();
      return response;
    },
  };
};

export const useLoan = (loanId: number) => {
  return {
    queryKey: [loanKeys.loan, loanId],
    queryFn: async () => {
      const response = await getLoan(loanId);
      return response;
    },
    enabled: !!loanId,
  };
};
