export type Pocket = {
  id: number;
  name: string;
  balance: number;
  emoji: string;
  excludeBalance: boolean;
};

export type PocketRequest = {
  name: string;
  balance: number;
  excludeBalance: boolean;
  emoji?: string;
};

export type PocketResponse = {
  id: number;
  name: string;
  balance: number;
  emoji: string;
  excludeBalance: boolean;
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
