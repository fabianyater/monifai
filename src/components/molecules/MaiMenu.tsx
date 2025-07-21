import { useLocation } from "react-router";
import { MAIN_MENU_ITEMS } from "../../lib/constants/menu";
import { MaiMenuItem } from "../atoms/MaiMenuItem";

type MaiMenuProps = {
  onHide: () => void;
};
export const MaiMenu = ({ onHide }: MaiMenuProps) => {
  const location = useLocation();

  return (
    <ul className="flex flex-col gap-2 mt-4">
      {MAIN_MENU_ITEMS.map((item) => {
        const isActive = location.pathname.startsWith(item.path);

        return (
          <li key={item.id}>
            <MaiMenuItem isActive={isActive} item={item} onHide={onHide} />
          </li>
        );
      })}
    </ul>
  );
};
