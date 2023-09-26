import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { CreditCardAbstractCompType } from '../../../interfaces/interfaces';
import { ThemeContext } from '../../../context/ThemeContext';
import { CheckBox } from 'react-native-elements';
import { Button, ListItem, Icon } from '@rneui/themed';

const CreditCardAbstractComp: React.FC<CreditCardAbstractCompType> = ({creditCard, onPress}) => {
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors   
  const { cardType, cardNumber } = creditCard;
  
  const lastFourDigits = cardNumber.substring(cardNumber.length - 4);
  const cardHiddenPrefix = '* * * * - * * * * - * * * * - ';

  



  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <Icon name={`cc-${cardType}`} color={text.primary} size={40} style={styles.cardType} type='font-awesome' />
      <View style={styles.contentCon}>
        <View style={styles.typeNumberCon}>
            <View style={{marginRight: '10%'}}>
            <Text style={{color: text.primary, fontWeight: '600'}}>{creditCard.cardType}</Text>
            <Text style={{color: text.secondary, fontWeight: '300'}}>{cardHiddenPrefix}{lastFourDigits}</Text>
            </View>
            <CheckBox onPress={() => onPress && onPress(creditCard._id)} checked={creditCard.isDefault} />
        </View>
      </View>  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: '3%',
    marginBottom: '3%'
  },
  cardType: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    marginRight: '5%'
},
  image: {
    marginRight: '5%',
    width: 70
  },
  contentCon: {

  },
  typeNumberCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default CreditCardAbstractComp;
