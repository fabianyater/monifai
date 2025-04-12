import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { HomeLayout } from "../components/templates/HomeLayout";
import { ROUTES } from "../lib/constants";
import { CategoriesPage } from "../pages/CategoriesPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { RegisterPage } from "../pages/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import { PocketsPage } from "../pages/PocketsPage";

export default function RoutesPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomeLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to={ROUTES.HOME} replace />} />
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
          <Route path={ROUTES.POCKETS} element={<PocketsPage />} />
        </Route>

        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
