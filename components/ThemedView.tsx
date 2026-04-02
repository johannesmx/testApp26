import { View, ViewProps } from 'react-native'
import { useThemeColors } from '@/hooks/useThemeColors'

export function ThemedView( props:ViewProps) {
    const theme = useThemeColors()
    return(
        <View style={[ props.style, { backgroundColor: theme.background }]}>
            { props.children }
        </View>
    )
}