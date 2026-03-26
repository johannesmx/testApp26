import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { StyleSheet } from "react-native";
import { useAuth } from "@/contexts/firebaseAuthContext";
import { router } from "expo-router";
import { useEffect } from "react";


export default function HomeScreen() {
    const auth = useAuth()

    useEffect( () => {
        if( !auth.isAuthenticated ) {
            console.log( auth.isAuthenticated)
            router.replace("/login")
        }
    }, [auth.isAuthenticated])

    return (
        <ThemedView style={{ flex: 1 }}>
            <ThemedText>Sign out</ThemedText>
            <ThemedButton
                text="Sign out"
                valid={true}
                handler={() => { auth.signOff() }}
                disabled={ false }
            />
        </ThemedView>
    )
}