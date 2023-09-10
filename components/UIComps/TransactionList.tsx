/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { CurrentUserType, ITransaction, PaginationResponse} from '../../interfaces/interfaces'
import { Button, ListItem, Icon } from '@rneui/themed';
import { ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { useDataContext } from '../../context/DataContext';
import { useNavigation, useRoute, RouteProp  } from "@react-navigation/native";
import { ThemeContext } from '../../context/ThemeContext';

type NavigatorParamList = {
    TransactionList: {transaction: ITransaction}
};


const TransactionsList: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors 
    const {currentUser} = useDataContext();
    const [transactionsList, setTransactionsList] = useState(currentUser?.recentTransactions || []);
    const [pageNumber, setPageNumber] = useState(1);
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
    const handlePressTransaction = (id: string) => {
        console.log('Press Transaction id: ' + id);
        navigation.navigate('TransactionView', {transaction: transaction});
        {/*
        logic:
        1.Create the request body (check what fields relevant to the transaction view page and add to projection)
        2 get transaction by id ( make api request)
        3. if error show error modal
        4. navigate to transaction view page and pass the transaction as prop
        */}

    }
    useEffect(() => {
        if(currentUser){
        const isMore = currentUser.recentTransactions.length < 10 ? false : true;
        setIsMoreToFetch(isMore);
    }
    }, []);
    const getMoreRequest = async () => {
        try {
            const reqBody = {
                query:
                {
                    userId: currentUser?._id,
                },
                projection: {
                    cardType: 1,
                    totalAmount: 1,
                    formattedDate: 1
                },
                currentPage: pageNumber
            }
            const response = await axios.post('https://scan-and-go.onrender.com/transactions/getManyPagination', reqBody);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 500) {
                    console.error('500 Internal Server Error:', error.response.data.message);
                }
                else if (error.response.status === 404) {
                    console.error('404 Not Found:', error.response.data.message);
                }
                else {
                    // Handle other status codes
                    console.error('Other Error:', error.response.status, error.response.data);
                }
            }
        }
    }
    const handleGetMore = async () => {
        const { list, isMore } = await getMoreRequest();
        const updatedPage = pageNumber + 1;
        setPageNumber(updatedPage);
        const updatedList = [...transactionsList, ...list]; // Use the spread operator here
        setTransactionsList(updatedList);
        setIsMoreToFetch(isMore);
    };
    const list = transactionsList.map((transaction, index) => {

        return <TouchableOpacity key={transaction._id} onPress={() => handlePressTransaction(transaction._id)}>
            <ListItem  bottomDivider>
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
        </TouchableOpacity>
    });


    return (
        <View style={{ flex: 1 , backgroundColor: background }}>
            <Text style={styles.listHeader} >All Transaction ({currentUser?.transactionsAmount})</Text>
            <ScrollView contentContainerStyle={styles.ScrollView}>
                {TransactionsList.length > 0 ? list : <Text>No Recent Transaction</Text>}
                {isMoreToFetch ? <Button buttonStyle={styles.button} onPress={handleGetMore} type={'outline'} title={'Get more'} /> : <></>}
            </ScrollView>
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
        flexGrow: 1,
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