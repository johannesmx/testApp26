import { View, StyleSheet } from 'react-native'
import { useThemeColors } from '@/hooks/useThemeColors'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { ThemedInput } from '@/components/ThemedInput'
import { ThemedButton } from '@/components/ThemedButton'

export default function HomeScreen() {
    return(
        <ThemedView style={styles.container}>
            <ThemedText>
                Home
            </ThemedText>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})