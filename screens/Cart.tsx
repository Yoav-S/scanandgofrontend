import react, {useState, useEffect, useContext} from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import { useDataContext } from '../context/DataContext';
import animationData from '../assets/emptycartlottie.json'
import LottieView from 'lottie-react-native';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { IteminCartType } from '../interfaces/interfaces';
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import { StackNavigationProp } from '@react-navigation/stack';
import Item from '../components/UIComps/Item';
import StyledButton from '../components/UIComps/StyledButton';
import BottomNavbar from '../components/UIComps/BottomNavbar';
import { ThemeContext } from "../context/ThemeContext";

import { CurrentUserType } from '../interfaces/interfaces';
const Cart: React.FC = () => {
    const {updatedCurrentUserCart,setCurrentUser,currentUser, deleteItemAttempt, showToast, amountofitemsvariable, setamountofitemsvariable} = useDataContext();
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors 
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [totalamountvariable, settotalamountvariable] = useState<number>(0);
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [isCartEmpty, setisCartEmpty] = useState<boolean>(currentUser?.cart && currentUser.cart.length > 0 ? false : true);
    const [currentUserItemsCart, setCurrentUserItemsCart] = useState<IteminCartType[] | undefined>(updatedCurrentUserCart);

    const handleDeleteItem = async (userId : string, nfcTagCode : string) => {
        const newcurrentUserItemsCart: (IteminCartType[] | undefined) = updatedCurrentUserCart?.filter((item: IteminCartType) => item.nfcTagCode !== nfcTagCode);
        setCurrentUserItemsCart(newcurrentUserItemsCart);
        setisLoading(true);
        const [isDeleted, arrayofItems] = await deleteItemAttempt(userId, nfcTagCode);
        setisLoading(false);
        if(isDeleted) {
            if(arrayofItems?.length === 0){
                if(currentUser){
                    let newUser: CurrentUserType = currentUser;
                    newUser.cart = arrayofItems;
                    setCurrentUser(newUser);
                }
                setisCartEmpty(true)
                setamountofitemsvariable(0)
            }
            else if(arrayofItems && arrayofItems?.length > 0)
            {
                setamountofitemsvariable(arrayofItems.length)
            }
            setCurrentUserItemsCart(arrayofItems);
            showToast('Enjoy Shopping !', 'success', 'Item Successfully deleted');
        }
        else{
            showToast('Please try again !', 'error', 'Failed to delete item');
        }
    }
    
    const calculatePrice = () => {
        let price: number = 0;
        currentUser?.cart.forEach((item) => {
          price += item.price;
        });
        settotalamountvariable(price);
      };
      
      useEffect(() => {
        calculatePrice(); // Calculate the initial total price when the component mounts
        setCurrentUserItemsCart(updatedCurrentUserCart);
      }, [updatedCurrentUserCart, currentUser]);   
          

      console.log(updatedCurrentUserCart);
      
    return (
        <View style={[styles.container, {backgroundColor: background}]}>
            <View style={styles.titleandIcon}>
            <Text/>
            <Text style={{color: text.primary, fontWeight: '600', fontSize: 18}}>Cart</Text>
            <Icon color={text.primary} name="shopping-cart" size={30}/>
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
                    {
                        currentUserItemsCart && currentUserItemsCart.map((cartItem: IteminCartType) => {
                            return(
                                <Item
                                key={cartItem.itemId}
                                itemObj={cartItem}
                                handleDeleteItem={handleDeleteItem}
                                />
                            )
                        })
                    }
                    </ScrollView>
                    <View style={styles.totalandcheckoutcon}>
                        <View style={styles.totalandpricecon}>
                            <Text style={{color: text.primary}}>Total</Text>
                            <Text style={{color: text.primary, fontWeight: 'bold'}}>{totalamountvariable}</Text>
                        </View>
                        <StyledButton disabled={isLoading} bigbutton text='Checkout' onPress={() => {navigation.navigate('CheckoutScreen', {totalAmount: totalamountvariable})}}/>
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
    lottieCon: {
        alignItems: 'center',
        marginTop: '5%'
    },
    titleandIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '2%'
    }
});