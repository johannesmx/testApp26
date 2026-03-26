import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useFirebaseAuth } from "@/contexts/useFirebaseAuth";
import { useEffect, useState } from "react";

export default function HomeScreen() {
    const [authState,setAuthState] = useState<boolean>(true)
    const auth = useFirebaseAuth()

    useEffect(() => {
        if (!auth.isAuthenticated) {
            console.log( auth.user)
            setAuthState(false)
        }
    }, [auth.isAuthenticated])

    // useEffect(() => {
    //     if(!authState) {
    //        // router.replace("/login")
    //     }
    // }, [authState])

    return (
        <ThemedView style={{ flex: 1 }}>
            <ThemedText>Home</ThemedText>
        </ThemedView>
    )
}