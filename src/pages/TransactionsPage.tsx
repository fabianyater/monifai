import { useQuery } from "@tanstack/react-query";
import { addLocale } from "primereact/api";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { useParams } from "react-router";
import { Spinner } from "../components/atoms/Spinner";
import { formatAmount } from "../lib/helpers/formatAmount";
import { formatDate } from "../lib/helpers/formatDate";
import { usePocketStore } from "../lib/store/usePocketStore";
import { useTransactionStore } from "../lib/store/useTransactionStore";
import {
  useTransactionsByCategoryName,
  useTransactionsByCategoryNameFilteredByDate,
} from "../services/transactions/queries";

export const TransactionsPage = () => {
  const [dates, setDates] = useState<Date[]>([]);
  const transactionType = useTransactionStore((state) => state.transactionType);
  const pocketId = usePocketStore((state) => state.selectedPocket?.id);
  const { categoryName } = useParams();

  const isFilteringByDate = dates.length === 2;

  const transactionsByCategory = useTransactionsByCategoryName(
    categoryName ?? "",
    pocketId ?? 0,
    transactionType
  );

  const transactionsByCategoryFilteredByDate =
    useTransactionsByCategoryNameFilteredByDate(
      categoryName ?? "",
      pocketId ?? 0,
      transactionType,
      dates[0],
      dates[1]
    );

  const queryResult = useQuery({
    queryKey: isFilteringByDate
      ? [
          "transactions-by-category-dates",
          categoryName,
          pocketId,
          transactionType,
          dates,
        ]
      : ["transactions-by-category", categoryName, pocketId, transactionType],
    queryFn: () =>
      isFilteringByDate
        ? transactionsByCategoryFilteredByDate.queryFn()
        : transactionsByCategory.queryFn(),
    enabled: !!categoryName,
  });

  const { data, isPending } = queryResult;

  const showSingular = data?.length === 1 ? "Transacción" : "Transacciones";

  addLocale("es", {
    firstDayOfWeek: 1,
    dayNames: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
  });

  if (isPending) return <Spinner />;

  return data ? (
    <div>
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="font-semibold text-3xl tracking-tight">
            Transacciones en {categoryName}
          </h2>
          <span>
            {formatAmount(data.reduce((acc, curr) => acc + curr.value, 0))}
          </span>
        </div>
        <div className="flex  flex-col gap-2 items-end">
          <span className="text-gray-300 text-sm">
            {data.length > 0 ? data.length : 0} {showSingular}
          </span>
          <Calendar
            locale="es"
            iconPos="left"
            icon="pi pi-filter"
            showIcon
            value={dates}
            onChange={(e) => {
              const selectedDates = (e.value ?? []).filter(
                (date): date is Date => date !== null
              );
              setDates(selectedDates);
            }}
            selectionMode="range"
            readOnlyInput
            hideOnRangeSelection
            placeholder="Selecciona un rango de fechas"
            showButtonBar
          />
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-4">
        {data.map((transaction) => (
          <div
            key={transaction.id}
            className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-gray-600 hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
          >
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                {transaction.emoji}
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold">
                  {transaction.description}
                </span>
                <span className="text-sm text-gray-300">
                  {formatDate(transaction.date)}
                </span>
              </div>
            </div>
            <div className="text-lg font-semibold text-right">
              {formatAmount(transaction.value, undefined, "COP")}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span className="text-white text-lg drop-shadow-md">
        No hay transacciones para este bolsillo
      </span>
      <span className="text-gray-300 text-sm drop-shadow-md">
        Intenta añadir una transacción nueva haciendo clic en el micrófono
      </span>
    </div>
  );
};
