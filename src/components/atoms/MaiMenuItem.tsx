import { Ripple } from "primereact/ripple";
import { useNavigate } from "react-router";
import { Item } from "../../lib/types/Item";

type MaiMenuItemProps = {
  isActive: boolean;
  onHide: () => void;
  item: Item;
};

export const MaiMenuItem = ({ isActive, onHide, item }: MaiMenuItemProps) => {
  const navigate = useNavigate();

  return (
    <button
      className={`p-ripple flex items-center cursor-pointer p-3 border-round rounded-full text-700 hover:surface-100 transition-duration-200 transition-colors w-full text-white hover:bg-gray-700 ${
        isActive ? "bg-gray-700" : ""
      } `}
      onClick={() => {
        navigate(item.path);
        onHide();
      }}
    >
      <i className={`${item.icon} mr-2`}></i>
      <span className="font-medium">{item.label}</span>
      <Ripple />
    </button>
  );
};
