import React, {useContext} from "react";
import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import {TransactionCompType} from '../../interfaces/interfaces'
import { ThemeContext } from "../../context/ThemeContext";
import Icon from "react-native-fontawesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useDataContext } from "../../context/DataContext";
import Toast from "react-native-toast-message";
const TransactionItem: React.FC<TransactionCompType> = ({transaction, handleshowToast}) => {
    const navigation = useNavigation<StackNavigationProp<any, 'HomeScreen'>>();
    const {currentUser, getFullTransaction, showToast} = useDataContext();
    const { cardType } = transaction;
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors     
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

    const handlePressTransaction = async (id: string) => {
      const [isExists, transaction] = await getFullTransaction(id);
      if(isExists){
          navigation.navigate('TransactionView',{transaction: transaction});
      }
      else{
        handleshowToast
      }
  }


    return (
        <View style={[styles.container, {backgroundColor: background}]}>
            <Image source={imageSource}/>
            <Text style={{color: text.primary}}>{transaction.formattedDate}</Text>
            <Text style={{color: text.primary}}>{transaction.totalAmount}</Text>
            <FontAwesomeIcon 
            name="arrow-right" 
            size={30} color={text.secondary}             
            onPress={() => {handlePressTransaction(transaction._id)}}
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