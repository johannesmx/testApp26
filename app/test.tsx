import { View, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

export default function AnotherScreen() {
    return (
        <View style={styles.container}>
            <Text>Another Screen</Text>
            <Link href="/">
                <Text>Go to Home Screen</Text>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})