import { useState } from "react";
import { CustomSidebar } from "../../components/CustomSidebar";
import { Header } from "../../components/Header";
import { Outlet } from "react-router";

export const AppLayout = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="container mx-auto max-w-screen-lg">
      <Header toggleSidebar={() => setVisible(true)} />
        <CustomSidebar visible={visible} onHide={() => setVisible(false)} />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};
