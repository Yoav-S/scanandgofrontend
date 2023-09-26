import react, {useState, useEffect , useContext} from 'react';
import {Text, View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Keyboard, Platform} from 'react-native';
import TitleAndArrowBack from '../components/UIElements/TitleAndArrowBack';
import { useDataContext } from '../context/DataContext';
import StyledButton from '../components/UIElements/StyledButton';
import { ScrollView } from 'react-native-gesture-handler';
import { creditCardType, IteminCartType, TransactionFormType, productInTransaction , IText} from '../interfaces/interfaces';
import { useNavigation, useRoute, RouteProp  } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import { StackNavigationProp } from '@react-navigation/stack';
import CreditCardAbstractComp from '../components/UIComps/CheckoutScreenComps/CreditCardAbstractComp';
import BottomNavbar from '../components/UIElements/BottomNavbar';
import CartCarusell from '../components/UIComps/CheckoutScreenComps/CartCaruselle';
import { ThemeContext } from "../context/ThemeContext";
import CouponComp from '../components/UIComps/CheckoutScreenComps/CouponComp';
import { ActivityIndicator } from '@react-native-material/core';
type NavigatorParamList = {
    CheckoutScreen: { totalAmount: number, cart: IteminCartType[] }; // Define the parameter type here
};
  
