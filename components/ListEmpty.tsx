import { ThemedText } from "./ThemedText"
import { ThemedView } from "./ThemedView"

export function ListEmpty() {
    return(
        <ThemedView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <ThemedText>Your List is Empty</ThemedText>
        </ThemedView>
    )
}