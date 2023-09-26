import React, {useContext} from "react";
import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import {TransactionCompType} from '../../../interfaces/interfaces'
import { ThemeContext } from "../../../context/ThemeContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Button, ListItem, Icon } from '@rneui/themed';
import { useDataContext } from "../../../context/DataContext";
import Toast from "react-native-toast-message";
const TransactionItem: React.FC<TransactionCompType> = ({transaction, handleshowToast}) => {
    const navigation = useNavigation<StackNavigationProp<any, 'HomeScreen'>>();
    const {currentUser, getFullTransaction, showToast} = useDataContext();
    const { cardType } = transaction;
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors     

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
            <Icon name={`cc-${transaction.cardType}`} style={styles.cardType} size={30} color={text.primary} type='font-awesome' />
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
    },
    cardType: {}
})
export default TransactionItem