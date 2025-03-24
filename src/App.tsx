import { Toaster } from "sonner";
import RoutesPage from "./routes/routes";

function App() {
  return (
    <>
      <RoutesPage></RoutesPage>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
