/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { CurrentUserType, ITransaction, PaginationResponse, recentTransaction} from '../../interfaces/interfaces'
import { Button, ListItem, Icon } from '@rneui/themed';
import { ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import activitiIndicator from '../../assets/activitiindicator.json'
import { useDataContext } from '../../context/DataContext';
import { useNavigation, useRoute, RouteProp  } from "@react-navigation/native";
import { ThemeContext } from '../../context/ThemeContext';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
type NavigatorParamList = {
    TransactionList: {transaction: ITransaction}
};

const activitiIndicatorObject = (<LottieView
    style={{width: 50, height: 50 , zIndex: 10}}
    speed={1} 
    source={activitiIndicator}
    autoPlay
    loop={true}
    />)
const TransactionsList: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors 
    const {currentUser, getFullTransaction, showToast, getMoreAttemt} = useDataContext();
    const [transactionsList, setTransactionsList] = useState(currentUser?.recentTransactions || []);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isMoreToFetch, setIsMoreToFetch] = useState(false);
    const route = useRoute<RouteProp<NavigatorParamList, 'TransactionList'>>();
    const navigation = useNavigation<StackNavigationProp<any>>();
    const transaction = {
        '_id': '64faebbccc82c8de3d122fd2',
        'userId': '64e4624cac9453ef60727a0c',
        'cardNumber': '12341234798456',
        'cardType': 'visa',
        'totalAmount': 87,
        'products': [
            {
                'itemId': '64f1ef05db622f243faf2a9e',
                'nfcTagCode': '043886DA161291',
                'imageSource': 'https://m.media-amazon.com/images/I/51uoiHsForL._AC_UL400_.jpg',
                'name': 'Ghost Skateboard Lazy',
                'price': 34.99,
            },
            {
                'itemId': '64f1ef05db622f243faf2a9c',
                'nfcTagCode': '043585DA161291',
                'imageSource': 'https://m.media-amazon.com/images/I/71eS4Z65FDL._AC_UL400_.jpg',
                'name': 'SOLY HUX',
                'price': 34.99,
            },
        ],
        'schemaVersion': 1,
        'formattedDate': '08-09-2023',
        'createdAt': new Date('2023-09-08T09:39:08.938Z'),
        'couponDiscountAmount': 9,
        '__v': 0,
    };
    const handlePressTransaction = async (id: string) => {
        const [isExists, transaction] = await getFullTransaction(id);
        console.log(isExists);
        if(isExists){
            navigation.navigate('TransactionView',{transaction: transaction});
        }
        else{
            showToast('please try again later', 'error', 'Cannot find transaction details')
        }
    }
    useEffect(() => {
        if(currentUser){
        const isMore = currentUser.recentTransactions.length < 10 ? false : true;
        setIsMoreToFetch(isMore);
    }
    }, []);
    
    const getMoreRequest = async () => {
        return await getMoreAttemt(pageNumber.toString());
    }
    const handleGetMore = async () => {
        setIsLoading(true);
        const { list, isMore } = await getMoreRequest();
        setIsLoading(false);
        console.log(list);
        console.log(isMore);
        const updatedPage = pageNumber + 1;
        setPageNumber(updatedPage);
        const updatedList = [...transactionsList, ...list]; // Use the spread operator here
        setTransactionsList(updatedList);
        setIsMoreToFetch(isMore);
    };
    console.log(isLoading);
    
    const list = transactionsList.map((transaction : recentTransaction, index) => {
        
        return(<TouchableOpacity style={{backgroundColor: background}} key={transaction._id} onPress={() => handlePressTransaction(transaction._id)}>
            <ListItem style={{backgroundColor: background}} bottomDivider>
                <ListItem.Content style={{ flexDirection: 'row',  alignItems: 'center' ,justifyContent:'space-between'}}>
                    <View style={{flexDirection: 'row',  alignItems: 'center',justifyContent:'space-between',width:'30%'}}>
                    <Text style={{ fontWeight: 'bold'}}>{index + 1}</Text>
                    <Icon name={`cc-${transaction.cardType}`} style={styles.cardType} type='font-awesome' />
                    </View>
                    <View style={{flexDirection: 'row',  alignItems: 'center',justifyContent:'space-around',width:'60%'}}>
                    <ListItem.Title>${transaction.totalAmount}</ListItem.Title>
                    <ListItem.Subtitle>{transaction.formattedDate}</ListItem.Subtitle>  
                    </View>
                </ListItem.Content>
                <ListItem.Chevron size={30} color={'black'} />
            </ListItem>
        </TouchableOpacity>)
    });


    return (
        <View style={{ flex: 1 , borderRadius: 14}}>
            <Text style={styles.listHeader} >All Transaction ({currentUser?.transactionsAmount})</Text>
            <View style={{height: 300, width: '90%', alignSelf: 'center', backgroundColor: background, borderRadius: 14}}>
            <ScrollView contentContainerStyle={[styles.ScrollView, {backgroundColor: background}]}>
                { transactionsList.length > 0 ? list : <Text>No Recent Transaction</Text>}
                {isMoreToFetch ? (
                    isLoading ? (
                    <View style={{alignSelf: 'center', marginTop: '3%'}}>
                    {activitiIndicatorObject}
                </View>
                ) : (
                <Button buttonStyle={styles.button} onPress={handleGetMore} type={'outline'} title={'Get more'} />
                ) ) : <></>}
            </ScrollView>
            </View>

            <Toast/>
        </View>
    );  
}


const styles = StyleSheet.create({
    cardType: {
        width: 50,
        height: 50,
        justifyContent: 'center',
    },
    ScrollView: {
flexGrow: 1
    },
    button: {
        width: 100,
        alignSelf: 'center',
        marginTop: 5,
        borderRadius: 10,
        borderWidth: 1,
    },
    listHeader: {
        margin: 5,
        fontWeight: 'bold'
    },
})
export default TransactionsList;