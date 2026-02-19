
const Colors = {
    primary: "hsla(213, 86%, 60%, 1)",
    primaryLight: "hsla(213, 86%, 80%, 1)",
    primaryDark: "hsla(213, 86%, 40%, 1)",
    secondary: "hsla(274, 18%, 60%,1)",
    secondaryLight: "hsla(274, 18%, 92%,1)",
    secondaryDark: "hsla(274, 18%, 40%,1)",
    tertiary: "hsla(149, 21%, 60%,1)",
    tertiaryLight: "hsla(149, 21%, 87%,1)",
    tertiaryDark: "hsla(149, 21%, 40%,1",
    greyLight: "hsla(204, 30%, 87%,1)",
    grey: "hsla(204, 30%, 60%,1)",
    greyDark: "hsla(204, 30%, 25%,1)"
}

export interface AppThemeInterface {
   background: string
   text: string

}
export const AppTheme = {
    dark: {
        background: Colors.greyDark,
        text: Colors.tertiaryLight,

    }, 
    light: {
        background: Colors.greyLight,
        text: Colors.tertiaryDark,
    
    }
}

