import {View,StyleSheet,Text,TextInput,Pressable} from 'react-native'
import {useState,useEffect} from 'react'
import { Link } from 'expo-router'
import { ValidationStates } from '@/interfaces/ValidationStates'

export default function SignupScreen() {
    const [email,setEmail] = useState <string>("")
    const [validEmail,setValidEmail] = useState<ValidationStates>(ValidationStates.NONE)
    const [password,setPassword] = useState<string>("")
    const [validPassword,setValidPassword] = useState<ValidationStates>(ValidationStates.NONE)
    useEffect( () => {
        if( email.indexOf('@') > 0 ) {
            setValidEmail(ValidationStates.VALID)
        }
        else if(email.length > 0 ) {
            setValidEmail(ValidationStates.INVALID)
        }
    }, [email])

    useEffect( () => {
        if( password.length >= 8 ) {
            setValidPassword(ValidationStates.VALID)
        }
        else if(password.length > 0) {
            setValidPassword(ValidationStates.INVALID)
        }
    }, [password])

    return (
        <View style={ styles.container }>
            <View style={ styles.form }>
            <Text style={ styles.heading }>Sign up for an account</Text>
            <Text>Email</Text>
            <TextInput 
                style={ 
                    (validEmail === ValidationStates.NONE ) ? styles.input : 
                    (validEmail == ValidationStates.VALID ) ? styles.validInput : styles.invalidInput } 
                value={email}
                onChangeText={ (value:string) => setEmail(value) }
                placeholder="user@example.com"
            />
            <Text>Password</Text>
            <TextInput 
                style={ 
                    (validPassword === ValidationStates.NONE ) ? styles.input : 
                    (validPassword == ValidationStates.VALID ) ? styles.validInput : styles.invalidInput } 
                secureTextEntry={true}
                onChangeText={ (value:string) => setPassword(value) }
                placeholder="Minimum 8 characters"
            />
            <Pressable 
                style={ (validEmail == ValidationStates.VALID 
                    && validPassword == ValidationStates.VALID) ? styles.button : styles.buttonDisabled }
                disabled={ 
                (validEmail == ValidationStates.VALID 
                    && validPassword == ValidationStates.VALID) ? false : true
                }
            >
                <Text 
                    style={ (validEmail == ValidationStates.VALID 
                    && validPassword == ValidationStates.VALID) ? 
                    styles.buttonText : styles.buttonTextDisabled }>
                        Signup
                </Text>
            </Pressable>
            <Link href="/">
                Don't have an account? Go to Signup
            </Link>
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
    },
    buttonDisabled: {
        backgroundColor: "#CCCCCC",
        marginVertical: 15,
        padding: 5,
    },
    buttonTextDisabled: {
        color: "#333333",
        textAlign: "center",
    }

})