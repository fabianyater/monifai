import { Ripple } from "primereact/ripple";
import { Pocket } from "../../lib/types/Pocket";

type PocketCardProps = {
  pocket: Pocket;
};

export const PocketCard = ({ pocket }: PocketCardProps) => {
  return (
    <div
      className="flex flex-col items-center gap-3 group cursor-pointe cursor-pointer"
    >
      <div className="w-24 h-24 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition-colors duration-300 relative overflow-hidden flex items-center justify-center shadow-md">
        <Ripple />
        <div className="w-full h-full flex items-center justify-center">
          <div key={pocket.id} className="text-5xl">
            {pocket.emoji}
          </div>
        </div>
      </div>
      <span className="text-sm font-semibold text-center text-gray-300 break-words w-full">
        {pocket.name}
      </span>
    </div>
  );
};
