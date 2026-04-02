import { useState, useCallback, createContext, useContext, ReactNode } from 'react'
import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { firebaseConfig } from '@/config/FirebaseConfig'
import {
    getFirestore,
    Firestore,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    doc,
    collection,
} from 'firebase/firestore'

import { type AppDoc } from '@/interfaces/AppDocType'



interface FirestoreContextType {
    data: AppDoc[] | null
    add: (document: AppDoc, path: string) => Promise<string>
    update: (id: string, path: string, data: AppDoc) => Promise<void>
    remove: (id: string, path: string) => Promise<void>
    get: (path: string) => Promise<AppDoc[]>
}

const app: FirebaseApp = (getApps().length === 0) ? initializeApp(firebaseConfig) : getApps()[0]
const db: Firestore = getFirestore(app)

const FirestoreContext = createContext<FirestoreContextType | null>(null)

export function FirestoreProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<AppDoc[] | null>(null)

    const add = useCallback(async (document: AppDoc, path: string): Promise<string> => {
        try {
            const colRef = collection(db, path)
            const docRef = await addDoc(colRef, document)
            return docRef.id
        } catch (error) {
            console.error('Error adding document:', error)
            throw error
        }
    }, [])

    const update = useCallback(async (id: string, path: string, data: AppDoc): Promise<void> => {
        try {
            const docRef = doc(db, path, id)
            await updateDoc(docRef, { ...data })
        } catch (error) {
            console.error('Error updating document:', error)
            throw error
        }
    }, [])

    const remove = useCallback(async (id: string, path: string): Promise<void> => {
        try {
            const docRef = doc(db, path, id)
            await deleteDoc(docRef)
        } catch (error) {
            console.error('Error deleting document:', error)
            throw error
        }
    }, [])

    const get = useCallback(async (path: string): Promise<AppDoc[]> => {
        try {
            const colRef = collection(db, path)
            const snapshot = await getDocs(colRef)
            const documents = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as AppDoc[]
            setData(documents)
            return documents
        } catch (error) {
            console.error('Error getting documents:', error)
            throw error
        }
    }, [])

    return (
        <FirestoreContext.Provider value={{ data, add, update, remove, get }}>
            {children}
        </FirestoreContext.Provider>
    )
}

export function useFirestore(): FirestoreContextType {
    const context = useContext(FirestoreContext)
    if (!context) {
        throw new Error('useFirestore must be used within a FirestoreProvider')
    }
    return context
}