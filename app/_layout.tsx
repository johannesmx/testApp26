import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack>
    <Stack.Screen name="index" options={{title: "Sign up", headerShown: false}}/>
    <Stack.Screen name="test" options={{title: "Profile", headerShown: false}}/>
    <Stack.Screen name="signup" options={{title: "Home"}}/>
  </Stack>
  )
}
