import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, FlatList, View } from "react-native";
import { useAuth } from "@/contexts/firebaseAuthContext";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useFirestore } from "@/contexts/firestoreContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ListEmpty } from "@/components/ListEmpty";
import { ListSeparator } from "@/components/ListSeparator";
import { TestDoc } from "@/interfaces/TestDoc";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";

export default function HomeScreen() {
    const [authState, setAuthState] = useState<boolean>(true)
    const [sharedData, setSharedData] = useState<TestDoc[] | null>(null)
    const auth = useAuth()
    const firestore = useFirestore()
    const theme = useThemeColors()

    useEffect(() => {
        if (!auth.isAuthenticated) {
            setAuthState(false)
        }
    }, [auth.isAuthenticated])

    useEffect(() => {
        if (!authState) {
            router.replace("/login")
        }
    }, [authState])

    useEffect(() => {
        firestore.get("shared").then(data => {
            setSharedData(data)
        }).catch(error => {
            console.error("Error fetching shared data", error)
        })
    }, [])

    const ItemView = (props: TestDoc) => (
        <Link href={
            {
                pathname:"/main/[id]", 
                params:{id: props.id, name: props.name, description: props.description}
            }
        }>
            <ThemedView style={styles.listItem}>
                <ThemedText>{props.name}</ThemedText>
                <Ionicons name="chevron-forward-outline" size={24} color={theme.text} />
            </ThemedView>
        </Link>
    )


    return (

        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <ThemedView style={{ flex: 1 }}>
                    <ThemedText>Home</ThemedText>
                    <FlatList
                        data={sharedData}
                        renderItem={({ item }) => <ItemView id={item.id} name={item.name} description={item.description} />}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={<ListEmpty />}
                        ItemSeparatorComponent={ListSeparator}
                    />
                </ThemedView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    }
})