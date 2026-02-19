import { Text, View, StyleSheet } from "react-native";
import { Button } from "@/components/Button";
import { Link } from "expo-router";
import { Mood } from "@/components/Mood";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.heading}>App screen 1</Text>
      <Text>Hello world</Text>
      <Button text="Click Me" background="green" />
      <Mood />
      <Link href="/test">
        <Text>go to another screen</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    color: "#CC3344"
  }
})
