import react, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {CreditCardAbstractCompType} from '../../interfaces/interfaces'
import { useTheme } from '../../context/ThemeContext';
const CreditCardAbstractComp: React.FC<CreditCardAbstractCompType> = (props) => {
    const {theme} = useTheme();
    return (
        <SafeAreaView style={[styles.container, {backgroundColor : theme.backgroundColor}]}>

        </SafeAreaView>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '2%'
    }
});
export default CreditCardAbstractComp