import { create } from "zustand";
import { Transaction, TransactionType } from "../types/Transactions";

type TransactionStore = {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  transactionType: TransactionType;
  setTransactionType: (transactionType: TransactionType) => void;
  isLoading: boolean;
  monthlyTotal: number;
  transactionInput: string;
  setTransactionInput: (transactionInput: string) => void;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  setTransactions: (transactions: Transaction[]) => set({ transactions }),
  transactionType: "EXPENSE",
  setTransactionType: (transactionType: TransactionType) =>
    set({ transactionType }),
  isLoading: true,
  monthlyTotal: 0,
  transactionInput: "",
  setTransactionInput: (transactionInput: string) => set({ transactionInput }),
}));
