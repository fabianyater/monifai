import { Ripple } from "primereact/ripple";
import { Sidebar } from "primereact/sidebar";
import { useLocation, useNavigate } from "react-router";

type CustomSidebarProps = {
  visible: boolean;
  onHide: () => void;
};

export const CustomSidebar = ({ visible, onHide }: CustomSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
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
    <Sidebar
      visible={visible}
      onHide={() => onHide()}
      style={{ backgroundColor: "#242424" }}
      color="#fff"
    >
      <ul className="flex flex-col gap-2 mt-4">
        {items.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={item.id}>
              <button
                className={`p-ripple flex items-center cursor-pointer p-3 border-round rounded-full text-700 hover:surface-100 transition-duration-200 transition-colors w-full text-white hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                } `}
                onClick={() => {
                  navigate(item.path);
                  onHide();
                }}
              >
                <i className={`pi pi-${item.icon} mr-2`}></i>
                <span className="font-medium">{item.label}</span>
                <Ripple />
              </button>
            </li>
          );
        })}
      </ul>
    </Sidebar>
  );
};
