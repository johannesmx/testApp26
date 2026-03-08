import { AppTheme } from "@/constants/AppTheme";
import { useColorScheme } from "react-native";

export function useThemeColors() {
    const scheme = useColorScheme()
    // default theme
    let theme = AppTheme.dark
    if( scheme == 'light' ) {
        theme = AppTheme.light
    }
    return theme
}