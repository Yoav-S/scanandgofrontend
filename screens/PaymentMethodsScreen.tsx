import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CheckBox } from 'react-native-elements';
import { useDataContext } from '../context/DataContext';
import CreditCard from 'react-native-credit-card';
import Toast from 'react-native-toast-message';
import TitleAndArrowBack from '../components/UIComps/TitleAndArrowBack';
import StyledButton from '../components/UIComps/StyledButton';
import BottomNavbar from '../components/UIComps/BottomNavbar';
import { useTheme } from '../context/ThemeContext';
import { creditCardType } from '../interfaces/interfaces';

interface PaymentMethodsScreenProps {
    navigation: StackNavigationProp<any, 'PaymentMethodsScreen'>;
}

const PaymentMethodsScreen: React.FC<PaymentMethodsScreenProps> = ({ navigation }) => {
    const { currentUser } = useDataContext();
    const [defaultCardIndex, setDefaultCardIndex] = useState<string | null>(null);
    const {theme} = useTheme();
    const {changeDefaultCardAttempt, showToast} = useDataContext();
    const handleDefaultCardChange = async (cardId: string) => {
            const isDefaultCardChanged = await changeDefaultCardAttempt(cardId);
            if(isDefaultCardChanged){
                showToast("You can now purchase", 'success', 'Default Card Changed Succesfully');
            }
            else{
                showToast("your previos card is default", 'error', 'Default Card Failed');
            }
        
    };

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
            <View style={styles.titleCon}>
                <TitleAndArrowBack text='Payment Methods' onPress={() => navigation.goBack()} />
                <StyledButton smallbutton text='Add New' onPress={() => navigation.navigate('AddCreditCardScreen')} />
            </View>
            <ScrollView style={styles.scrollView}>
                {currentUser?.creditCards.map((card : creditCardType, index) => (
                    <View key={index}
                    style={styles.cardContainer}>
                        <CreditCard
                            type={card.cardType}
                            number={card.cardNumber}
                            name={card.cardholderName}
                            expiry={card.expirationDate}
                            cvc={card.cvv}
                        />
                        <CheckBox
                            checked={card.isDefault}
                            onPress={() => handleDefaultCardChange(card.cardId)}
                        />
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
    titleCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 16,
    },
    scrollView: {
        flex: 1,
        marginBottom: '35%',
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
