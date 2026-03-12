import { TextInput, TextInputProps } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ValidationStates } from "@/interfaces/ValidationStates";

interface ThemedInputProps extends TextInputProps {
    valid: ValidationStates
}

export function ThemedInput( props:ThemedInputProps ) {
    const theme = useThemeColors()
    return(
        <TextInput 
        {...props} 
        style={[ props.style, { 
            backgroundColor: (props.valid === ValidationStates.NONE) ? theme.background 
            : (props.valid === ValidationStates.INVALID) ? theme.invalid : theme.valid, 
            borderColor: theme.border, 
            color: theme.text }
         ]}
        />
    )
}