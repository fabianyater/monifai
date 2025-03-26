import { Dropdown } from "primereact/dropdown";
import { Pocket } from "../../lib/types/Pocket";

type MaiSelectProps = {
  data: Pocket[];
  selectedPocket: Pocket | null;
  setSelectedPocket: (pocket: Pocket) => void;
  isLoading: boolean;
};

export const MaiSelect = ({
  data,
  selectedPocket,
  setSelectedPocket,
  isLoading,
}: MaiSelectProps) => {
  return (
    <Dropdown
      className="bg-transparent outline-none border-none focus:ring-0 shadow-none"
      options={data}
      optionLabel="name"
      placeholder="Selecciona tu bolsillo"
      onChange={(e) => setSelectedPocket(e.value)}
      value={selectedPocket}
      loading={isLoading}
      valueTemplate={(option, props) => {
        if (!option) {
          return <span className="text-gray-400">{props.placeholder}</span>;
        }

        return (
          <div className="flex items-center gap-2 text-white">
            <span>{option.emoji}</span>
            <span>{option.name}</span>
          </div>
        );
      }}
      pt={{
        root: {
          className: "bg-transparent border-none outline-none shadow-none",
        },
        input: {
          className: "text-white placeholder:text-gray-400",
        },
        trigger: {
          className: "text-white",
        },
      }}
    />
  );
};
