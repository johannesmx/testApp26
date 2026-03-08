import { GestureResponderEvent } from "react-native";
import { ValidationStates } from "./ValidationStates";

export interface ThemedButtonProps {
    text:string,
    disabled:boolean,
    handler:(event:GestureResponderEvent) => void,
    valid:boolean
}