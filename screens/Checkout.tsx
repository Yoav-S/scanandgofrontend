import react, {useState} from 'react';
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
const Checkout: React.FC = () => {
    const {theme} = useTheme();
    const {currentUser} = useDataContext();
    const navigation = useNavigation<StackNavigationProp<any>>();

    const [isEmptyCreditCardArray, setisEmptyCreditCardArray] = useState<boolean>(currentUser?.creditCards && currentUser?.creditCards.length > 0 ? false : true);
    return (
        <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
            <TitleAndArrowBack text='Checkout' onPress={() => {navigation.goBack()}}/>
            <View style={styles.paymentMethodsCon}>
                <Text style={{color: theme.textColor, padding: '3%'}}>Payment Method</Text>
                {
                    isEmptyCreditCardArray ? (
                        <StyledButton text='Add Credit Card' bigbutton/>
                    ) : (
                        <ScrollView>
                            {
                                currentUser?.creditCards.map((creditCard: creditCardType) => {
                                    return(
                                        <CreditCardAbstractComp
                                        key={creditCard._id}
                                        creditCard={creditCard}
                                        />
                                    )
                                })
                            }
                        </ScrollView>
                    )
                }
            </View>
            <View style={[styles.barrier, {backgroundColor: theme.backgroundColor, borderRadius: 8}]}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    paymentMethodsCon: {

    },
    barrier: {
        borderWidth: 1,
        width: '95%',
        alignSelf: 'center',
    }
});
export default Checkout;