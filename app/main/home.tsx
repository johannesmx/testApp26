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

export default function HomeScreen() {
    const [authState,setAuthState] = useState<boolean>(true)
    const [sharedData, setSharedData] = useState<TestDoc[] | null>(null)
    const auth = useAuth()
    const firestore = useFirestore()

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

    useEffect(() => {
        firestore.get("shared").then( data => {
            setSharedData(data)
        }).catch( error => {
            console.error("Error fetching shared data", error)
        })
    },[])

    const ItemView = ({name}:TestDoc) => (
        <ThemedView style={styles.listItem}>
            <ThemedText>{name}</ThemedText>
        </ThemedView>
    )


    return (

        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1}}>
                <ThemedView style={{ flex: 1 }}>
                    <ThemedText>Home</ThemedText>
                    <FlatList 
                        data={sharedData} 
                        renderItem={({ item }) => <ItemView {...item} />}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={<ListEmpty/>}
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
    }
})