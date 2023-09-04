import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { CreditCardAbstractCompType } from '../../interfaces/interfaces';
import { useTheme } from '../../context/ThemeContext';
import { CheckBox } from 'react-native-elements';

const CreditCardAbstractComp: React.FC<CreditCardAbstractCompType> = ({creditCard, onPress}) => {
  const { theme } = useTheme();
  const { cardType } = creditCard;
  const [isChecked, setisChecked] = useState<boolean>(creditCard.isDefault);
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Image source={imageSource} style={styles.image}/>
      <View style={styles.contentCon}>
        <View style={styles.typeNumberCon}>
            <View style={{marginRight: '25%'}}>
            <Text style={{color: theme.textColor, fontWeight: '600'}}>{creditCard.cardType}</Text>
            <Text style={{color: theme.textColor, fontWeight: '300'}}>{creditCard.cardNumber}</Text>
            </View>
            <CheckBox onPress={() => {onPress && onPress(creditCard._id)}} checked={isChecked} />
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
