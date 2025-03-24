import { Avatar } from "primereact/avatar";
import { Tooltip } from "primereact/tooltip";
import { useAuthContext } from "../../lib/hooks/useAuth";
import { MaiButton } from "../atoms/MaiButton";

type HeaderProps = {
  toggleSidebar: () => void;
};

export const Header = ({ toggleSidebar }: HeaderProps) => {
  const { user } = useAuthContext();

  return (
    <header className="w-full flex items-center justify-between py-4">
      <div className="flex items-center justify-center gap-2">
        <MaiButton
          className="border-none focus:shadow-none"
          icon="pi pi-bars"
          size="large"
          rounded
          style={{ backgroundColor: "transparent" }}
          onClick={toggleSidebar}
        />
        <h1 className="text-3xl font-normal">
          Monif<span className="font-black">AI</span>
        </h1>
      </div>
      <Tooltip target=".avatar" content={user?.sub} position="left" />
      <Avatar
        className="avatar"
        label={user?.sub?.charAt(0).toUpperCase()}
        size="xlarge"
        shape="circle"
        style={{
          backgroundColor: "#0f28b8",
          fontWeight: "900",
          width: "50px",
          height: "50px",
        }}
        color="#fff"
      />
    </header>
  );
};
