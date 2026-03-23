import { useState, useEffect, useCallback } from "react"
import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { firebaseConfig } from "@/config/FirebaseConfig"
import {
    getAuth, onAuthStateChanged, signInWithEmailAndPassword, Auth, User, UserCredential,
    createUserWithEmailAndPassword, signOut
} from 'firebase/auth'

const app: FirebaseApp = (getApps().length === 0) ? initializeApp(firebaseConfig) : getApps()[0]
const auth: Auth = getAuth(app)

interface AuthState {
    user: User | null
    loading: boolean
    error: string | null
}

export function useFirebaseAuth() {
    const [authState, setAuthState] = useState<AuthState>({ user: null, loading: true, error: null })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthState({ user, loading: false, error: null })
        }, (error) => {
            setAuthState({ user: null, loading: false, error: error.message })
        })
        return unsubscribe  // cleans up on unmount
    }, [])


    // signing in with email and password
    const signIn = useCallback(
        async (email: string, password: string): Promise<User | null> => {
            setAuthState((prev) => ({ ...prev, loading: true, error: null }))
            try {
                const { user }: UserCredential = await signInWithEmailAndPassword(
                    auth, email, password
                )
                setAuthState({ user, loading: false, error: null })
                return user
            }
            catch (error) {
                const message = (error as Error).message
                setAuthState((prev) => ({ ...prev, loading: false, error: message }))
                return null
            }
        },
        []
    )

    // signing up
    const signUp = useCallback(
        async (email: string, password: string): Promise<User | null> => {
            try {
                const { user }: UserCredential = await createUserWithEmailAndPassword(
                    auth, email, password
                )
                setAuthState({ user, loading: false, error: null })
                return user
            }
            catch (error) {
                const message = (error as Error).message
                setAuthState((prev) => ({ ...prev, loading: false, error: message }))
                return null
            }
        },
        []
    )

    const signOut = useCallback(async (): Promise<void> => {
        setAuthState((prev) => ({ ...prev, loading: true, error: null }))
        try {
            await signOut()
            setAuthState({ user: null, loading: false, error: null })
        }
        catch (error) {
            const message = (error as Error).message
            setAuthState((prev) => ({ ...prev, loading: false, error: message }))
        }
    },
        []
    )
    return {
        ...authState,
        isAuthenticated: !!authState.user,
        signIn,
        signUp,
        signOut,
    }
}