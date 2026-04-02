import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { StyleSheet } from "react-native";
import { useAuth } from "@/contexts/firebaseAuthContext";
import { router, Link } from "expo-router";
import { useEffect } from "react";
import Ionicons from '@expo/vector-icons/Ionicons'


export default function HomeScreen() {
    const auth = useAuth()

    useEffect( () => {
        if( !auth.isAuthenticated ) {
            console.log( auth.isAuthenticated)
            router.replace("/login")
        }
    }, [auth.isAuthenticated])

    return (
        <ThemedView style={[ styles.container, { flex: 1}]}>
            <ThemedText style={ styles.heading }>Sign out of your account</ThemedText>
            <ThemedText>You will be redirected to the login screen</ThemedText>
            <ThemedButton
                text="Press to sign out"
                valid={true}
                handler={() => { auth.signOff() }}
                disabled={ false }
            />
            <ThemedText style={styles.metatext}>Got here accidentally?</ThemedText>
            <Link href="/">
                <ThemedText style={styles.link}><Ionicons name="home" size={16} /> Go back to Home screen</ThemedText>
            </Link>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
       paddingHorizontal: 15,
       paddingVertical: 10,
    },
    heading: {
        fontSize: 18,
    },
    metatext: {
        marginVertical: 10,
    },
    link: {
        fontWeight: 700,
    },
})