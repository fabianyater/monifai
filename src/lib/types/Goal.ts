export type GoalTransactionType = "DEPOSIT" | "WITHDRAWAL";

export type GoalRequest = {
  name: string;
  amount: number;
  dueDate: Date;
};

export type GoalResponse = {
  id: number;
  name: string;
  amount: number;
  balance: number;
  dueDate: Date;
  emoji: string;
};

export type GoalTransactionRequest = {
  goalId: number;
  amount: number;
  type: GoalTransactionType
};

export type GoalTransactionsResponse = {
  id: number;
  name: string;
  emoji: string;
  categoryName: string;
  amount: number;
  date: string;
  type: string;
};