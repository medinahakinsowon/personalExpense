import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import apiClient from "../utils/axiosClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("ledger_token");
    if (!token) {
      setLoading(false);
      return;
    }
    apiClient
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("ledger_token");
        localStorage.removeItem("ledger_user");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await apiClient.post("/auth/login", { email, password });
    localStorage.setItem("ledger_token", res.data.token);
    localStorage.setItem("ledger_user", JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res.data.user;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const res = await apiClient.post("/auth/register", {
      name,
      email,
      password,
    });
    localStorage.setItem("ledger_token", res.data.token);
    localStorage.setItem("ledger_user", JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res.data.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("ledger_token");
    localStorage.removeItem("ledger_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const controlPanel = useContext(AuthContext);
  if (!controlPanel) throw new Error("useAuth must be used within AuthProvider");
  return controlPanel;
}
