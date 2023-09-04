import react, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import TitleAndArrowBack from '../components/UIComps/TitleAndArrowBack';
import { useDataContext } from '../context/DataContext';
import StyledButton from '../components/UIComps/StyledButton';
import { ScrollView } from 'react-native-gesture-handler';
import CreditCard from 'react-native-credit-card';
import { creditCardType } from '../interfaces/interfaces';
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import { StackNavigationProp } from '@react-navigation/stack';
import CreditCardAbstractComp from '../components/UIComps/CreditCardAbstractComp';
import BottomNavbar from '../components/UIComps/BottomNavbar';
import CartCarusell from '../components/UIComps/CartCaruselle';
const Checkout: React.FC = () => {
    const {theme} = useTheme();
    const {currentUser} = useDataContext();
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [localCheckedVal, setlocalCheckedVal] = useState<boolean>();
    const [creditCards, setcreditCards] = useState<creditCardType[]>(currentUser?.creditCards || []);
    const [isEmptyCreditCardArray, setisEmptyCreditCardArray] = useState<boolean>(currentUser?.creditCards && currentUser?.creditCards.length > 0 ? false : true);

    const cards = creditCards.map((creditCard: creditCardType) => {
        return(
            <CreditCardAbstractComp
            key={creditCard._id}
            creditCard={creditCard}
            onPress={handlecheckboxPress}
            isChecked={creditCard.isDefault}
            />
        )
    })



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


      


    return (
        <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
            <TitleAndArrowBack text='Checkout' onPress={() => {navigation.goBack()}}/>
            <View style={styles.paymentMethodsCon}>
                <Text style={{color: theme.textColor, padding: '3%'}}>Payment Method</Text>
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
            <BottomNavbar/>
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
        height: 200
    },
    cartCarusell: {
        height: 200
    },
    barrier: {
        borderWidth: 1,
        width: '95%',
        alignSelf: 'center',
    }
});
export default Checkout;