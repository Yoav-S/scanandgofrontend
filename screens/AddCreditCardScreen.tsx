import React, {useState , useContext, useEffect, useRef } from "react";
import {View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, TextInput, Platform, Keyboard, Dimensions, TouchableOpacity} from 'react-native'
import TitleAndArrowBack from "../components/UIElements/TitleAndArrowBack";
import BottomNavbar from "../components/UIElements/BottomNavbar";
import { Formik } from 'formik';
import * as Yup from 'yup';
import CreditCard from 'react-native-credit-card';
import StyledButton from "../components/UIElements/StyledButton";
import { cardNumberSchema, cardholderSchema, cvvSchema, expirationDateSchema, isDefaultSchema, cardTypeSchema,  } from "../messages/Statements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { CheckBox } from "react-native-elements";
import DropDownPicker from 'react-native-dropdown-picker';
import FormInput from "../components/UIElements/FormInput";
import { useDataContext } from "../context/DataContext";
import { creditCardFormType } from "../interfaces/interfaces";
import { ScrollView } from "react-native-gesture-handler";
import { ThemeContext } from "../context/ThemeContext";
import { Icon } from 'react-native-elements';
import Toast from "react-native-toast-message";
import DatePicker from "react-native-date-picker";
const validationSchema = Yup.object().shape({
cvv: cvvSchema,
isDefault: isDefaultSchema,
expirationDate: expirationDateSchema,
cardholderName: cardholderSchema,
cardNumber: cardNumberSchema,
cardType: cardTypeSchema,
})
const screen = Dimensions.get('window');

const AddCreditCardScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<any, 'AddCreditCardScreen'>>();
    const [open, setOpen] = useState<boolean>(false);
    const [isDefault, setisDefault] = useState<boolean>(false);
    const [shouldAddSlash, setShouldAddSlash] = useState<boolean>(true);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const { theme, buttonTheme } = useContext(ThemeContext);
    const [expireinDate, setExpireinDate] = useState('');
    const { primary, secondary, text, background } = theme.colors 
    const {addCreditCardAttempt, showToast, setisMessageModalVisible, currentUser} = useDataContext();
    const [allCategoriesValues, setAllCategoriesValues] = useState<{ label: string; value: string }[]>([
        { label: 'Discover', value: 'discover' },
        { label: 'Mastercard', value: 'mastercard' },
        { label: 'Visa', value: 'visa' },
        { label: 'American Express', value: 'amex' },
    ]);
    const [currentCategoryValue, setCurrentCategoryValue] = useState<string>('');
    const [expirationDateInputPlaceholder, setExpirationDateInputPlaceholder] = useState<string>("Expiration Date");

    const handleFormSubmit = async (values: {cardType: string, cardNumber: string, cardholderName: string, expirationDate: string, cvv: string}) => {
        setisMessageModalVisible(true);        
        console.log(values);
        const creditCardForm: creditCardFormType = values;
        creditCardForm.isDefault = isDefault;
        const [isAdded, message] = await addCreditCardAttempt(creditCardForm);
        setisMessageModalVisible(false);
        if(isAdded){
            showToast('you can use it now', 'success', 'Credit card added successfully')
            setTimeout(() => {
              navigation.navigate('PaymentMethodsScreen')
            }, 2000)
        }
        else{
            showToast(message || 'Something went wrong', 'error', 'Failed to add credit card');
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
        <SafeAreaView style={[{backgroundColor: background},styles.container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
                <TitleAndArrowBack text="Add new credit card" onPress={() => {navigation.goBack()}}/>
                <ScrollView>
                    <View style={[styles.formikCon, {height: screen.height * 0.8}]}>
                    <Formik
                        initialValues={{cardType: "", cardNumber: "", cardholderName: "", expirationDate: "", cvv: "", isDefault: isDefault}}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                      >
                        
                        {({ handleChange, handleSubmit, values, errors, isValid, dirty, setFieldValue, touched }) => (
                          <>
                          <ScrollView>
                        <CreditCard
                        style={styles.card}
                        type={values.cardType}
                        number={values.cardNumber}
                        name={values.cardholderName}
                        expiry={values.expirationDate}
                        cvc={values.cvv}
                        /></ScrollView>
                                                <ScrollView style={[styles.cardContainer,]}>

                        <FormInput onPress={() => {handleChange('cardNumber')('')}} value={values.cardNumber} startValue={values.cardNumber} errorMessage={errors.cardNumber} setInput={handleChange('cardNumber')} label="Card Number" numeric/>
                        <FormInput onPress={() => {handleChange('cardholderName')('')}} value={values.cardholderName} startValue={values.cardholderName} errorMessage={errors.cardholderName} setInput={handleChange('cardholderName')} label="Card Holder Name"/>
                        <View style={styles.expireincvvCon}>                         
                        <FormInput
                          value={values.expirationDate}
                          label="Expirein"            
                          numeric    
                          startValue={values.expirationDate}    
                          setInput={(text: string)=>{
                            handleChange('expirationDate')(text);
                            setExpireinDate(text);
                          }}     
                        />
                        <FormInput 
                        value={values.cvv} startValue={values.cvv} 
                        setInput={handleChange('cvv')} 
                        label="CVV" 
                        numeric
                        />
                      
                        </View>

                    <View style={[ { width: screen.width * 0.8, alignSelf: 'center', height: 90 }]}>

                                <DropDownPicker
                                    listMode="SCROLLVIEW"
                                    placeholder="Select credit card"
                                    dropDownContainerStyle={{height: 200, backgroundColor: buttonTheme.buttonMain.background, zIndex: 10}}
                                    style={{
                                        
                                        backgroundColor: background,
                                        borderRadius: 5,
                                        zIndex: 10,
                                        borderColor: currentCategoryValue !== '' ? 'green' : text.secondary
                                    }}
                                    textStyle={{color: text.primary}}
                                    containerStyle={{zIndex: 10}}
                                    open={open}
                                    
                                    value={values.cardNumber && values.cardNumber[0] === '4' ? 'visa' : currentCategoryValue}
                                    items={allCategoriesValues}
                                    setOpen={setOpen}
                                    onChangeValue={(category) => {
                                    setCurrentCategoryValue(category?.toString() || '');
                                    handleChange('cardType')(category?.toString() || '');}}
                                    setValue={setCurrentCategoryValue}
                                    setItems={setAllCategoriesValues}
                                />
                    </View>
                        <CheckBox 
                        title={"set as default payment method"} 
                        checked={isDefault}
                        textStyle={{color: text.primary}}
                        
                        containerStyle={{borderWidth: 0,backgroundColor: background}}
                        onPress={() => {
                        setisDefault(!isDefault)
                      }
                      }
                        />        
                        <View style={{marginTop: '10%'}}>
                            <StyledButton onPress={handleSubmit} text='Save' bigbutton disabled={!isValid || !dirty}/>
                            </View>
                            </ScrollView>
                          </>
                        )}
                      </Formik>
                    </View>
                    </ScrollView>
                    {!isKeyboardVisible && <BottomNavbar />}
</KeyboardAvoidingView>
<Toast/>
        </SafeAreaView>
    )
}
export default AddCreditCardScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainCon: {

    },
    datemodal: {
      width: screen.width * 0.4,
      backgroundColor: 'red'
    },
    dateInput: {
        borderRadius: 5,
        marginBottom: 10,
        borderBottomWidth: 1,
        width: 120,
      },
      
    expireincvvCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '92%',
    },
    cardContainer: {
        marginBottom: "5%",
        width: '90%',
        height: 300,
        marginTop: '5%'
    },
    cardCon: {

    },
    formikCon: {
        margin: '2%',
        alignItems: 'center',
    },
    card: {
        alignSelf: 'center',
        height: 200
    }
})