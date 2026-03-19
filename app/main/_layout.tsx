import { Drawer } from 'expo-router/drawer'
import { useThemeColors } from '@/hooks/useThemeColors'

export default function MainLayout() {
    const theme = useThemeColors()

    return (
        <Drawer>
            <Drawer.Screen name="index" options={{
                drawerLabel: "Home",
                title: "Home",
                // drawerStyle: {backgroundColor: theme.background}
            }}/>
        </Drawer>
    )
}