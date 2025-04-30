import { CategoryRequest } from "./Category";

export type TransactionType = "INCOME" | "EXPENSE";

export type TransactionTypeOption = {
  label: string;
  value: TransactionType;
};

export type Periodicity =
  | "ONCE"
  | "DAILY"
  | "WEEKLY"
  | "BIWEEKLY"
  | "MONTHLY"
  | "QUARTERLY"
  | "YEARLY";

export interface Transaction {
  id: number;
  uuid: string;
  description: string;
  amount: number;
  date: Date;
  periodicity: Periodicity;
  transactionType: TransactionType;
  categoryId: number;
  pocketId: number;
}

export interface ClassifiedTransaction {
  date: Date;
  description: string;
  value: number;
  periodicity: Periodicity;
  type: TransactionType;
  category: string;
}

export interface TransactionRequest {
  description: string;
  amount: number;
  date: Date;
  periodicity: Periodicity;
  transactionType: TransactionType;
  category: CategoryRequest;
  pocketId: number;
}

export type TransactionSummaryByCategories = {
  id: number;
  name: string;
  defaultEmoji: string;
  totalAmount: number;
};

export type TransactionResponse = {
  id: number;
  description: string;
  value: number;
  category: string;
  emoji: string;
  date: string;
}


export const transactionTypes: TransactionTypeOption[] = [
  {
    label: "Ingresos",
    value: "INCOME",
  },
  {
    label: "Gastos",
    value: "EXPENSE",
  },
];