const Checkout: React.FC = () => {
    const route = useRoute<RouteProp<NavigatorParamList, 'CheckoutScreen'>>();
    const totalAmount = route.params.totalAmount;  
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors 
    const {currentUser, showToast, verifyCouponAttempt, PaymentAttempt} = useDataContext();
    const [isCouponValid, setisCouponValid] = useState<boolean>(false);
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [isAttempted, setisAttempted] = useState<boolean>(false);
    const [isLoadingPayment, setisLoadingPayment] = useState<boolean>(false);
    const [currentCouponInputValue, setCouponInputValue] = useState<string>('');
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [localCheckedVal, setlocalCheckedVal] = useState<boolean>();
    const [totalAmountToPay, setTotalAmountToPay] = useState<number>(0);
    const [couponDiscountAmount, setcouponDiscountAmount] = useState<number>(0);
    const [creditCards, setcreditCards] = useState<creditCardType[]>(currentUser?.creditCards || []);
    const [btnLabelText, setBtnLabelText] = useState<string>('Apply')
    const [currentCoupon, setCurrentCoupon] = useState<string>('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [isEmptyCreditCardArray, setisEmptyCreditCardArray] = useState<boolean>(currentUser?.creditCards && currentUser?.creditCards.length > 0 ? false : true);
    const cards = creditCards.map((creditCard: creditCardType) => {
        return(
            <CreditCardAbstractComp
            key={creditCard._id}
            creditCard={creditCard}
            onPress={() => handlecheckboxPress(creditCard._id)}
            isChecked={creditCard.isDefault}
            />
        )
    })
    const changeInputHandler = (coupon: string) => {
        setBtnLabelText('Apply');
        setisCouponValid(false);
        setCouponInputValue(coupon);
    }  
    
    const handleCouponCheck = async () => {
        if(currentCouponInputValue.length < 4) {
            showToast('Coupon should be at least 4 characters', 'error', 'Coupon check failed');
            return;
        }
        setisLoading(true);
        const [isValid, couponObject, message] = await verifyCouponAttempt(currentCouponInputValue);
        console.log(isValid, couponObject);
        
        setisLoading(false);
        setisAttempted(true);
       if(isValid && couponObject){
        setBtnLabelText('Verified')
        setCurrentCoupon(couponObject._id);
        setisCouponValid(true);
        showToast(`Coupon discount ${couponObject?.discountPercentage}`, 'success', 'Coupon Verified !');
        const newPercentFormat = couponObject.discountPercentage * (1/100);
        const calculatedDiscountPrice = totalAmount * newPercentFormat;
        setcouponDiscountAmount(calculatedDiscountPrice);
        setTotalAmountToPay(totalAmount - calculatedDiscountPrice);
       }else{
        setBtnLabelText('Invalid')
        showToast(message || 'Invalid Coupon', 'error', 'Coupon not Verified');
       }


    }
    
    const handlecheckboxPress = (id: string) => {
        const newCreditCards : creditCardType[] = creditCards.map((creditCard: creditCardType) => {
            if(creditCard.isDefault && creditCard._id !== id){
                creditCard.isDefault = false;
            }
            else if(creditCard._id === id){
                creditCard.isDefault = true;
            }
            return creditCard;
        })        
        setcreditCards(newCreditCards);
    }

    const handlePayNow = async () => {
    const chosenCreditCard = creditCards.filter((card: creditCardType) => card.isDefault)
    const originalCart: IteminCartType[] = currentUser?.cart || [];
    const newCart: productInTransaction[] = originalCart.map((item : IteminCartType) => {
      const { category, ...newItem } = item;
      return newItem;
    }); 
    const transactionObject: TransactionFormType = {
       userId: currentUser?._id || '',
       cardId: chosenCreditCard[0]._id,
       totalAmount: totalAmount,
       products: newCart,
       couponId: currentCoupon,
   }
   setisLoadingPayment(true);       
   const paymentResult: boolean = await PaymentAttempt(transactionObject);   
   setisLoadingPayment(false);       
   if(paymentResult) {
    setisAttempted(false);
    setisCouponValid(false);
    setCouponInputValue('');
    showToast('You can watch purchase details', 'success', 'Purchase Completed');
    navigation.navigate('PurchaseScreen', {totalAmount: totalAmount, cart: originalCart});
   }
   else{
    showToast('Please try again', 'error', 'Purchase Failed');
   }
    }
    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setKeyboardVisible(false);
          },
        );
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setKeyboardVisible(true);
          },
        );
  
    
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);

    return (
        <View style={[{backgroundColor: background}, styles.container]}>
                  <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
                        <TitleAndArrowBack text='Checkout' onPress={() => {navigation.goBack()}}/>
                        <ScrollView>

            {
                isLoadingPayment ? (<ActivityIndicator style={{marginTop: '15%'}} size={70}/> ) : (
                <View>
                <View style={styles.paymentMethodsCon}>
                    <Text style={{color: text.primary, padding: '3%', fontWeight: '600'}}>Payment Method</Text>
                    {
                        isEmptyCreditCardArray ? (
                            <View style={{marginTop: '5%', marginBottom: '5%'}}>
                            <StyledButton text='Add Credit Card' bigbutton/>
                            </View>
                        ) : (
                            <ScrollView style={styles.creditCardSV}>
                                {
                                    cards    
                                }
                            </ScrollView>
                        )
                    }
                </View>
                <View style={[styles.barrier, {backgroundColor: background, borderRadius: 8}]}/>
                <View style={styles.cartCarusell}>
                    <CartCarusell/>
                </View>
                <View style={styles.couponCompCon}>
                    <CouponComp
                    btnLabelText={btnLabelText}
                    isAttempted={isAttempted}
                    isLoading={isLoading}
                    handleCouponCheck={handleCouponCheck}
                    changeInputHandler={changeInputHandler}
                    isCouponValid={isCouponValid}
                    startValue={currentCoupon}/>
                </View>
                <View style={styles.totalAmountCon}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%'}}>
                        <Text style={{color: text.primary, fontWeight: '300'}}>Items</Text>
                        <Text style={{color: text.primary, fontWeight: '600'}}>{totalAmount}</Text>  
                    </View>
                    { isCouponValid && <View style={styles.coupondiscountcon}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%', marginTop: '2%'}}>
                    <Text style={{color: text.primary, fontWeight: '300'}}>Coupon</Text>
                    <Text style={{color: text.primary, fontWeight: '600'}}>{couponDiscountAmount}</Text>  
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%', marginTop: '2%'}}>
                    <Text style={{color: text.primary, fontWeight: '300'}}>Total</Text>
                      <Text style={{color: text.primary, fontWeight: '600'}}>{totalAmountToPay}</Text>  
                    </View>
                    </View>
                    }
                </View>
                <StyledButton text='Pay Now' bigbutton onPress={handlePayNow}/>
                </View>
                )
            }
</ScrollView>
{!isKeyboardVisible && <BottomNavbar />}
            </KeyboardAvoidingView>
            <Toast/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    paymentMethodsCon: {

    },
    creditCardSV: {
        height: 170
    },
    cartCarusell: {
        height: 150
    },
    barrier: {
        borderWidth: 1,
        width: '95%',
        alignSelf: 'center',
    },
    coupondiscountcon: {
        width: '100%',
        alignItems: 'center',
    },
    totalAmountCon: {
        width: '95%',
        alignItems: 'center',
    },  
    couponCompCon: {

    }
});
export default Checkout;