import { Ripple } from "primereact/ripple";
import { Link } from "react-router";
import { Item } from "../../lib/types/Item";

type MaiMenuItemProps = {
  isActive: boolean;
  onHide: () => void;
  item: Item;
};

export const MaiMenuItem = ({ isActive, onHide, item }: MaiMenuItemProps) => {
  return (
    <Link
      to={item.path === "/transactions" ? `${item.path}/all` : item.path}
      className={`p-ripple flex items-center px-3 py-3 rounded-lg transition-colors ${
        isActive
          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-medium"
          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
      }`}
      onClick={() => onHide()}
    >
      <i className={`pi pi-${item.icon} w-[20.56px] text-center mr-3`} />
      <span>{item.label}</span>
      {isActive && (
        <span className="ml-auto w-1.5 h-6 rounded-full bg-purple-600"></span>
      )}
      <Ripple />
    </Link>
  );
};
