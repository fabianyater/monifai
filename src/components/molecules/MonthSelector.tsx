import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useDateSelectorStore } from "../../lib/store/useDateSelectorStore";

export const MonthSelector = () => {
  const date = useDateSelectorStore((state) => state.date);
  const setDate = useDateSelectorStore((state) => state.setDate);

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        icon="pi pi-arrow-left"
        size="small"
        onClick={handlePreviousMonth}
        rounded
      />
      <Calendar
        value={date}
        onChange={(e) => {
          if (e.target.value) {
            setDate(e.target.value);
          }
        }}
        view="month"
        dateFormat="MM"
        showButtonBar
      />
      <Button
        icon="pi pi-arrow-right"
        size="small"
        rounded
        onClick={handleNextMonth}
      />
    </div>
  );
};
