import {
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useAuth, UseAuthReturn } from "@/hooks/useFirebaseAuth";

// Context

const AuthContext = createContext<UseAuthReturn | undefined>(undefined);

// Context Provider

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook

export function useAuthContext(): UseAuthReturn {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used inside <AuthProvider>");
  }
  return ctx;
}


