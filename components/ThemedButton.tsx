import { ReactNode, type ReactElement } from "react";
import { PressableProps, type ViewStyle, Pressable,Text, GestureResponderEvent } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedText } from "./ThemedText";

export function ThemedButton( props:{ text:string, style:ViewStyle, disabled:boolean, handler:(event:GestureResponderEvent)=>void}) {
    const theme = useThemeColors()
    return (
        <Pressable {...props} onPress={ props.handler }>
            <ThemedText>{props.text}</ThemedText>
        </Pressable>
    )
}