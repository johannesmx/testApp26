import { TextInput, TextInputProps } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

export function ThemedInput( props:TextInputProps ) {
    const theme = useThemeColors()
    return(
        <TextInput 
        {...props} 
        style={[ props.style, { 
            backgroundColor: theme.background, 
            borderColor: theme.border, 
            color: theme.text,
            placeholderTextColor: theme.placeholder }
         ]}
        />
    )
}