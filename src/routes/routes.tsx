import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthProvider } from "../context/AuthProvider";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { RegisterPage } from "../pages/Register";
import PrivateRoute from "./PrivateRoute";

export default function RoutesPage() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute>
                <h1>Esta página es privada</h1>
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
