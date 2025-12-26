import React, {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useState
} from "react";
import { useNavigate } from "react-router-dom";

export interface User {
  fullName: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
}

interface AuthContextType {
  authState: AuthState;
  login: (data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  }) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  authState: { accessToken: null, user: null },
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  loading: true
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    user: null
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const userRaw = localStorage.getItem("user");

      if (!accessToken || !userRaw) return;

      const user = JSON.parse(userRaw) as User;

      setAuthState({
        accessToken,
        user
      });
    } catch (err) {
      console.error("Auth bootstrap failed:", err);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    (data: { accessToken: string; refreshToken: string; user: User }) => {
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      setAuthState({
        accessToken: data.accessToken,
        user: data.user
      });

      navigate("/app", { replace: true });
    },
    [navigate]
  );

  const logout = useCallback(() => {
    localStorage.clear();
    setAuthState({ accessToken: null, user: null });
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
        isAuthenticated: Boolean(authState.accessToken),
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
