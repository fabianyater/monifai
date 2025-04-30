import { formatAmount } from "./formatAmount";

export const calculatePaidAmount = (amount: number, balance: number) => {
  return amount && balance ? formatAmount(amount - balance) : 0;
};

export const calculateProgress = (amount: number, paidAmount: number) => {
  return amount ? Math.round((paidAmount / amount) * 100) : 0;
};
