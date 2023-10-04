/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { CurrentUserType, ITransaction, PaginationResponse, recentTransaction, recentItemType} from '../../../interfaces/interfaces'
import { Button, ListItem, Icon } from '@rneui/themed';
import { ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import activitiIndicator from '../../../assets/activitiindicator.json'
import { useDataContext } from '../../../context/DataContext';
import { useNavigation, useRoute, RouteProp  } from "@react-navigation/native";
import { ThemeContext } from '../../../context/ThemeContext';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import TransactionItem from '../ReusedComps/TransactionItem';
type NavigatorParamList = {
    TransactionList: {transaction: ITransaction}
};

const screen = Dimensions.get('window');

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
    const recentItemArray: recentItemType[] = currentUser?.recentItems || [];
    const recentTransactionArray: recentTransaction[] = currentUser?.recentTransactions || [];
    const activitiIndicatorObject = (<LottieView
        style={{width: 50, height: 50 , zIndex: 10}}
        speed={1} 
        source={activitiIndicator}
        autoPlay
        loop={true}
        />)
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
        const updatedPage = pageNumber + 1;
        setPageNumber(updatedPage);
        const updatedList = [...transactionsList, ...list]; // Use the spread operator here
        console.log(updatedList);
        setTransactionsList(updatedList);
        setIsMoreToFetch(isMore);
    };
    
   
    const handleshowToast = () => {
        showToast('please try again later', 'error', 'Cannot find transaction details')
    }

    return (
        <View style={{borderRadius: 14}}>
            <Text style={[styles.listHeader, {color: text.primary}]} >All Transaction ({currentUser?.transactionsAmount})</Text>
            <View style={{height: screen.height * 0.39, alignSelf: 'center', backgroundColor: background, borderRadius: 14}}>
                { transactionsList.length > 0 ?                         <View style={styles.scrollViewCon}>

<ScrollView showsVerticalScrollIndicator={false}>

    {
        transactionsList.map((transaction: recentTransaction, index) => {
            return (
                <TransactionItem handleshowToast={handleshowToast} key={transaction._id} transaction={transaction}/>
            )
        })
    }
        {isMoreToFetch ? (
                    isLoading ? (
                    <View style={{alignSelf: 'center', marginTop: '1%', borderRadius: 50, backgroundColor: 'black'}}>
                    {activitiIndicatorObject}
                </View> 
                ) : (
                <Button buttonStyle={styles.button} onPress={handleGetMore} type={'outline'} title={'Get more'} />
                ) ) : <></>}
</ScrollView>
</View> : <Text>No Recent Transaction</Text>}

            </View>

        </View>
    );  
}


const styles = StyleSheet.create({
    cardType: {
        width: 50,
        height: 50,
        justifyContent: 'center',
    },
    scrollViewCon: {
        marginTop:'5%',
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
        marginLeft: '4%',
        fontWeight: 'bold'
    },
})
export default TransactionsList;