import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, Modal, Pressable } from "react-native";
import { useAuth } from "@/contexts/firebaseAuthContext";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { ThemedButton } from "@/components/ThemedButton";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useFirestore } from "@/contexts/firestoreContext";
import { useNumbers } from "@/hooks/useNumbers";



export default function HomeScreen() {
    const [authState,setAuthState] = useState<boolean>(true)
    const [gameVisible, setGameVisible] = useState<boolean>(false)
    const theme = useThemeColors()
    const auth = useAuth()
    const { data, add, get, update, remove } = useFirestore()
    const numbers = useNumbers(2)

    useEffect(() => {
        if (!auth.isAuthenticated) {
            setAuthState(false)
        }
    }, [auth.isAuthenticated])

    useEffect(() => {
        if(!authState) {
           router.replace("/login")
        }
    }, [authState])

    const test = numbers.createNumberSet()

    return (
        <ThemedView style={[styles.container,{ flex: 1 }]}>
            <ThemedText>Welcome</ThemedText>
            <Pressable 
                style={ [styles.startbutton, {backgroundColor: theme.valid }]}
                onPress={ ()=> { setGameVisible(true) }}
            >
                <ThemedText style={ styles.startbuttonText }>Start a new game</ThemedText>
            </Pressable>
            <Modal
                visible={gameVisible}
                transparent={false}
                animationType="slide"
            >
                <ThemedView style={{flex: 1, padding: 15}}>
                    <ThemedText>{test.factor}</ThemedText>
                    <ThemedText>{test.multiplicand}</ThemedText>
                    <Pressable onPress={()=> {setGameVisible(false)}}>
                        <ThemedText>Close Modal</ThemedText>
                    </Pressable>
                </ThemedView>
            </Modal>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    startbutton: {
        padding: 5,
        marginVertical: 10,
    },
    startbuttonText: {
        textAlign: "center"
    },
})