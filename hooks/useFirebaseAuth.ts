// get Firebase app instance

import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";

interface UserContextType {
  current: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  async function login(email: string, password: string): Promise<void> {
    const { user: loggedIn } = await signInWithEmailAndPassword(auth, email, password);
    setUser(loggedIn);
  }

  async function logout(): Promise<void> {
    await signOut(auth);
    setUser(null);
  }

  async function register(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(auth, email, password);
    await login(email, password);
  }

  useEffect(() => {
    // Firebase's onAuthStateChanged replaces the manual init() call
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
}