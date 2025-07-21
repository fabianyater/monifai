import { getLoan, getLoans, getTotalLoanBalance } from "./api";
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

export const useTotalLoanBalance = () => {
  return {
    queryKey: [loanKeys.loan],
    queryFn: async () => {
      const response = await getTotalLoanBalance();
      return response;
    },
  };
};
