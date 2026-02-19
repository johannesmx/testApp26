import { useColorScheme } from "react-native";
import { useState, useEffect } from "react"
import { AppTheme } from "../constants/AppTheme"
import { AppThemeInterface } from "../constants/AppTheme";

export function useColorTheme () {
    const [theme, setTheme] = useState(AppTheme.light)
    // let theme = AppTheme.light
    const scheme = useColorScheme()
    if( scheme == "dark") {
        setTheme( AppTheme.dark )
    }
    // return theme
    
}