import {useState, useEffect, useCallback } from 'react'
import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { firebaseConfig } from '@/config/FirebaseConfig'
import { 
    getFirestore, 
    Firestore,
    addDoc,
    updateDoc,
    setDoc
} from 'firebase/firestore'

interface DocumentToStore {
    id:string
    number:number
    multiplier:number
    start:number
    finish:number
}
// initialise firebase app if it hasn't been initialised already
const app: FirebaseApp = (getApps().length === 0) ? initializeApp(firebaseConfig) : getApps()[0]
// initialise an instance of the firestore database connection
const db:Firestore = getFirestore(app)

export function useFireStore() {
    const[data,setData] = useState<DocumentToStore[] | null>( [] )

    const add = ( document:DocumentToStore, path:string ) => {
        // add a document to Firestore
        
    }

    const update = ( id:string, path:string, data:DocumentToStore )  => {
        // update an existing document

    }

    const remove = ( id:string, path:string )  => {
        // delete a document
    }

    const get = ( path:string )  => {
        // get documents from a collection
        // update the data state when complete
    }

    return {
        data,
        add,
        update,
        remove,
        get
    }
}