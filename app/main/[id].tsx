import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from 'expo-router';

export default function DetailScreen() {
    const {id,name,description} = useLocalSearchParams()
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <ThemedView style={{ flex: 1 }}>
                    <ThemedText>{id}</ThemedText>
                    <ThemedText>{name}</ThemedText>
                    <ThemedText>{description}</ThemedText>
                </ThemedView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}