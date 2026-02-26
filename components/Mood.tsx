import { Text, Pressable, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";



export function Mood() {
    const[mood,setMood] = useState("happy")

    useEffect( () => {console.log("Mood is " + mood ) }, [mood] )
    return (
        <View>
            <Text>{ mood }</Text>
            <Pressable 
                onPress={ () => {
                setMood( (mood == "happy") ? "sad" : "happy" )
                }}
                style={ styles.button }
            >
                <Text style={ styles.text }>Toggle</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "black"
    },
    text: {
        color: "white"
    }
})