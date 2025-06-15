export type Pocket = {
  id: number;
  name: string;
  balance: number;
  emoji: string;
};

export type PocketRequest = {
  name: string;
  balance: number;
  excludeBalance: boolean;
};

export type PocketResponse = {
  id: number;
  name: string;
  balance: number;
  emoji: string;
};

export type TotalBalanceResponse = {
  totalBalance: number;
};

export type PocketBalanceSummary = {
  currentBalance: number;
  monthlyNetChange: number;
  previousMonthlyNetChange: number;
  balanceTrendPercentage: number;
};

export type PocketTransferRequest = {
  fromPocketId: number;
  toPocketId: number;
  amount: number;
};
