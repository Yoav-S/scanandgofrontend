/* eslint-disable prettier/prettier */
import React,{ useContext} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ITransaction } from '../../interfaces/interfaces';
import { Icon, Text, ListItem } from '@rneui/themed';
import { Avatar } from '@rneui/base';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute, RouteProp  } from "@react-navigation/native";
import { ThemeContext } from '../../context/ThemeContext';


interface Props {
    transaction: ITransaction;
};
const TransactionView: React.FC<Props> = ({ transaction }) => {
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors 
    const { cardType, cardNumber, couponDiscountAmount, totalAmount, products, formattedDate, _id } = transaction;
  const lastFourDigits = cardNumber.substring(cardNumber.length - 4);
  const cardHiddenPrefix = '* * * * - * * * * - * * * * - ';
  const itemsAmount = products.length;


  const discountedView = (
    <View>
      <Text>Before Discount: {totalAmount + couponDiscountAmount!}$</Text>
      <Text>Discount: ${couponDiscountAmount}</Text>
      <Text>Final Price: ${totalAmount}</Text>
    </View>
  );
  const nonDiscountedView = (
    <View style={styles.priceSection}>
      <Text>Price: ${totalAmount}</Text>
    </View>
  );
  const productsView = products.map(product => (
    <ListItem bottomDivider key={product.nfcTagCode}>
      <Avatar source={{ uri: product.imageSource }}  size={100} />
      <ListItem.Content>
        <ListItem.Title>{product.name}</ListItem.Title>
        <ListItem.Subtitle>${product.price}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  ));


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Transaction number: {_id}</Text>
      <View style={styles.row}>
        <View style={styles.cardInfoContainer}>
          <Icon name={`cc-${cardType}`} style={styles.cardTypeIcon} type='font-awesome' />
          <Text> {cardHiddenPrefix}{lastFourDigits}</Text>
        </View>
        <Text style={styles.text}>{formattedDate}</Text>
      </View>
      <Text style={styles.text}>{itemsAmount} items</Text>
      <ScrollView>
        {productsView}
      </ScrollView>
      {couponDiscountAmount ? discountedView : nonDiscountedView}
    </View>
  );
}

const styles = StyleSheet.create({
  priceSection: {
    marginTop: 10,

    paddingTop: 10,
  },
  container: {
    padding: 10,
  },
  title: {
    alignSelf: 'center',
  },
  text: {},
  cardInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
});
export default TransactionView;