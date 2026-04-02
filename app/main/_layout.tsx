import { Drawer } from 'expo-router/drawer'
import { useThemeColors } from '@/hooks/useThemeColors'
import { FirestoreProvider } from '@/contexts/firestoreContext'

export default function MainLayout() {
    const theme = useThemeColors()

    return (
        <FirestoreProvider>
            <Drawer screenOptions={{
                drawerStyle: {backgroundColor: theme.background},
                drawerLabelStyle: {color: theme.text},
                headerStyle: {backgroundColor: theme.background},
                headerTintColor: theme.text
            }}>
                <Drawer.Screen name="home" options={{
                    drawerLabel: "Home",
                    title: "Home"
                }}/>
                <Drawer.Screen name="signout" options={{
                    drawerLabel: "Sign out",
                    title: "Sign out"
                }} />
            </Drawer>
        </FirestoreProvider>
    )
}