/* eslint-disable prettier/prettier */
import React,{ useContext} from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { ITransaction, IteminCartType } from '../../../interfaces/interfaces';
import { Icon, Text, ListItem } from '@rneui/themed';
import { Avatar } from '@rneui/base';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute, RouteProp  } from "@react-navigation/native";
import { ThemeContext } from '../../../context/ThemeContext';
import TitleAndArrowBack from '../../UIElements/TitleAndArrowBack';
import ShekelPrice from '../../UIElements/ShekelPrice';

type NavigatorParamList = {
  TransactionScreen: { transaction: ITransaction }; // Define the parameter type here
};

const TransactionView: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const route = useRoute<RouteProp<NavigatorParamList, 'TransactionScreen'>>();
    const navigation = useNavigation<StackNavigationProp<any>>();

    const { primary, secondary, text, background } = theme.colors 
    const { cardType, cardNumber, couponDiscountAmount, totalAmount, products, formattedDate, _id } = route.params.transaction;
    
    const lastFourDigits = cardNumber.substring(cardNumber.length - 4);
  const cardHiddenPrefix = '* * * * - * * * * - * * * * - ';
  const itemsAmount = products.length;


  const discountedView = (
    <View style={{marginBottom: '5%'}}>
<View style={styles.alignItems}>
<Text style={[{color: text.primary}, styles.alignItems]}>Before Discount: </Text>
<ShekelPrice num={totalAmount + couponDiscountAmount!}/>

</View>
<View style={styles.alignItems}>
<Text style={[{color: text.primary}, styles.alignItems]}>Discount: </Text>
<ShekelPrice num={couponDiscountAmount!}/>
</View>
<View style={styles.alignItems}>
<Text style={[{color: text.primary}, styles.alignItems]}>Final Price: </Text>
<ShekelPrice num={totalAmount}/>
</View>

<View style={{borderWidth: 0.3, width: '98%', alignSelf: 'center', marginTop: '2%', backgroundColor: text.primary}}/>
    </View>
  );
  const nonDiscountedView = (
    <View style={{marginBottom: '5%'}}>
<ShekelPrice num={totalAmount}/>
    </View>
  );


  const productsVieww = products.map((product: any) => (
    <View style={[{backgroundColor: background}, styles.productCon]} key={product.nfcTagCode}>
      <Image style={styles.image} source={{ uri: product.imageSource }} />
      <View>
        <Text style={{color: text.primary}}>{product.name}</Text>
        <ShekelPrice num={product.price}/>
      </View>
    </View>
  ));
  return (
    <View style={[styles.container, {backgroundColor: background}]}>
      <TitleAndArrowBack text='Transaction Details' onPress={() => {navigation.goBack()}}/>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={{fontSize: 15,fontWeight: 'bold' ,color: text.primary}}>Transaction number: </Text>
      <Text style={[styles.text, {color: text.primary, fontSize: 13}]}>{_id}</Text>

      </View>
      <View style={styles.row}>
        <View style={styles.cardInfoContainer}>
          <Icon name={`cc-${cardType}`} style={styles.cardTypeIcon} color={text.primary} type='font-awesome' />
          <Text style={{color: text.primary}}> {cardHiddenPrefix}{lastFourDigits}</Text>
        </View>
        <Text style={[{color: text.primary},styles.text]}>{formattedDate}</Text>
        
      </View>
      {couponDiscountAmount ? discountedView : nonDiscountedView}
      <ScrollView style={{backgroundColor: background}}>
        {productsVieww}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderRadius: 8,
    marginRight: '15%'
  },
  container: {
    padding: '3%',
    flex: 1,
  },
  productCon: {
    borderRadius: 8,
    width: '70%',
    flexDirection: 'row',
    marginBottom: '5%'
  },
  title: {
    alignSelf: 'center',
  },
  text: {},
  cardInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alignItems: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  cardTypeIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageShekel: {
    height: 12,
    width: 12,
},
});
export default TransactionView;