import { useQuery } from "@tanstack/react-query";
import { useTransactionStore } from "../../lib/store/useTransactionStore";
import { useTransactionSummaryByCategory } from "../../services/transactions/queries";
type CategoryChartProps = {
  pocketId: number;
};

import { motion } from "framer-motion";
import { Skeleton } from "primereact/skeleton";
import { Tooltip } from "primereact/tooltip";
import { useNavigate } from "react-router";
import { useDateSelectorStore } from "../../lib/store/useDateSelectorStore";
import Card, { CardContent, CardHeader, CardTitle } from "../molecules/Card";

export const CategoryChart = ({ pocketId }: CategoryChartProps) => {
  const date = useDateSelectorStore((state) => state.date);
  const navigate = useNavigate();
  const transactionType = useTransactionStore((state) => state.transactionType);
  const { queryKey, queryFn, enabled } = useTransactionSummaryByCategory(
    pocketId,
    transactionType,
    date
  );

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn,
    enabled,
  });

  const maxAmount = Math.max(...(data?.map((c) => c.totalAmount) ?? [1]));
  const title = transactionType === "EXPENSE" ? "Gastos" : "Ingresos";

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            <Skeleton width="120px" height="28px" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-start items-end gap-2 w-full px-6 h-[250px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center w-14">
                <Skeleton
                  height={`${Math.random() * 150 + 48}px`}
                  width="100%"
                  className="rounded-xl"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title} por categoría</CardTitle>
      </CardHeader>
      <CardContent>
        {data && data.length > 0 ? (
          <div className="flex justify-start items-end gap-2 w-full px-6 h-[250px]">
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
                      {category.defaultEmoji}
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
        ) : (
          <div
            className="flex flex-col items-center justify-center h-[250px] bg-contain bg-center bg-no-repeat"
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
        )}
      </CardContent>
    </Card>
  );
};
