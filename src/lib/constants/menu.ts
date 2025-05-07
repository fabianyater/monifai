import { Item } from "../types/Item";
import { ROUTES } from "./routes";

export const MAIN_MENU_ITEMS: Item[] = [
  { id: 1, label: "Inicio", icon: "pi pi-fw pi-home", path: ROUTES.HOME },
  {
    id: 2,
    label: "Bolsillos",
    icon: "pi pi-fw pi-wallet",
    path: ROUTES.POCKETS,
  },
  {
    id: 3,
    label: "Categorías",
    icon: "pi pi-fw pi-th-large",
    path: ROUTES.CATEGORIES,
  },
  {
    id: 4,
    label: "Deudas",
    icon: "pi pi-fw pi-money-bill",
    path: ROUTES.LOANS,
  },
  {
    id: 5,
    label: "Metas",
    icon: "pi pi-bullseye",
    path: ROUTES.GOALS,
  },
  {
    id: 6,
    label: "Presupuestos",
    icon: "pi pi-fw pi-calendar",
    path: ROUTES.BUDGETS,
  }
];
