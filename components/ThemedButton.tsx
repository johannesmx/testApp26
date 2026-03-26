import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedButtonProps } from "@/interfaces/ThemedButtonProps";
import { Pressable, StyleSheet,  } from "react-native";
import { useState, useEffect} from 'react'
import { ThemedText } from "./ThemedText";

export function ThemedButton( props:ThemedButtonProps) {
    const theme = useThemeColors()

    useEffect( () => {
        console.log("valid "+ props.valid)
    }, [props.valid])

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