import react from 'react';
import {Text, View, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext';

const HelpAndSupportScreen: React.FC = () => {
    const {theme} = useTheme();

    return (
        <Text style={{color: theme.textColor}}>HelpAndSupportScreen</Text>
    )
}
export default HelpAndSupportScreen
const styles = StyleSheet.create({

})