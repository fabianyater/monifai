export type LoanType = "LENDER" | "BORROWER";

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
};
