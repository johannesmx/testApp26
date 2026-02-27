import { TextProps, Text } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

export function ThemedText(props:TextProps) {
    const theme = useThemeColors()
    return (
        <Text {...props} style={[props.style,{color: theme.text }]}>
            { props.children }
        </Text>
    )
}