import { View, Image, StyleSheet } from 'react-native'
import { ValidationState } from '@/constants/ValidationState'

export function ValidIndicator(props: { state: ValidationState }) {
    if (props.state == -1) {
        return null
    }
    else if (props.state == 0) {
        return (
            <View style={ [ styles.badge,styles.invalid] }>
                <Image style={ styles.image } source={require('@/assets/images/times-solid.png')} />
            </View>
        )
    }
    else {
        return (
            <View style={ [ styles.badge, styles.valid ]}>
                <Image style={ styles.image } source={require('@/assets/images/check-solid.png')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    badge: {
        padding: 5,
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 1,
        width: 24,
        height: 24,
        marginVertical: 2,
        borderRadius: 10,
    },
    badgeText: {
       color: "black"
    },
    valid: {
        backgroundColor: "green"
    },
    invalid: {
        backgroundColor: "red"
    },
    image: {
        width: 12,
        height: 12,
    }
})