import { useLocation } from "react-router";
import { Item } from "../../lib/types/Item";
import { MaiMenuItem } from "../atoms/MaiMenuItem";

type MaiMenuProps = {
  onHide: () => void;
};
export const MaiMenu = ({ onHide }: MaiMenuProps) => {
  const location = useLocation();

  const items: Item[] = [
    { id: 1, label: "Inicio", icon: "pi pi-fw pi-home", path: "/home" },
    {
      id: 2,
      label: "Categorías",
      icon: "pi pi-fw pi-th-large",
      path: "/categories",
    },
    { id: 3, label: "Bolsillos", icon: "pi pi-fw pi-wallet", path: "/pockets" },
  ];

  return (
    <ul className="flex flex-col gap-2 mt-4">
      {items.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <li key={item.id}>
            <MaiMenuItem isActive={isActive} item={item} onHide={onHide} />
          </li>
        );
      })}
    </ul>
  );
};
