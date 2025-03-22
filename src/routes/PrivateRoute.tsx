import { Navigate, useLocation } from "react-router";
import { toast } from "sonner";
import { useAuthContext } from "../hooks/useAuth";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) {
    return toast.loading("Validando token...");
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
