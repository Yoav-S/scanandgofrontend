import React, {useContext} from "react";
import { View, StyleSheet, Text, SafeAreaView, Image, Dimensions , ScrollView} from "react-native";
import { HomeScreenType, recentItemType , recentTransaction} from "../interfaces/interfaces";
import BottomNavbar from "../components/UIComps/BottomNavbar";
import { useDataContext } from "../context/DataContext";
import TransactionItem from "../components/UIComps/TransactionItem";
import { ThemeContext } from "../context/ThemeContext";
import ImageCarousel from "../components/UIComps/ImageCarousel";
import Toast from "react-native-toast-message";
import NoTransactionComp from "../components/UIComps/NoTransactionComp";
const HomeScreen: React.FC<HomeScreenType> = (props) => {
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors     

    const { currentUser, showToast } = useDataContext();
    const recentItemArray: recentItemType[] = [];
    const recentTransactionArray: recentTransaction[] = [];
    const handleshowToast = () => {
        showToast('please try again later', 'error', 'Cannot find transaction details')
    }
    
    return (
        <SafeAreaView style={[styles.container,{ backgroundColor: background}]}>
            {
                (recentItemArray.length === 0 && recentTransactionArray.length === 0) ? 
                (
                    <NoTransactionComp/>
                )
                 :
                (<View>
                        <Text style={{color: text.primary, fontSize: 22, textAlign: 'center',
                    marginTop: '10%', fontWeight: '600' }}>Recent Items</Text>
                        <ImageCarousel data={recentItemArray} />
                        <Text style={{color: text.primary, fontSize: 22, textAlign: 'center', fontWeight: '600', marginTop: '3%'}}>Recent Transactions</Text>
                        <View style={styles.scrollViewCon}>

                        <ScrollView style={styles.scrollView}>
                            {
                                recentTransactionArray.map((transaction: recentTransaction, index) => {
                                    return (
                                        <TransactionItem handleshowToast={handleshowToast} key={index} transaction={transaction}/>
                                    )
                                })
                            }
                        </ScrollView>
                        </View>
                </View>)
            }


            <BottomNavbar />
            <Toast/>
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
