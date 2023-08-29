import react from 'react';
import {Text, View, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext';

const PaymentMethodsScreen: React.FC = () => {
    const {theme} = useTheme();

    return (
        <Text style={{color: theme.textColor}}>PaymentMethodsScreen</Text>
    )
}
export default PaymentMethodsScreen
const styles = StyleSheet.create({

})