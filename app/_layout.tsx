import { Stack } from "expo-router";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useContext } from "react";

export default function RootLayout() {
  const theme = useThemeColors()
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
