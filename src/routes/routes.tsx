import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthProvider } from "../context/AuthProvider";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { AppLayout } from "../pages/private/AppLayout";
import { HomePage } from "../pages/private/HomePage";
import { RegisterPage } from "../pages/Register";
import PrivateRoute from "./PrivateRoute";

export default function RoutesPage() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/home" replace />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <PrivateRoute>
                  <div>Categorías</div>
                </PrivateRoute>
              }
            />
          </Route>

          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
