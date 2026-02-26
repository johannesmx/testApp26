import { Text, View, StyleSheet } from "react-native";
import { Button } from "@/components/Button";
import { Link } from "expo-router";
import { Mood } from "@/components/Mood";
import { useColorTheme } from "@/hooks/useColorTheme";

export default function HomeScreen() {
  const theme = useColorTheme()
  console.log( theme )
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      <Text style={[ styles.heading, {color: theme.text}]}>App screen 1</Text>
      <Text>Hello world</Text>
      <Button text="Click Me" background="green" />
      <Mood />
      <Link href="/signup">
        <Text>go to signup</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
   
  }
})
