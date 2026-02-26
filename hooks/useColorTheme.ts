import { useColorScheme } from "react-native";
import { useState, useEffect } from "react"
import { AppTheme } from "../constants/AppTheme"
import { AppThemeInterface } from "../constants/AppTheme";

export function useColorTheme () {
    let theme = AppTheme.light
    // let theme = AppTheme.light
    const scheme = useColorScheme()
    if( scheme == "dark") {
        theme = AppTheme.dark
    }
    return theme
    
}