import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { Tooltip } from "primereact/tooltip";
import { useEffect, useState } from "react";
import { useUserStore } from "../../lib/store/useUserStore";

type HeaderProps = {
  toggleSidebar: () => void;
};

const genInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
};

export const Header = ({ toggleSidebar }: HeaderProps) => {
  const [greeting, setGreeting] = useState<string>("");
  const [scrolled, setScrolled] = useState<boolean>(false);

  const user = useUserStore((state) => state.user);

  const isLoading = !user?.name;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    let newGreeting = "";

    if (hour >= 5 && hour < 12) {
      newGreeting = "¡Buenos días👋,";
    } else if (hour >= 12 && hour < 19) {
      newGreeting = "¡Buenas tardes👋,";
    } else {
      newGreeting = "¡Buenas noches👋,";
    }

    setGreeting(newGreeting);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-20 py-4 px-4 md:px-6 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            className="border-none focus:shadow-none text-white"
            icon="pi pi-bars"
            size="large"
            rounded
            style={{ backgroundColor: "transparent" }}
            onClick={toggleSidebar}
          />

          <h1 className="text-xl md:text-2xl font-bold text-white">MonifAI</h1>
        </div>

        <div className="hidden md:block">
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">
            {greeting} <span className="font-bold ml-2">{user?.name}</span>!
          </h2>
        </div>

        <Tooltip target=".avatar" content={user?.name} position="left" />
        {isLoading ? (
          <Skeleton shape="circle" size="3rem" />
        ) : (
          <Avatar
            className="avatar bg-purple-600"
            label={genInitials(user?.name)}
            size="xlarge"
            shape="circle"
            style={{
              fontWeight: "500",
              width: "3rem",
              height: "3rem",
            }}
          />
        )}
      </div>
    </header>
  );
};
