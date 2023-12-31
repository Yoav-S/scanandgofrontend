import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView , Text, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CheckBox } from 'react-native-elements';
import { useDataContext } from '../context/DataContext';
import CreditCard from 'react-native-credit-card';
import Toast from 'react-native-toast-message';
import TitleAndArrowBack from '../components/UIElements/TitleAndArrowBack';
import StyledButton from '../components/UIElements/StyledButton';
import BottomNavbar from '../components/UIElements/BottomNavbar';
import { creditCardType } from '../interfaces/interfaces';
import { Icon } from 'react-native-elements';
import { ThemeContext } from '../context/ThemeContext';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import activityIndicatorAnimation from '../assets/activitiindicator.json'
import emptyCreditCardAnimation from '../assets/creditCardAnimation.json'
import LottieView from 'lottie-react-native';
interface PaymentMethodsScreenProps {
    navigation: StackNavigationProp<any, 'PaymentMethodsScreen'>;
}
const { width, height } = Dimensions.get('window');

const PaymentMethodsScreen: React.FC<PaymentMethodsScreenProps> = ({ navigation }) => {
    const { currentUser } = useDataContext();
    const [defaultCardIndex, setDefaultCardIndex] = useState<string | null>(null);
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background, loadingBackground } = theme.colors  
    const {changeDefaultCardAttempt, showToast,  setisAreYouSureModalOpen,  setcardId} = useDataContext();
    const [isLoading, setisLoading] = useState<boolean>(false);
    const handleDefaultCardChange = async (cardId: string) => {
            setisLoading(true);
            const isDefaultCardChanged = await changeDefaultCardAttempt(cardId);
            setisLoading(false);
            if(isDefaultCardChanged){
                showToast("You can now purchase", 'success', 'Default Card Changed Succesfully');
            }
            else{
                showToast("your previos card is default", 'error', 'Default Card Failed');
            }
        
    };
    const activitiIndicatorAnimation = (<LottieView
        style={{width: 21, height: 21, alignSelf: 'center'}}
        speed={1} 
        source={activityIndicatorAnimation}
        autoPlay
        loop={true}
        />)

        const emptyCreditCardAnimationObject = (<LottieView
            style={{width: 250, height: 250, alignSelf: 'center', marginTop: '10%'}}
            speed={1} 
            source={emptyCreditCardAnimation}
            autoPlay
            loop={true}
            />)


    return (
        <SafeAreaView style={[styles.container, {backgroundColor: background}]}>
                <TitleAndArrowBack text='Payment Methods' onPress={() => navigation.goBack()} />
                <View style={{alignSelf: 'flex-end', padding: '3%'}}>
                <StyledButton disabled={isLoading} smallbutton text='Add New' onPress={() => navigation.navigate('AddCreditCardScreen')} />

                </View>
                {
                    currentUser && currentUser.creditCards.length > 0 ? (            <ScrollView style={styles.scrollView}>
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
                                <FontAwesomeIcon 
                                style={styles.trashicon}
                                name="trash" 
                                size={30} 
                                color={'white'}             
                                onPress={() => {
                                    if(isLoading)return;
                                    setcardId(card._id);
                                    setisAreYouSureModalOpen(true);
                                }}
                                />
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', padding: '5%', justifyContent: 'space-between', width: width * 0.75}}>
                                    {
                                        isLoading ? (<View style={{ backgroundColor: 'black', borderRadius: 50}}>{activitiIndicatorAnimation}</View>) : (
                                            <View style={{position: 'relative'}}>

                                        <CheckBox
                                        containerStyle={styles.defaultCheckbox}
                                            checked={card.isDefault}
                                            onPress={() => {
                                                if(card.isDefault){return;}
                                                handleDefaultCardChange(card._id)}}
                                        />
                                                                                    </View>
)
                                    }
        
                                <Text style={{color: text.primary, fontWeight: 'bold'}}>Use as default payment method</Text>
                                </View>
                                <View style={[styles.barrier, {borderColor: text.secondary, backgroundColor: text.secondary}]}/>
                            </View>
                        ))}
                    </ScrollView>) : (<View>
{emptyCreditCardAnimationObject}
<Text style={{color: text.primary, textAlign: 'center', marginTop: '5%', fontSize: 18, fontWeight: '600'}}>No Credit Cards Yet</Text>
                    </View>)
                }


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
        width: 30,
        textAlign: 'center',
    },
    defaultCheckbox: {
        position: 'absolute',
        top: height * -0.035,
        left: width * -0.05
    },
    titleCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    barrier: {
        borderWidth: 0.1,
        marginBottom: '5%'
    },
    trashiconCon: {
        position: 'absolute',
        bottom: 55,
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
