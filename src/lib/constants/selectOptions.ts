import { LoanType } from "../types/Loan";
import { Periodicity } from "../types/Transactions";

export type SelectOption<T = string> = {
  label: string;
  value: T;
};

export const PERIODICITY_OPTIONS: SelectOption<Periodicity>[] = [
  { label: "Una vez", value: "ONCE" },
  { label: "Diario", value: "DAILY" },
  { label: "Semanal", value: "WEEKLY" },
  { label: "Quincenal", value: "BIWEEKLY" },
  { label: "Mensual", value: "MONTHLY" },
  { label: "Trimestral", value: "QUARTERLY" },
  { label: "Anual", value: "YEARLY" },
];

export const LOAN_TYPE_OPTIONS: SelectOption<LoanType>[] = [
  { label: "Por cobrar", value: "LENDER" },
  { label: "Por pagar", value: "BORROWER" },
];