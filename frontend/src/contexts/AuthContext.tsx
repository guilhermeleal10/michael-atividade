import { createContext, useContext, useMemo, useState } from "react";
import api from "../services/api";

type User = {
  id: string;
  nome: string;
  email: string;
  role: "ADMIN" | "PESQUISADOR";
};

type AuthContextValue = {
  user: User | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): User | null {
  try {
    const stored = localStorage.getItem("monitoramento_user");
    if (!stored) return null;

    const user: unknown = JSON.parse(stored);
    if (
      typeof user === "object" &&
      user !== null &&
      "id" in user && typeof user.id === "string" &&
      "nome" in user && typeof user.nome === "string" &&
      "email" in user && typeof user.email === "string" &&
      "role" in user && (user.role === "ADMIN" || user.role === "PESQUISADOR")
    ) {
      return user as User;
    }
  } catch {
    // Clear invalid session data below so the app can still render the login page.
  }

  localStorage.removeItem("monitoramento_user");
  localStorage.removeItem("monitoramento_token");
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(readStoredUser);

  async function login(email: string, senha: string) {
    const response = await api.post("/login", { email, senha });
    localStorage.setItem("monitoramento_token", response.data.token);
    localStorage.setItem("monitoramento_user", JSON.stringify(response.data.user));
    setUser(response.data.user);
  }

  function logout() {
    localStorage.removeItem("monitoramento_token");
    localStorage.removeItem("monitoramento_user");
    setUser(null);
    location.href = "/login";
  }

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("AuthProvider ausente");
  return context;
}
