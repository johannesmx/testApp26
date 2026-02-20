import {View,StyleSheet,Text,TextInput,Pressable} from 'react-native'
import {useState,useEffect} from 'react'

export default function SignupScreen() {
    const [email,setEmail] = useState <string>("")
    const [validEmail,setValidEmail] = useState<boolean|null>(null)
    useEffect( () => {
        if( email.indexOf('@') > 0 ) {
            setValidEmail(true)
        }
        else {
            setValidEmail(false)
        }
    }, [email])
    return (
        <View style={ styles.container }>
            <View style={ styles.form }>
            <Text style={ styles.heading }>Sign up for an account</Text>
            <Text>Email</Text>
            <TextInput 
                style={ 
                    (validEmail == null ) ? styles.input : 
                    (validEmail == true ) ? styles.validInput : styles.invalidInput } 
                value={email}
                onChangeText={ (value:string) => setEmail(value) }
            />
            <Text>Password</Text>
            <TextInput 
                style={ styles.input }
                secureTextEntry={true}
            />
            <Pressable style={ styles.button }>
                <Text style={ styles.buttonText }>Signup</Text>
            </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    form: {
        marginHorizontal:10,
        marginVertical: 50,
        backgroundColor: "#FFFFFF",
        padding: 15,
    },
    heading: {
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 20,
    },
    input: {
        padding: 5,
        borderColor: "#CCCCCC",
        borderWidth: 2,
        marginBottom: 15,
    },
    validInput: {
        padding: 5,
        borderColor: "#06911f",
        borderWidth: 2,
        marginBottom: 15,
        backgroundColor: "#baffc7",
    },
    invalidInput: {
        padding: 5,
        borderColor: "#f01313",
        borderWidth: 2,
        marginBottom: 15,
        backgroundColor: "#ffb8b8",
    },
    button: {
        backgroundColor: "#333333",
        marginVertical: 15,
        padding: 5,
    },
    buttonText: {
        color: "#CCCCCC",
        textAlign: "center",
    }

})