import React, {useContext} from "react";
import { View, StyleSheet, Text, SafeAreaView, Image, Dimensions , ScrollView} from "react-native";
import { HomeScreenType, recentItemType , recentTransaction} from "../interfaces/interfaces";
import BottomNavbar from "../components/UIElements/BottomNavbar";
import { useDataContext } from "../context/DataContext";
import TransactionItem from "../components/UIComps/ReusedComps/TransactionItem";
import { ThemeContext } from "../context/ThemeContext";
import ImageCarousel from "../components/UIComps/HomeScreenCompsFolder/ImageCarousel";
import Toast from "react-native-toast-message";
import NoTransactionComp from "../components/UIComps/HomeScreenCompsFolder/NoTransactionComp";
import { Container } from 'native-base';
import { Button, Text as Title } from 'native-base';
const { width, height } = Dimensions.get('window');

const HomeScreen: React.FC<HomeScreenType> = (props) => {
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors     

    const { currentUser, showToast } = useDataContext();
    const recentItemArray: recentItemType[] = currentUser?.recentItems || [];
    const recentTransactionArray: recentTransaction[] = currentUser?.recentTransactions || [];
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
                        <ImageCarousel data={recentItemArray} />
                        <Title fontFamily={"montserrat"} margin={'5%'} fontSize="lg" fontWeight={"bold"} color={text.primary}>Recent Transactions</Title>
                        <View style={styles.scrollViewCon}>

                        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
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
        height: height * 0.4,
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
