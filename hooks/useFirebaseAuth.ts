import { useState, useEffect, useCallback } from "react";
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  Auth,
  User,
  UserCredential,
} from "firebase/auth";

// ─── Firebase Config ──────────────────────────────────────────────────────────
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth: Auth = getAuth(app);

// ─── Auth State ───────────────────────────────────────────────────────────────
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// ─── Hook Return Type ─────────────────────────────────────────────────────────
interface UseFirebaseAuthReturn extends AuthState {
  isAuthenticated: boolean;
  signInWithEmail: (email: string, password: string) => Promise<User | null>;
  signUpWithEmail: (email: string, password: string) => Promise<User | null>;
  signInWithGoogle: () => Promise<User | null>;
  logOut: () => Promise<void>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useFirebaseAuth(): UseFirebaseAuthReturn {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true, // true on mount while Firebase resolves the session
    error: null,
  });

  // Listen for auth state changes (login, logout, token refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user: User | null) =>
        setAuthState({ user, loading: false, error: null }),
      (error: Error) =>
        setAuthState({ user: null, loading: false, error: error.message })
    );
    return unsubscribe; // cleanup on unmount
  }, []);

  // ── Sign in with email/password ──────────────────────────────────────────
  const signInWithEmail = useCallback(
    async (email: string, password: string): Promise<User | null> => {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const { user }: UserCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setAuthState({ user, loading: false, error: null });
        return user;
      } catch (error) {
        const message = (error as Error).message;
        setAuthState((prev) => ({ ...prev, loading: false, error: message }));
        return null;
      }
    },
    []
  );

  // ── Sign up with email/password ──────────────────────────────────────────
  const signUpWithEmail = useCallback(
    async (email: string, password: string): Promise<User | null> => {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const { user }: UserCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setAuthState({ user, loading: false, error: null });
        return user;
      } catch (error) {
        const message = (error as Error).message;
        setAuthState((prev) => ({ ...prev, loading: false, error: message }));
        return null;
      }
    },
    []
  );

  // ── Sign in with Google popup ────────────────────────────────────────────
  const signInWithGoogle = useCallback(async (): Promise<User | null> => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const provider = new GoogleAuthProvider();
      const { user }: UserCredential = await signInWithPopup(auth, provider);
      setAuthState({ user, loading: false, error: null });
      return user;
    } catch (error) {
      const message = (error as Error).message;
      setAuthState((prev) => ({ ...prev, loading: false, error: message }));
      return null;
    }
  }, []);

  // ── Sign out ─────────────────────────────────────────────────────────────
  const logOut = useCallback(async (): Promise<void> => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await signOut(auth);
      setAuthState({ user: null, loading: false, error: null });
    } catch (error) {
      const message = (error as Error).message;
      setAuthState((prev) => ({ ...prev, loading: false, error: message }));
    }
  }, []);

  return {
    ...authState,
    isAuthenticated: !!authState.user,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    logOut,
  };
}