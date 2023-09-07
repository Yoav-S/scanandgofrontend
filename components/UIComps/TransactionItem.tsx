import React from "react";
import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import {TransactionCompType} from '../../interfaces/interfaces'
import { useTheme } from "../../context/ThemeContext";
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';

const TransactionItem: React.FC<TransactionCompType> = ({transaction}) => {
    const navigation = useNavigation<StackNavigationProp<any, 'HomeScreen'>>();

    const { cardType } = transaction;
    const {theme} = useTheme();
    let imageSource;
    if (cardType === 'americanexpress') {
      imageSource = require('../../images/americanexpress.png');
    } else if (cardType === 'discover') {
      imageSource = require('../../images/discover.png');
    } else if (cardType === 'mastercard') {
      imageSource = require('../../images/mastercard.png');
    } else if (cardType === 'visa') {
      imageSource = require('../../images/visa.png');
    }
    return (
        <View style={[styles.container, {backgroundColor: theme.primaryColor}]}>
            <Image source={imageSource}/>
            <Text style={{color: theme.textColor}}>{transaction.formattedDate}</Text>
            <Text style={{color: theme.textColor}}>{transaction.totalAmount}</Text>
            <Icon 
            onPress={() => {navigation.navigate('TransactionScreen', {transaction: transaction})}}
            name="arrow-left" 
            color={'black'} 
            size={30}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '5%',
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center',
        padding: '3%',
        borderRadius: 8
    }
})
export default TransactionItem