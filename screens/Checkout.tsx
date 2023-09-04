import react, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import TitleAndArrowBack from '../components/UIComps/TitleAndArrowBack';
import { useDataContext } from '../context/DataContext';
import StyledButton from '../components/UIComps/StyledButton';
import { ScrollView } from 'react-native-gesture-handler';
import CreditCard from 'react-native-credit-card';
import { creditCardType } from '../interfaces/interfaces';
import { useNavigation, useRoute, RouteProp  } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import { StackNavigationProp } from '@react-navigation/stack';
import CreditCardAbstractComp from '../components/UIComps/CreditCardAbstractComp';
import BottomNavbar from '../components/UIComps/BottomNavbar';
import CartCarusell from '../components/UIComps/CartCaruselle';
import CouponComp from '../components/UIComps/CouponComp';
type YourNavigatorParamList = {
    CheckoutScreen: { totalAmount: number }; // Define the parameter type here
    // ... other screens
  };
  
const Checkout: React.FC = () => {
    const route = useRoute<RouteProp<YourNavigatorParamList, 'CheckoutScreen'>>();
    const totalAmount = route.params.totalAmount;    const {theme} = useTheme();    
    const {currentUser, showToast, verifyCouponAttempt} = useDataContext();
    const [isCouponValid, setisCouponValid] = useState<boolean>(false);
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [isAttempted, setisAttempted] = useState<boolean>(false);
    const [currentCouponInputValue, setCouponInputValue] = useState<string>('');
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [localCheckedVal, setlocalCheckedVal] = useState<boolean>();
    const [couponDiscountAmount, setcouponDiscountAmount] = useState<number>(0);
    const [creditCards, setcreditCards] = useState<creditCardType[]>(currentUser?.creditCards || []);
    const [btnLabelText, setBtnLabelText] = useState<string>(isAttempted && !isCouponValid ? 'Invalid' : isAttempted && isCouponValid ? 'Verified' : 'Apply')

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
        setCouponInputValue(coupon);
        console.log(coupon);
    }  
    const handleCouponCheck = async () => {
        const isValid = await verifyCouponAttempt(currentCouponInputValue)
        setisLoading(true);
        setisAttempted(true);
        setTimeout(() => {
            setisLoading(false);
        }, 2000)


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

    const handlePayNow = () => {

    }



    return (
        <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
            <TitleAndArrowBack text='Checkout' onPress={() => {navigation.goBack()}}/>
            <View style={styles.paymentMethodsCon}>
                <Text style={{color: theme.textColor, padding: '3%', fontWeight: '600'}}>Payment Method</Text>
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
            <View style={[styles.barrier, {backgroundColor: theme.backgroundColor, borderRadius: 8}]}/>
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
                isCouponValid={isCouponValid}/>
            </View>
            <View style={styles.totalAmountCon}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%'}}>
                    <Text style={{color: theme.textColor, fontWeight: '300'}}>Items</Text>
                    <Text style={{color: theme.textColor, fontWeight: '600'}}>{totalAmount}</Text>  
                </View>
                { isCouponValid && <View style={styles.coupondiscountcon}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%', marginTop: '2%'}}>
                <Text style={{color: theme.textColor, fontWeight: '300'}}>Coupon</Text>
                <Text style={{color: theme.textColor, fontWeight: '600'}}>{couponDiscountAmount}</Text>  
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%', marginTop: '2%'}}>
                <Text style={{color: theme.textColor, fontWeight: '300'}}>Total</Text>
                  <Text style={{color: theme.textColor, fontWeight: '600'}}>{totalAmount - couponDiscountAmount}</Text>  
                </View>
                </View>
                }
            </View>
            <StyledButton text='Pay Now' bigbutton onPress={handlePayNow}/>
            <BottomNavbar/>
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
        height: 200
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