import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
    return (
        <ThemedView style={{flex:1}}>
            <ThemedText>Home</ThemedText>
        </ThemedView>
    )
}