import { Navigate, useLocation } from "react-router";
import { ROUTES } from "../lib/constants";
import { useAuthStore } from "../lib/store/useAuthStore";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) {
    return <div className="p-4 text-center">Validando sesión...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
