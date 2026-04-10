import { View } from "react-native"
import { useThemeColors } from "@/hooks/useThemeColors"

export function ListSeparator () {
    const theme = useThemeColors()
    return (
        <View style={{backgroundColor: theme.border, padding: 1}}></View>
    )
}