import { Drawer } from 'expo-router/drawer'
import { useThemeColors } from '@/hooks/useThemeColors'

export default function MainLayout() {
    const theme = useThemeColors()

    return (
        <Drawer screenOptions={{
            drawerStyle: {backgroundColor: theme.background }, 
            drawerLabelStyle: {color: theme.text },
            headerStyle: {backgroundColor: theme.background},
            headerTintColor: theme.text
        }}>
            <Drawer.Screen name="home" options={{
                drawerLabel: "Home",
                title: "Home",
                // drawerStyle: {backgroundColor: theme.background},
                // headerStyle: {backgroundColor: theme.background},
                headerTintColor: theme.text 
            }}/>
             <Drawer.Screen name="signout" options={{
                drawerLabel: "Sign out",
                title: "Sign out",
                // drawerStyle: {backgroundColor: theme.background},
                
            }}/>
        </Drawer>
    )
}