import react, {useState, useEffect, useContext} from 'react';
import {Text, View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { useDataContext } from '../context/DataContext';
import animationData from '../assets/emptycartlottie.json'
import LottieView from 'lottie-react-native';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { IteminCartType } from '../interfaces/interfaces';
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import { StackNavigationProp } from '@react-navigation/stack';
import Item from '../components/UIComps/ReusedComps/Item';
import StyledButton from '../components/UIElements/StyledButton';
import BottomNavbar from '../components/UIElements/BottomNavbar';
import { ThemeContext } from "../context/ThemeContext";

import { CurrentUserType } from '../interfaces/interfaces';
import ShekelPrice from '../components/UIElements/ShekelPrice';
const screen = Dimensions.get('window');

const Cart: React.FC = () => {
    const {setCurrentUser,currentUser, deleteItemAttempt, showToast, amountofitemsvariable,setamountofitemsvariable} = useDataContext();
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background, loadingBackground } = theme.colors 
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [totalamountvariable, settotalamountvariable] = useState(0);
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [isCartEmpty, setisCartEmpty] = useState<boolean>(!currentUser || currentUser.cart.length === 0);
    const [currentUserItemsCart, setCurrentUserItemsCart] = useState<IteminCartType[]>(currentUser?.cart || []);
    
    const handleDeleteItem = async (userId : string, nfcTagCode : string) => {
        const newcurrentUserItemsCart: (IteminCartType[] | undefined) = currentUserItemsCart?.filter((item: IteminCartType) => item.nfcTagCode !== nfcTagCode);
        setCurrentUserItemsCart(newcurrentUserItemsCart);
        calculatePrice(newcurrentUserItemsCart);
        if(currentUserItemsCart)
        {
        setamountofitemsvariable(currentUserItemsCart.length)
        }
        showToast('Enjoy Shopping !', 'success', 'Item Successfully deleted');
        setisLoading(true);
        const [isDeleted, arrayofItems] = await deleteItemAttempt(userId, nfcTagCode);
        setisLoading(false);
        if(isDeleted) {
            if(arrayofItems?.length === 0){
                setisCartEmpty(true)
                setamountofitemsvariable(0)
            }
        }
        else{
            showToast('Please try again !', 'error', 'Failed to delete item');
        }
    }
    
    const calculatePrice = (currentUserItemsCart: IteminCartType[]) => {
        let price: number = 0;
        currentUserItemsCart && currentUserItemsCart.forEach((item) => {
          price += item.price;
        });
        settotalamountvariable(price);
      };
      
      useEffect(() => {
        setisCartEmpty(!currentUser || currentUser.cart.length === 0);
        setCurrentUserItemsCart(currentUser?.cart || []);
        calculatePrice(currentUserItemsCart);
        setamountofitemsvariable(currentUser?.cart.length || 0)
      }, [currentUser]);
      useEffect(() => {
        calculatePrice(currentUserItemsCart);
      }, [ currentUserItemsCart]);
    return (
        <View style={[styles.container, {backgroundColor: background}]}>
            <View style={styles.titleandIcon}>
            <Text/>
            <Text style={{color: text.primary, fontWeight: '600', fontSize: 18}}>Cart</Text>
            <Icon style={{marginRight: '3%'}} color={text.primary} name="shopping-cart" size={30}/>
            { amountofitemsvariable > 0 ? (<Text style={[{ color: 'white', backgroundColor: 'red', borderRadius: 50, width: 18, textAlign: 'center', fontSize: 12 }, styles.amountvariable]}>
          {currentUser?.cart.length}
        </Text>) : (<View style={{position: 'absolute'}}/>)}
            </View>
            {
               isCartEmpty ? (
               <SafeAreaView style={styles.lottieCon}>
                <LottieView
                style={{width: 250, height: 250}}
                speed={1} 
                source={animationData}
                autoPlay
                loop={true}
                />
                <Text style={[{color: text.primary, fontSize: 28, fontWeight: '600', marginTop: '15%'}]}>Your Cart is empty</Text>
                </SafeAreaView>) : 
                
                (<View style={styles.nonEmptyCartCon}>
                    <ScrollView style={styles.scrollViewCon}>
                    {currentUserItemsCart && currentUserItemsCart.map((cartItem: IteminCartType) => {
                                          return (
                                            <Item
                                              key={cartItem.itemId}
                                              itemObj={cartItem}
                                              handleDeleteItem={handleDeleteItem}
                                            />
                                          );
                                        })}

                    </ScrollView>
                    <View style={styles.totalandcheckoutcon}>
                        <View style={styles.totalandpricecon}>
                            <Text style={{color: text.primary}}>Total</Text>
                            <ShekelPrice num={totalamountvariable}/>


                        </View>
                        <StyledButton bigbutton text='Checkout' onPress={() => {navigation.navigate('CheckoutScreen', {totalAmount: totalamountvariable})}}/>
                    </View>
                </View>) 
            }
                        <BottomNavbar/>
                        <Toast/>

        </View>
    )
}
export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollViewCon: {
        maxHeight: 500
    },
    totalandcheckoutcon: {
        width: '90%',
        alignSelf: 'center',
        marginTop: '3%'
    },
    totalandpricecon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nonEmptyCartCon: {

    },
    imageShekel: {
        marginLeft: '5%',
            height: 15,
            width: 15,
    },
    lottieCon: {
        alignItems: 'center',
        marginTop: '5%'
    },
    titleandIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '2%'
    },    
    amountvariable: {
        position: 'absolute',
        zIndex: 15,
        fontWeight: 'bold',
        right: '1%'
      },
});