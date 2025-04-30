export type Pocket = {
  id: number;
  name: string;
  balance: number;
  emoji: string;
};

export type PocketRequest = {
  name: string;
  balance: number;
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