import { useThemeColors } from "@/hooks/useThemeColors";
import { GestureResponderEvent, Pressable, type ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";

export function ThemedButton( props:{ text:string, style:ViewStyle, disabled:boolean, handler:(event:GestureResponderEvent)=>void}) {
    const theme = useThemeColors()
    return (
        <Pressable {...props} onPress={ props.handler } style={[props.style,{borderColor:theme.border}]}>
            <ThemedText>{props.text}</ThemedText>
        </Pressable>
    )
}
