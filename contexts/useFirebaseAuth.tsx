import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react"
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

interface FirebaseAuthContextValue extends AuthState {
    isAuthenticated: boolean
    signIn: (email:string, password:string) => Promise<User | null>
    signUp: (email:string, password:string) => Promise<User | null>
    signOff: () => Promise<void>
}

const FirebaseAuthContext = createContext<FirebaseAuthContextValue | null>( null )

export function FirebaseAuthProvider({children}: {children:ReactNode}) {
    const auth = useFirebaseAuth()
    return (
        <FirebaseAuthContext.Provider value={auth}>
            { children }
        </FirebaseAuthContext.Provider>
    )
}

export function useAuth():FirebaseAuthContextValue {
    const context = useContext( FirebaseAuthContext )
    if( !context ) {
        throw new Error("must be used withn a FirebaseAuthProvider")
    }
    return context
}

function useFirebaseAuth() {
    const [authState, setAuthState] = useState<AuthState>({ user: null, loading: true, error: null }) 

    // effect for updating authentication state of the user
    useEffect( () => {
        const unsubscribe = onAuthStateChanged( auth, (user) => {
            setAuthState({ user, loading: false, error: null })
        }, (error) => {
            setAuthState({ user: null, loading: false, error: error.message })
        })
        return unsubscribe
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

    const signOff = useCallback(async (): Promise<void> => {
        setAuthState((prev) => ({ ...prev, loading: true, error: null}))
        try {
            await signOut(auth)
            setAuthState({ user:null, loading: false, error: null})
          
        }
        catch (error) {
            const message = (error as Error).message
            setAuthState((prev) => ({ ...prev, loading: false, error: message }))
        }
        console.log("authstate " + authState)
    },
        []
    )
    return {
        ...authState,
        isAuthenticated: !!authState.user,
        signIn,
        signUp,
        signOff,
    }
}