import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedInput } from "@/components/ThemedInput";
import { StyleSheet, FlatList, View, Modal, Pressable, TextInput } from "react-native";
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
import { ThemedButton } from "@/components/ThemedButton";

export default function HomeScreen() {
    const [authState, setAuthState] = useState<boolean>(true)
    const [sharedData, setSharedData] = useState<TestDoc[] | null>(null)
    const [modalVisible,setModalVisible] = useState<boolean>( false )
    const [itemName,setItemName] = useState<string>("")

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

    useEffect(() => {
        console.log(itemName)
    },[itemName])

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

    const ItemInputHandler = async () => {
        // define path which contains user uid
        // console.log( auth.user?.uid)
        const path = `usedata/${auth.user?.uid}/items`
        console.log(path)
        const item = await firestore.add({name:itemName, description: "item description"}, path )
        console.log(item)
        setItemName("")
        setModalVisible(false)
    }

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
                    <Modal visible={modalVisible} animationType="slide" transparent={false}>
                        <ThemedView style={styles.modalview}>
                            <ThemedText>Add Item</ThemedText>
                            <ThemedText>Name</ThemedText>
                            <TextInput style={{color: theme.text}} value={itemName} onChangeText={(val)=>setItemName(val)}/>
                            <ThemedButton text="Save" disabled={false} valid={true} handler={ItemInputHandler}  />
                        </ThemedView>
                        <Pressable style={styles.closebutton} onPress={()=> setModalVisible(false)}>
                            <Ionicons name="close" size={32} color={theme.text} />
                        </Pressable>
                    </Modal>
                    <Pressable style={styles.openbutton} onPress={()=> setModalVisible(true)}>
                        <Ionicons name="add" size={32} color={theme.text} />
                    </Pressable>
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
    },
    openbutton: {
        position: "absolute",
        bottom: 30,
        right: 30,
    },
     closebutton: {
        position: "absolute",
        top: 30,
        right: 30,
    },
    modalview: {
        flex: 1,
        paddingVertical: 50,
        paddingHorizontal: 10
    },
})