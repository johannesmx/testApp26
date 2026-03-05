
import { PressableProps, type ViewStyle, Pressable,Text, GestureResponderEvent, StyleSheet } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedText } from "./ThemedText";
import { ValidationStates } from "@/interfaces/ValidationStates";

interface ThemedButtonProps {

}

export function ThemedButton( props:{ 
    text:string, 
    disabled:boolean, 
    handler:(event:GestureResponderEvent)=>void,
    valid: ValidationStates}
     ) {
    const theme = useThemeColors()
    console.log( theme.border )
    return (
        <Pressable 
            {...props} 
            onPress={ props.handler } 
            style={ [styles.button, { 
                borderWidth: 2,
                borderStyle: "solid", 
                borderColor: theme.border,
                backgroundColor: theme.buttonbg,
                opacity: (props.valid) ? 1 : 0.5 }] }
            disabled={ props.disabled }
        >
            <ThemedText style={styles.text}>{props.text}</ThemedText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 15,
        padding: 5,
        borderRadius: 4,
    },
    text: {
        textAlign: "center",
    }
})