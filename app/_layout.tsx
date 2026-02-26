import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack>
    <Stack.Screen name="index" options={{title: "Home", headerStyle: { backgroundColor: "#FF33FF"}}}/>
    <Stack.Screen name="test" options={{title: "Profile"}}/>
    <Stack.Screen name="signup" options={{title: "Sign up"}}/>
  </Stack>
  )
}
