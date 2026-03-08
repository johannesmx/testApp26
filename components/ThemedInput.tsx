import { useThemeColors } from "@/hooks/useThemeColors";
import { TextInput, TextInputProps } from "react-native";
import { ValidationStates } from "@/interfaces/ValidationStates";

interface ThemedInputProps extends TextInputProps {
    valid: ValidationStates
}

export function ThemedInput(props: ThemedInputProps) {
    const theme = useThemeColors()
    // component styles for the TextInput
    console.log(props.valid)
    const TextInputStyles = {
        backgroundColor: (props.valid === ValidationStates.NONE ) ? theme.background : (props.valid === ValidationStates.INVALID) ? theme.invalid : theme.valid ,
        borderColor: theme.border,
        color: theme.text,
        placeholderTextColor: theme.placeholder,
        selectionColor: "#FFFFFF"
    }
   
    return (
        <TextInput
            {...props}
            style={[props.style, TextInputStyles]}
        />
    )
}