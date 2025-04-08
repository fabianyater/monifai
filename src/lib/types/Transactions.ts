export type TransactionType = "INCOME" | "EXPENSE";

export type TransactionTypeOption = {
  label: string;
  value: TransactionType;
};

export interface Transaction {
  id: number;
  uuid: string;
  description: string;
  amount: number;
  date: Date;
  periodicity: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  transactionType: TransactionType;
  categoryId: number;
  pocketId: number;
}

export type ClassifyTransactionResponse = {
  fecha: string;
  periodicidad: string;
  categoria: string;
  valor: number;
  tipo: string;
};

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