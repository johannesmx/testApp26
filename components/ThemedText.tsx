import { TextProps, Text } from "react-native" 
import { useColorTheme } from "@/hooks/useColorTheme"

export function ThemedText( props:TextProps ) {
    const theme = useColorTheme()
    return <Text {...props} style={{color:theme.text}}>{ props.children }</Text>
}