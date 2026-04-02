import { ThemedButton } from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { ThemedInput } from '@/components/ThemedInput'
import { useAuth } from '@/contexts/firebaseAuthContext'


export default function SignupScreen() {
    const [email, setEmail] = useState<string>("")
    const [validEmail, setValidEmail] = useState<ValidationStates>(ValidationStates.NONE)
    const [password, setPassword] = useState<string>("")
    const [validPassword, setValidPassword] = useState<ValidationStates>(ValidationStates.NONE)

    const theme = useThemeColors()
    const auth = useAuth()

    //effect to check if user is authenticated
    useEffect( () => {
        if( auth.isAuthenticated ) {
            router.navigate("/main/home")
        }
    }, [auth.isAuthenticated])

    useEffect(() => {
        if (email.indexOf('@') > 0) {
            setValidEmail(ValidationStates.VALID)
        }
        else if (email.length > 0) {
            setValidEmail(ValidationStates.INVALID)
        }
    }, [email])

    useEffect(() => {
        if (password.length >= 8) {
            setValidPassword(ValidationStates.VALID)
        }
        else if (password.length > 0) {
            setValidPassword(ValidationStates.INVALID)
        }
    }, [password])

    

    return (
        <ThemedView style={styles.container}>
            <View style={[styles.form, { backgroundColor: theme.background }]}>
                <ThemedText style={styles.heading}>
                    Sign up for an account
                </ThemedText>
                <ThemedText>Email</ThemedText>
                <ThemedInput
                    style={
                        (validEmail === ValidationStates.NONE) ? styles.input :
                            (validEmail == ValidationStates.VALID) ? styles.validInput : styles.invalidInput}
                    value={email}
                    onChangeText={(value: string) => setEmail(value)}
                    placeholder="user@example.com"
                    valid={validEmail}
                />
                <ThemedText>Password</ThemedText>
                <ThemedInput 
                    style={
                        (validPassword === ValidationStates.NONE) ? styles.input :
                            (validPassword == ValidationStates.VALID) ? styles.validInput : styles.invalidInput}
                    secureTextEntry={true}
                    onChangeText={(value: string) => setPassword(value)}
                    placeholder="Minimum 8 characters"
                    valid={validPassword}
                />
                <ThemedButton 
                    text="Sign up" 
                    valid={ 
                        (validEmail === ValidationStates.VALID 
                            && validPassword === ValidationStates.VALID) ? true : false } 
                    handler={ () => {auth.signUp(email,password) } } 
                    disabled={ (validEmail === ValidationStates.VALID 
                        && validPassword === ValidationStates.VALID) ? false : true }
                />
                <Link href="/login">
                    <ThemedText>Have an account? Go to Login</ThemedText>
                </Link>

            </View>
        </ThemedView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    form: {
        marginHorizontal: 10,
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
        // borderColor: "#CCCCCC",
        borderWidth: 2,
        marginBottom: 15,
        borderRadius: 4
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
        marginVertical: 15,
        padding: 5,
    },
    buttonText: {
        textAlign: "center",
    },
    buttonEnabled: {
    },
    buttonTextEnabled: {},
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