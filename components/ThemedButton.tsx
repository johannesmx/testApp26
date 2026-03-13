import { Pressable, PressableProps, Text, StyleSheet } from "react-native";
import { ThemedButtonProps } from "@/interfaces/ThemedButtonProps";
import { ThemedText } from "./ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

export function ThemedButton( props:ThemedButtonProps) {
    const theme = useThemeColors()
    
    return(
        <Pressable 
            {...props}
            disabled={ props.disabled } 
            onPress={ props.handler }
            style={ [styles.button, {
                borderColor: theme.border,
                backgroundColor: theme.buttonbg,
                opacity: ( props.valid ) ? 1 : 0.5
            }

            ]}
        >
            <ThemedText style={ styles.text }>{ props.text }</ThemedText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 15,
        padding: 5,
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: "solid",
    },
    text: {
        textAlign: "center"
    }
})