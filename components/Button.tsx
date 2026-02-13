import { Pressable, Text, StyleSheet } from "react-native";
import { useState } from "react"

interface ButtonProps {
    text: string
    background: string
}

export function Button( props:ButtonProps) {
    const [count,setCount] = useState<number>(0)

    return (
        <Pressable 
            style={[styles.button, {backgroundColor: props.background}]}
            onPress={ () => {
                setCount( count + 1 )
                console.log( "clicked" )
            } }
        >
            <Text style={styles.buttontext}>{ props.text } {count}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#333333",
        padding: 10,
        margin: 5,
    },
    buttontext: {
        color: "#FFFFFF"
    }
})