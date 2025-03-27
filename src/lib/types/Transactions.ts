export type TransactionType = {
  label: string;
  value: "incomes" | "expenses";
};

export const transactionTypes: TransactionType[] = [
  {
    label: "Ingresos",
    value: "incomes",
  },
  {
    label: "Gastos",
    value: "expenses",
  },
];