import { useQuery } from "@tanstack/react-query";
import { useTransactionStore } from "../../lib/store/useTransactionStore";
import { useTransactionSummaryByCategory } from "../../services/transactions/queries";
import { Spinner } from "../atoms/Spinner";
type CategoryChartProps = {
  pocketId: number;
};

import { motion } from "framer-motion";
import { Tooltip } from "primereact/tooltip";
import { useNavigate } from "react-router";

export const CategoryChart = ({ pocketId }: CategoryChartProps) => {
  const navigate = useNavigate();
  const transactionType = useTransactionStore((state) => state.transactionType);
  const { queryKey, queryFn, enabled } = useTransactionSummaryByCategory(
    pocketId,
    transactionType
  );

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn,
    enabled,
  });

  if (isLoading) return <Spinner />;

  const maxAmount = Math.max(...(data?.map((c) => c.totalAmount) ?? [1]));

  return data && data.length > 0 ? (
    <div className="flex flex-col items-center justify-end w-full bg-[#2D2D2D] rounded-3xl py-4 h-[300px]">
      <div
        className="flex justify-start items-end gap-2 w-full px-6"
        style={{ height: 250 }}
      >
        <Tooltip target=".custom-tooltip-div" />
        {data?.map((category) => {
          const heightPx = (category.totalAmount / maxAmount) * 250;

          return (
            <div
              key={category.id}
              className="flex flex-col items-center w-14 cursor-pointer custom-tooltip-div"
              data-pr-tooltip={category.name}
              onClick={() => navigate(`/transactions/${category.name}`)}
            >
              <motion.div
                className="w-full bg-black/40 rounded-xl transition-all duration-500 flex flex-col items-center justify-end text-white text-sm hover:bg-black"
                initial={{ height: 0 }}
                animate={{ height: Math.max(heightPx, 48) }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <span className="text-xl leading-none">
                  {category.emoji[0]}
                </span>
                <span className="text-xs leading-none mb-1">
                  {category.totalAmount === 0
                    ? "0"
                    : `${category.totalAmount / 1000}K`}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div
      className="flex flex-col items-center justify-center w-full rounded-3xl py-4 h-[300px] text-center bg-[#2D2D2D] bg-contain bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(../../../../public/empty-bars.svg)`,
      }}
    >
      <span className="text-white text-lg drop-shadow-md">
        No hay transacciones para este bolsillo
      </span>
      <span className="text-gray-300 text-sm drop-shadow-md">
        Intenta añadir una transacción nueva haciendo clic en el micrófono
      </span>
    </div>
  );
};
