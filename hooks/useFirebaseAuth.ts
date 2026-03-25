// get Firebase app instance

import { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential,
  AuthError,
} from "firebase/auth";
import { FirebaseApp, initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "@/config/FirebaseConfig";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface UseAuthReturn extends AuthState {
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string, displayName?: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): UseAuthReturn {
    const app: FirebaseApp = (getApps().length === 0) ? initializeApp(firebaseConfig) : getApps()[0]
  const auth = getAuth(app);

  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true, // true on mount — waiting for Firebase to restore session
    error: null,
  });

  // Listen for auth state changes (login, logout, token refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => setState({ user, loading: false, error: null }),
      (error) => setState({ user: null, loading: false, error: error.message })
    );

    return unsubscribe; // clean up listener on unmount
  }, [auth]);

  // ── Helpers ────────────────────────────────────────────────────────────────

  const handleError = (err: unknown): never => {
    const message = (err as AuthError).message ?? "An unknown error occurred.";
    setState((prev) => ({ ...prev, error: message }));
    throw err;
  };

  const clearError = () =>
    setState((prev) => ({ ...prev, error: null }));

  // ── Actions ────────────────────────────────────────────────────────────────

  const signIn = async (email: string, password: string): Promise<UserCredential> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      return credential;
    } catch (err) {
      return handleError(err);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    displayName?: string
  ): Promise<UserCredential> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(credential.user, { displayName });
      }
      return credential;
    } catch (err) {
      return handleError(err);
    }
  };

  const signInWithGoogle = async (): Promise<UserCredential> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      return credential;
    } catch (err) {
      return handleError(err);
    }
  };

  const logOut = async (): Promise<void> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await signOut(auth);
    } catch (err) {
      handleError(err);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    setState((prev) => ({ ...prev, error: null }));
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      handleError(err);
    }
  };

  return {
    ...state,
    signIn,
    signUp,
    signInWithGoogle,
    logOut,
    resetPassword,
    clearError,
  };
}
