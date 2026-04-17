import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { StyleSheet } from "react-native";
import { useEffect } from "react";

export default function DetailScreen() {
    const {id,name,description} = useLocalSearchParams()
    const router = useRouter()
    const navigation = useNavigation()

    useEffect(()=>{
        navigation.setOptions({ title: name})
    },[])

    const goBack = () => {
        router.navigate("/main/home")
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <ThemedView style={{ flex: 1, ...styles.mainview }}>
                    <ThemedText style={styles.name}>{name}</ThemedText>
                    <ThemedText>{description}</ThemedText>
                    <ThemedButton text="Go back" disabled={false} valid={true} handler={goBack}/>
                </ThemedView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    mainview: {
        padding: 10,
    },
    name: {
        fontSize: 20,
        textTransform: "capitalize",
    }
})