import { Stack } from "expo-router";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useContext } from "react";
import { FireBaseAuthContext } from "@/contexts/FireBaseAuthContext";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

export default function RootLayout() {
  const theme = useThemeColors()
  const auth = useFirebaseAuth()
  const AuthContext = useContext(FireBaseAuthContext)
  return (
    
  <Stack>
    <Stack.Screen 
      name="index" 
      options={{
        title: "Sign up", 
        headerShown: true, 
        headerStyle: {backgroundColor: theme.background},
        headerTintColor: theme.text 
      }}
    />
    <Stack.Screen 
      name="login" 
      options={{
        title: "Sign in", 
        headerShown: true, 
        headerStyle: {backgroundColor: theme.background},
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
 
  )
}
