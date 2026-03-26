// get Firebase app instance

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface FirebaseAuthContextType {
  current: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOff: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

const FirebaseAuthContext = createContext<FirebaseAuthContextType | null>(null);

export function useFirebaseAuth(): FirebaseAuthContextType {
  const context = useContext(FirebaseAuthContext);
  if (!context) throw new Error("useUser must be used within a FirebaseAuthProvider");
  return context;
}

interface FirebaseAuthProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: FirebaseAuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  async function signIn(email: string, password: string): Promise<void> {
    const { user: loggedIn } = await signInWithEmailAndPassword(auth, email, password);
    setUser(loggedIn);
  }

  async function signOff(): Promise<void> {
    await signOut(auth);
    setUser(null);
  }

  async function signUp(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    // Firebase's onAuthStateChanged replaces the manual init() call
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <FirebaseAuthContext.Provider value={{ current: user, signIn, signOff, signUp }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}