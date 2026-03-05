import { View, type ViewStyle, TextInputChangeEvent } from "react-native";
import { ThemedInput } from "./ThemedInput";
import { ThemedText } from "./ThemedText";
import { TextInputType } from '@/interfaces/FormTextInputTypes'


interface FormTextInputProps {
    text:string,
    type:TextInputType
    secure: boolean
}

export function FormTextInput( props:FormTextInputProps) {
    return(
        <View>
            <ThemedText>{ props.text }</ThemedText>
            <ThemedInput secureTextEntry={props.secure}/>
        </View>
    )
}