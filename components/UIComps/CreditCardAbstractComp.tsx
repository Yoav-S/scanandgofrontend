import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { CreditCardAbstractCompType } from '../../interfaces/interfaces';
import { ThemeContext } from '../../context/ThemeContext';
import { CheckBox } from 'react-native-elements';

const CreditCardAbstractComp: React.FC<CreditCardAbstractCompType> = ({creditCard, onPress}) => {
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors   
  const { cardType, cardNumber } = creditCard;
  
  
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
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <Image source={imageSource} style={styles.image}/>
      <View style={styles.contentCon}>
        <View style={styles.typeNumberCon}>
            <View style={{marginRight: '25%'}}>
            <Text style={{color: text.primary, fontWeight: '600'}}>{creditCard.cardType}</Text>
            <Text style={{color: text.primary, fontWeight: '300'}}>{creditCard.cardNumber}</Text>
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
    padding: '2%',
    flexDirection: 'row',
    width: '100%',
    marginTop: '3%',
    marginBottom: '3%'
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
