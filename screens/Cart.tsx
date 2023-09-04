import react, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import { useDataContext } from '../context/DataContext';
import animationData from '../assets/emptycartlottie.json'
import LottieView from 'lottie-react-native';
import { useTheme } from '../context/ThemeContext';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { IteminCartType } from '../interfaces/interfaces';
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import { StackNavigationProp } from '@react-navigation/stack';
import Item from '../components/UIComps/Item';
import StyledButton from '../components/UIComps/StyledButton';
import BottomNavbar from '../components/UIComps/BottomNavbar';
import { CurrentUserType } from '../interfaces/interfaces';
const Cart: React.FC = () => {
    const {setCurrentUser,currentUser, deleteItemAttempt, showToast, amountofitemsvariable, setamountofitemsvariable} = useDataContext();
    const {theme} = useTheme();
    const navigation = useNavigation<StackNavigationProp<any>>();
    
    const [totalamountvariable, settotalamountvariable] = useState<number>(0);
    const [isCartEmpty, setisCartEmpty] = useState<boolean>(currentUser?.cart && currentUser.cart.length > 0 ? false : true);
    const [currentUserItemsCart, setCurrentUserItemsCart] = useState<IteminCartType[] | undefined>(!isCartEmpty && currentUser?.cart ? currentUser.cart : []);

    const handleDeleteItem = async (userId : string, nfcTagCode : string) => {
        const [isDeleted, arrayofItems] = await deleteItemAttempt(userId, nfcTagCode);
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
      }, [currentUser]); 
    

    return (
        <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
            <View style={styles.titleandIcon}>
            <Text/>
            <Text style={{color: theme.textColor, fontWeight: '600', fontSize: 18}}>Cart</Text>
            <Icon name="shopping-cart" size={30}/>
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
                <Text style={[{color: theme.textColor, fontSize: 28, fontWeight: '600', marginTop: '15%'}]}>Your Cart is empty</Text>
                </SafeAreaView>) : 
                
                (<View style={styles.nonEmptyCartCon}>
                    <ScrollView style={styles.scrollViewCon}>
                    {
                        currentUserItemsCart && currentUserItemsCart.map((cartItem: IteminCartType, index) => {
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
                            <Text style={{color: theme.textColor}}>Total</Text>
                            <Text style={{color: theme.textColor, fontWeight: 'bold'}}>{totalamountvariable}</Text>
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