import { Sidebar } from "primereact/sidebar";
import { MaiMenu } from "../molecules/MaiMenu";

type CustomSidebarProps = {
  visible: boolean;
  onHide: () => void;
};

export const CustomSidebar = ({ visible, onHide }: CustomSidebarProps) => {
  return (
    <Sidebar
      visible={visible}
      onHide={() => onHide()}
      style={{ backgroundColor: "#2D2D2D" }}
      color="#fff"
    >
      <MaiMenu onHide={onHide} />
    </Sidebar>
  );
};
