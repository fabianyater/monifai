import { Toaster } from "sonner";
import RoutesPage from "./routes/routes";
import { useEffect } from "react";
import { useAuthStore } from "./lib/store/useAuthStore";

function App() {

  const checkSession = useAuthStore((state) => state.checkSession);

  useEffect(() => {
    checkSession();
  }, [checkSession]);
  return (
    <>
      <RoutesPage></RoutesPage>
      <Toaster position="bottom-left" />
    </>
  );
}

export default App;
