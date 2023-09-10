import React,  { useEffect, useState }  from "react";
import { TextInput, StyleSheet, SafeAreaView , Text, Dimensions} from "react-native";
import { CurrentUserType, IStats, Role } from "../interfaces/interfaces";
import BottomNavbar from "../components/UIComps/BottomNavbar";
import TransactionsList from "../components/UIComps/TransactionList";
import StatsChart from "../components/UIComps/StatsChart";


const StatsScreen: React.FC = () => {
  const user : CurrentUserType = {
    '_id': '64e4624cac9453ef60727a0c',
    'fullName': 'koren kaplan',
    'roles': [
        Role.USER,
    ],
    'email': 'korenkaplan96@gmail.com',
    'creditCards': [
        {
            'cardNumber': '12341234798456',
            'expirationDate': '05/25',
            'cardholderName': 'KOREN KAPLAN',
            'cvv': '999',
            'cardType': 'visa',
            'isDefault': false,
            '_id': '64edeea0dfecc8c2e645ccad',
        },
        {
            'cardNumber': '11111111111111',
            'expirationDate': '05/25',
            'cardholderName': 'KOREN KAPLAN',
            'cvv': '999',
            'cardType': 'visa',
            'isDefault': false,
            '_id': '64f5d9c9576739769304aa1e',
        },
        {
            'cardNumber': '1111222221111',
            'expirationDate': '05/25',
            'cardholderName': 'KOREN KAPLAN',
            'cvv': '999',
            'cardType': 'visa',
            'isDefault': false,
            '_id': '64f5d9d2576739769304aa23',
        },
    ],
    'password': '$2b$10$MVf9dPgdXuRVe8VmKHGae.BPAHdOp63BiaGzD6/6u6IeKPWOezHy2',
    'cart': [],
    'gender': 'male',
    'birthDate': new Date('1996-07-10T21:00:00.000Z'),
    'isActive': true,
    'schemaVersion': 1,
    'deviceToken': 'korendv',
    'createdAt': new Date('2023-08-22T07:22:52.887Z'),
    'transactionsAmount': 19,
    'lastActivity': new Date('2023-08-22T07:22:52.887Z'),
    'recentItems': [
        {
            'itemId': '64f1ef05db622f243faf2a9e',
            'imageSource': 'https://m.media-amazon.com/images/I/51uoiHsForL._AC_UL400_.jpg',
            'name': 'Ghost Skateboard Lazy',
        },
        {
            'itemId': '64f1ef05db622f243faf2a9c',
            'imageSource': 'https://m.media-amazon.com/images/I/71eS4Z65FDL._AC_UL400_.jpg',
            'name': 'SOLY HUX',
        },
        {
            'itemId': '64f1ef05db622f243faf2a9e',
            'imageSource': 'https://m.media-amazon.com/images/I/51uoiHsForL._AC_UL400_.jpg',
            'name': 'Ghost Skateboard Lazy',
        },
        {
            'itemId': '64f1ef05db622f243faf2a9c',
            'imageSource': 'https://m.media-amazon.com/images/I/71eS4Z65FDL._AC_UL400_.jpg',
            'name': 'SOLY HUX',
        },
        {
            'itemId': '64f1ef05db622f243faf2a9e',
            'imageSource': 'https://m.media-amazon.com/images/I/51uoiHsForL._AC_UL400_.jpg',
            'name': 'Ghost Skateboard Lazy',
        },
        {
            'itemId': '64f1ef05db622f243faf2a9c',
            'imageSource': 'https://m.media-amazon.com/images/I/71eS4Z65FDL._AC_UL400_.jpg',
            'name': 'SOLY HUX',
        },
        {
            'itemId': '64f1ef05db622f243faf2a9e',
            'imageSource': 'https://m.media-amazon.com/images/I/51uoiHsForL._AC_UL400_.jpg',
            'name': 'Ghost Skateboard Lazy',
        },
        {
            'itemId': '64f1ef05db622f243faf2a9c',
            'imageSource': 'https://m.media-amazon.com/images/I/71eS4Z65FDL._AC_UL400_.jpg',
            'name': 'SOLY HUX',
        },
        {
            'itemId': '64f1ef05db622f243faf2a9e',
            'imageSource': 'https://m.media-amazon.com/images/I/51uoiHsForL._AC_UL400_.jpg',
            'name': 'Ghost Skateboard Lazy',
        },
        {
            'itemId': '64f1ef05db622f243faf2a9c',
            'imageSource': 'https://m.media-amazon.com/images/I/71eS4Z65FDL._AC_UL400_.jpg',
            'name': 'SOLY HUX',
        },
    ],
    'recentTransactions': [
        {
            '_id': '64fadb0e5ecc0541ce9b3834',
            'totalAmount': 86.4,
            'formattedDate': '08-09-2023',
            'cardType': 'mastercard',
            'cardNumber': '12341234798456',
        },
        {
            '_id': '64fadb015ecc0541ce9b382a',
            'totalAmount': 85.5,
            'formattedDate': '08-09-2023',
            'cardType': 'amex',
            'cardNumber': '12341234798456',
        },
        {
            '_id': '64fadaf55ecc0541ce9b3820',
            'totalAmount': 82.8,
            'formattedDate': '08-09-2023',
            'cardType': 'discover',
            'cardNumber': '12341234798456',
        },
        {
            '_id': '64fadae65ecc0541ce9b3816',
            'totalAmount': 81.9,
            'formattedDate': '08-09-2023',
            'cardType': 'visa',
            'cardNumber': '12341234798456',
        },
        {
            '_id': '64fadadc5ecc0541ce9b380c',
            'totalAmount': 81.9,
            'formattedDate': '08-09-2023',
            'cardType': 'visa',
            'cardNumber': '12341234798456',
        },
        {
            '_id': '64fadacd5ecc0541ce9b3802',
            'totalAmount': 89.1,
            'formattedDate': '08-09-2023',
            'cardType': 'visa',
            'cardNumber': '12341234798456',
        },
        {
            '_id': '64fadabb5ecc0541ce9b37f8',
            'totalAmount': 80.1,
            'formattedDate': '08-09-2023',
            'cardType': 'visa',
            'cardNumber': '12341234798456',
        },
        {
            '_id': '64fadaa65ecc0541ce9b37ee',
            'totalAmount': 78.3,
            'formattedDate': '08-09-2023',
            'cardType': 'visa',
            'cardNumber': '12341234798456',
        },
        {
            '_id': '64fada6929990d2ffa5a1857',
            'totalAmount': 78.3,
            'formattedDate': '08-09-2023',
            'cardType': 'visa',
            'cardNumber': '12341234798456',
        },
        {
            '_id': '64fada0bc22b402f30d6a341',
            'totalAmount': 72.9,
            'formattedDate': '08-09-2023',
            'cardType': 'visa',
            'cardNumber': '12341234798456',
        },
    ],
};
const defaultStats: IStats[] = [
    {
      'label': 'Jan',
      'value': 0,
    },
    {
      'label': 'Feb',
      'value': 0,
    },
    {
      'label': 'Mer',
      'value': 0,
    },
    {
      'label': 'Apr',
      'value': 0,
    },
    {
      'label': 'May',
      'value': 0,
    },
    {
      'label': 'Jun',
      'value': 0,
    },
    {
      'label': 'Jul',
      'value': 0,
    },
];
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.colorBlack}>StatsScreen</Text>
        <StatsChart userId={user._id}/>
        <TransactionsList/>
        <BottomNavbar/>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    colorBlack: {
        color: 'black'
    },
    container: {
      flex: 1,
      backgroundColor: 'white'
  }
});

export default StatsScreen;

