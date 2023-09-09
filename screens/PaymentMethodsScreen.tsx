import React, { useState, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView , Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CheckBox } from 'react-native-elements';
import { useDataContext } from '../context/DataContext';
import CreditCard from 'react-native-credit-card';
import Toast from 'react-native-toast-message';
import TitleAndArrowBack from '../components/UIComps/TitleAndArrowBack';
import StyledButton from '../components/UIComps/StyledButton';
import BottomNavbar from '../components/UIComps/BottomNavbar';
import { creditCardType } from '../interfaces/interfaces';
import { Icon } from 'react-native-elements';
import { ThemeContext } from '../context/ThemeContext';
interface PaymentMethodsScreenProps {
    navigation: StackNavigationProp<any, 'PaymentMethodsScreen'>;
}

const PaymentMethodsScreen: React.FC<PaymentMethodsScreenProps> = ({ navigation }) => {
    const { currentUser } = useDataContext();
    const [defaultCardIndex, setDefaultCardIndex] = useState<string | null>(null);
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors     
    const {changeDefaultCardAttempt, showToast, deleteCardAttempt} = useDataContext();
    const handleDefaultCardChange = async (cardId: string) => {
            const isDefaultCardChanged = await changeDefaultCardAttempt(cardId);
            if(isDefaultCardChanged){
                showToast("You can now purchase", 'success', 'Default Card Changed Succesfully');
            }
            else{
                showToast("your previos card is default", 'error', 'Default Card Failed');
            }
        
    };
    const handleDeleteCard = async (cardId: string) => {        
        if(currentUser){
            const isCardDeleted = await deleteCardAttempt(cardId, currentUser?._id);
            if(isCardDeleted){
                showToast("Card deleted succesffully", 'success', 'Deleted Successfully');
            }
            else{
                showToast("Card delete failed", 'error', 'please try again');
            }
        }
    }
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: background}]}>
            <View style={styles.titleCon}>
                <TitleAndArrowBack text='Payment Methods' onPress={() => navigation.goBack()} />
                <StyledButton smallbutton text='Add New' onPress={() => navigation.navigate('AddCreditCardScreen')} />
            </View>
            <ScrollView style={styles.scrollView}>
                {currentUser?.creditCards.map((card : creditCardType, index) => (
                    
                    <View key={card._id}
                    
                    style={styles.cardContainer}>
                        <CreditCard
                            type={card.cardType}
                            number={card.cardNumber}
                            name={card.cardholderName}
                            expiry={card.expirationDate}
                            cvc={card.cvv}
                        />
                        <View style={styles.trashiconCon}>
                        <Icon style={styles.trashicon} name="settings" size={30} onPress={() => {handleDeleteCard(card._id)}} color={text.primary}/>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CheckBox
                            checked={card.isDefault}
                            onPress={() => handleDefaultCardChange(card._id)}
                        />
                        <Text style={{color: text.primary}}>Use as default payment credit card</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <BottomNavbar />
            <Toast/>
        </SafeAreaView>
    );
};

export default PaymentMethodsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    trashicon: {
    },
    titleCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 16,
    },
    trashiconCon: {
        position: 'absolute',
        bottom: 40,
        right: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        padding: '2%',
        borderRadius: 50
    },
    scrollView: {
        flex: 1,
        marginBottom: '35%',
        width: '90%',
        alignSelf: 'center',
        marginTop: '10%'
    },
    cardContainer: {
        marginBottom: 16,
    },
    cardImageStyle: {
        resizeMode: 'contain', // Adjust as needed
    },
});
