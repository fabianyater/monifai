import { CategoryRequest } from "./Category";

export type TransactionType = "INCOME" | "EXPENSE";

export type TransactionTypeOption = {
  label: string;
  value: TransactionType;
};

export type Periodicity = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";

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
