import { useThemeColors } from "@/hooks/useThemeColors";
import { TextInput, TextInputProps } from "react-native";

export function ThemedInput ( props:TextInputProps) {
    const theme = useThemeColors()

    return (
        <TextInput {...props} 
        style={[ props.style, 
            {backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
        />
    )
}