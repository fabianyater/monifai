import { useTransactionStore } from "../../lib/store/useTransactionStore";
import {
  TransactionTypeOption,
  transactionTypes,
} from "../../lib/types/Transactions";
import { MaiSelect } from "./MaiSelect";

export const TransactionTypeSelector = () => {
  const transactionType = useTransactionStore((state) => state.transactionType);
  const setTransactionType = useTransactionStore(
    (state) => state.setTransactionType
  );

  return (
    <MaiSelect<TransactionTypeOption>
      data={transactionTypes}
      selectedValue={
        transactionTypes.find((option) => option.value === transactionType)!
      }
      setSelectedValue={(option) => setTransactionType(option.value)}
      optionLabel="label"
      optionValue="value"
    />
  );
};
