import { Drawer } from 'expo-router/drawer'
import { useThemeColors } from '@/hooks/useThemeColors'
export default function AppLayout() {
    const theme = useThemeColors()
    return (
        <Drawer>
            <Drawer.Screen name="home" options={{
                drawerLabel: "Home",
                title: "List",
                drawerStyle: {backgroundColor: theme.background },
                headerStyle: {backgroundColor: theme.background }
            }}/>
        </Drawer>
    )
}