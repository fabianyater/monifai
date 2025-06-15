import { useState } from "react";
import { Outlet } from "react-router";
import { useUserStore } from "../../lib/store/useUserStore";
import { Greet } from "../atoms/Greet";
import { CustomSidebar } from "../organisms/CustomSidebar";
import { Header } from "../organisms/Header";

export const HomeLayout = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const user = useUserStore((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header toggleSidebar={() => setVisible(true)} />
      <CustomSidebar isOpen={visible} onClose={() => setVisible(false)} />
      <main className="pt-20 pb-16 px-4 md:px-6 max-w-7xl mx-auto transition-all duration-300 md:ml-64">
        <div className="md:hidden mb-6">
          <Greet name={user?.name} />
        </div>
        <Outlet />
      </main>
    </div>
  );
};
