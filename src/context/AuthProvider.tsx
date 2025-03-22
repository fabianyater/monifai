import { jwtDecode } from "jwt-decode";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface DecodedToken {
  sub?: string;
  userId?: string;
  uuid?: string;
  exp?: number;
  [key: string]: unknown;
}

interface AuthContextProps {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  user: DecodedToken | null;
  logout: VoidFunction;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(storedToken);
        const isTokenExpired = decoded.exp
          ? decoded.exp * 1000 < Date.now()
          : false;

        if (isTokenExpired) {
          toast.error("Tu sesión ha expirado", { duration: 2000 });
          logout();
        } else {
          setToken(storedToken);
          setUser(decoded);
        }
      } catch {
        toast.error("Ha ocurrido un error al decodificar el token");
        logout();
      }
    }

    setIsLoading(false);
  }, [logout]);

  const value = useMemo(
    () => ({
      token,
      setToken,
      user,
      logout,
      isLoading,
      setIsLoading,
    }),
    [token, user, logout, isLoading]
  );

  if (isLoading) {
    return toast.loading("Cargando...");
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
