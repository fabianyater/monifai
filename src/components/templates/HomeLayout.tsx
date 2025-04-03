import { useState } from "react";
import { Outlet } from "react-router";
import { CustomSidebar } from "../organisms/CustomSidebar";
import { Header } from "../organisms/Header";

export const HomeLayout = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="container mx-auto max-w-screen-lg bg-[#1A1A1A]">
      <Header toggleSidebar={() => setVisible(true)} />
      <CustomSidebar visible={visible} onHide={() => setVisible(false)} />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};
