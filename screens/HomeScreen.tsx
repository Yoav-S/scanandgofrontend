import React from "react";
import { View, StyleSheet, Text, SafeAreaView, Image, Dimensions , ScrollView} from "react-native";
import { HomeScreenType, recentItemType , recentTransaction} from "../interfaces/interfaces";
import { useTheme } from "../context/ThemeContext";
import BottomNavbar from "../components/UIComps/BottomNavbar";
import { useDataContext } from "../context/DataContext";
import TransactionItem from "../components/UIComps/TransactionItem";
import ImageCarousel from "../components/UIComps/ImageCarousel";
const HomeScreen: React.FC<HomeScreenType> = (props) => {
    const { theme } = useTheme();
    const { currentUser } = useDataContext();
    const recentItemArray: recentItemType[] = currentUser?.recentItems || [];
    const recentTransactionArray: recentTransaction[] = currentUser?.recentTransactions || [];

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{color: theme.textColor, fontSize: 22, textAlign: 'center',
        marginTop: '10%', fontWeight: '600' }}>Recent Items</Text>
            <ImageCarousel data={recentItemArray} />
            <Text style={{color: theme.textColor, fontSize: 22, textAlign: 'center', fontWeight: '600', marginTop: '3%'}}>Recent Transactions</Text>
            <View style={styles.scrollViewCon}>

            <ScrollView style={styles.scrollView}>
                {
                    recentTransactionArray.map((transaction: recentTransaction, index) => {
                        return (
                            <TransactionItem key={index} transaction={transaction}/>
                        )
                    })
                }
            </ScrollView>
            </View>

            <BottomNavbar />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    colorBlack: {
        color: 'black'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    scrollView: {

    },
    scrollViewCon: {
        height: 200,
        marginTop:'5%'
    },
    item: {
        width: 180, // Adjust width as per your requirement
        height: 180, // Adjust height as per your requirement
    },
    image: {
        width: '100%', 
        height: '100%', 
        resizeMode: 'cover'
    }
});

export default HomeScreen;
