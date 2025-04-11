import { Avatar } from "primereact/avatar";
import { Skeleton } from "primereact/skeleton";
import { Tooltip } from "primereact/tooltip";
import { useMemo } from "react";
import { getContrastColor } from "../../lib/helpers/invertColor";
import { useUserStore } from "../../lib/store/useUserStore";
import { MaiButton } from "../atoms/MaiButton";

type HeaderProps = {
  toggleSidebar: () => void;
};

export const Header = ({ toggleSidebar }: HeaderProps) => {
  const user = useUserStore((state) => state.user);

  const { backgroundColor, textColor } = useMemo(() => {
    const bg = user?.color ?? "#0f28b8";
    const text = getContrastColor(bg);
    return { backgroundColor: bg, textColor: text };
  }, [user?.color]);

  const isLoading = !user?.name;

  return (
    <header className="w-full flex items-center justify-between py-4 pr-4 lg:px-0">
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

      {isLoading ? (
        <Skeleton shape="circle" size="3rem" />
      ) : (
        <>
          <Tooltip target=".avatar" content={user.name} position="left" />
          <Avatar
            className="avatar"
            label={user.name.charAt(0).toUpperCase()}
            size="xlarge"
            shape="circle"
            style={{
              backgroundColor,
              fontWeight: "900",
              width: "50px",
              height: "50px",
              color: textColor,
            }}
          />
        </>
      )}
    </header>
  );
};
