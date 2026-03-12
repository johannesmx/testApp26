import { Stack } from "expo-router";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function RootLayout() {
  const theme = useThemeColors()

  const StyleForHeader = {

  }
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Sign up",
          headerShown: true,
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text
        }} />
      <Stack.Screen name="login" options={{
        title: "Sign in",
        headerShown: true,
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text
      }} />
      <Stack.Screen name="home" options={{
        title: "Home",
        headerShown: false,
      }} />
    </Stack>
  )
}
