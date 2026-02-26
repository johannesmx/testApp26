import {View,StyleSheet,Text,TextInput,Pressable} from 'react-native'
import {useState,useEffect} from 'react'
import { ValidationState } from '@/constants/ValidationState'
import { ValidIndicator } from '@/components/ValidIndicator'


export default function SignupScreen() {
    const [email,setEmail] = useState <string>("")
    const [validEmail,setValidEmail] = useState<ValidationState>(ValidationState.NONE)
    const [password,setPassword] = useState<string>("")
    const [validPassword,setValidPassword] = useState<ValidationState>(ValidationState.NONE)

    useEffect( () => {
        if( email.length > 0 
            && email.indexOf('@') > 0 
            && (email.split('.').length - 1) > 0
            && email.indexOf(' ') === -1
        ) 
        {
            setValidEmail(ValidationState.VALID)
        }
        // else if( email.length == 0 ) {
        //     setValidEmail(ValidationState.NONE)
        // }
        else if( email.length > 0 
            && email.indexOf('@') < 0 
            && email.indexOf(' ') != 0
        ) {
            setValidEmail(ValidationState.INVALID)
        }
        console.log( email.indexOf(' ') )
    }, [email])

    useEffect( () => { 
        if( password.length > 0 && password.length >= 8 ) {
            setValidPassword(ValidationState.VALID)
        }
        else if( password.length > 0 ){
            setValidPassword(ValidationState.INVALID)
        }
    }, [password])

    return (
        <View style={ styles.container }>
            <View style={ styles.form }>
            <Text style={ styles.heading }>Sign up for an account</Text>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.label}>Email</Text>
                <ValidIndicator state={validEmail} />
            </View>
            <TextInput 
                style={ 
                    (validEmail === -1 ) ? styles.input : 
                    (validEmail == 1 ) ? styles.validInput : styles.invalidInput } 
                value={email}
                onChangeText={ (value:string) => {
                    setEmail(value)
                } }
                placeholder='you@example.com'
            />
             <View style={{flexDirection: "row"}}>
                <Text style={styles.label}>Password</Text>
                <ValidIndicator state={validPassword} />
            </View>
            <TextInput 
                style={ (validPassword === -1 ) ? styles.input : (validPassword === 1 ) ? styles.validInput : styles.invalidInput }
                secureTextEntry={true}
                onChangeText={ (value:string) => setPassword(value) }
                placeholder='minimum 8 characters'
            />
            <Pressable style={ ( validEmail === 1 && validPassword === 1 ) ? styles.button : styles.buttonDisabled }>
                <Text style={ ( validEmail === 1 && validPassword === 1 ) ? styles.buttonText : styles.buttonTextDisabled  }>Signup</Text>
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
    label: {
        flex: 1,
        marginVertical: 5,
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
        color: "#6c6c6c",
        textAlign: "center",
    }
})