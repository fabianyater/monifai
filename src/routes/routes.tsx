import { BrowserRouter, Route, Routes } from "react-router";
import { NotFoundPage } from "../pages/404/NotFoundPage";

export default function RoutesPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Monifai</h1>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
