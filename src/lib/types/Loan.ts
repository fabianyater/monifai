export type LoanType = "LENDER" | "BORROWER";
export type LoanStatus = "ACTIVE" | "COMPLETED";
export type LoanRequest = {
  amount: number;
  loanParty: string;
  description?: string;
  loanType: LoanType;
  pocketId: number;
};

export type LoanResponse = {
  id: number;
  loanParty: string;
  description: string;
  amount: number;
  balance: number;
  loanType: LoanType;
  startDate: string;
  pocketName: string;
  status: LoanStatus;
};

export type LoanPaymentRequest = {
  loanId: number;
  pocketId: number;
  amount: number;
};

export type TotalLoanBalanceResponse = {
  balance: number;
};
