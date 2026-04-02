import { Stack } from "expo-router";
import { useThemeColors } from "@/hooks/useThemeColors";
import { FirebaseAuthProvider } from "@/contexts/firebaseAuthContext";

export default function RootLayout() {
  const theme = useThemeColors()

  return (
    <FirebaseAuthProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Sign up",
            headerShown: true,
            headerStyle: { backgroundColor: theme.background },
            headerTintColor: theme.text
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: "Sign in",
            headerShown: true,
            headerStyle: { backgroundColor: theme.background },
            headerTintColor: theme.text
          }}
        />
        <Stack.Screen
          name="main"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </FirebaseAuthProvider>
  )
}
