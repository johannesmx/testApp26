import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet } from "react-native";
import { useFirebaseAuth } from "@/contexts/firebaseAuthContext";
import { useEffect, useState } from "react";
import { router } from "expo-router";

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