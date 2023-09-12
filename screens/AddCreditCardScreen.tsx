import React, {useState , useContext, useEffect} from "react";
import {View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, TextInput, Platform, Keyboard} from 'react-native'
import TitleAndArrowBack from "../components/UIComps/TitleAndArrowBack";
import BottomNavbar from "../components/UIComps/BottomNavbar";
import { Formik } from 'formik';
import * as Yup from 'yup';
import CreditCard from 'react-native-credit-card';
import StyledButton from "../components/UIComps/StyledButton";
import { cardNumberSchema, cardholderSchema, cvvSchema, expirationDateSchema, isDefaultSchema, cardTypeSchema,  } from "../messages/Statements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { CheckBox } from "react-native-elements";
import DropDownPicker from 'react-native-dropdown-picker';
import FormInput from "../components/UIComps/FormInput";
import { useDataContext } from "../context/DataContext";
import { creditCardFormType } from "../interfaces/interfaces";
import { ScrollView } from "react-native-gesture-handler";
import { ThemeContext } from "../context/ThemeContext";

const validationSchema = Yup.object().shape({
cvv: cvvSchema,
isDefault: isDefaultSchema,
expirationDate: expirationDateSchema,
cardholderName: cardholderSchema,
cardNumber: cardNumberSchema,
cardType: cardTypeSchema,
})

const AddCreditCardScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<any, 'AddCreditCardScreen'>>();
    const [open, setOpen] = useState<boolean>(false);
    const [isDefault, setisDefault] = useState<boolean>(false);
    const [shouldAddSlash, setShouldAddSlash] = useState<boolean>(true);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const { theme, buttonTheme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors 
    const {addCreditCardAttempt, showToast, setisMessageModalVisible} = useDataContext();
    const [allCategoriesValues, setAllCategoriesValues] = useState<{ label: string; value: string }[]>([
        { label: 'discover', value: 'discover' },
        { label: 'mastercard', value: 'mastercard' },
        { label: 'visa', value: 'visa' },
        { label: 'american express', value: 'amex' },
    ]);
    const [currentCategoryValue, setCurrentCategoryValue] = useState<string>('');
    const [expirationDateInputPlaceholder, setExpirationDateInputPlaceholder] = useState<string>("Expiration Date");




    const handleFormSubmit = async (values: {cardType: string, cardNumber: string, cardholderName: string, expirationDate: string, cvv: string, isDefault: boolean}) => {
        setisMessageModalVisible(true);
        console.log(values);
        
        const creditCardForm: creditCardFormType = values;
        const [isAdded, message] = await addCreditCardAttempt(creditCardForm);
        setisMessageModalVisible(false);
        if(isAdded){
            showToast('you can use it now', 'success', 'Credit card added successfully')
        }
        else{
            showToast(message || 'Something went wrong', 'error', 'Credit card added successfully');
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
                    <View style={styles.formikCon}>
                    <Formik
                        initialValues={{cardType: "", cardNumber: "", cardholderName: "", expirationDate: "", cvv: "", isDefault: false}}
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

                        <FormInput errorMessage={errors.cardNumber} setInput={handleChange('cardNumber')} label="Card Number" numeric/>
                        <FormInput errorMessage={errors.cardholderName} setInput={handleChange('cardholderName')} label="Card Holder Name"/>
                        <View style={styles.expireincvvCon}>
                          <View>
                        <TextInput
                          style={styles.dateInput}
                          onChangeText={(text) => {
                            if (text.length === 2 && shouldAddSlash) {
                              text += '/';
                              setShouldAddSlash(false);
                            } else if (text.length === 3 && text.charAt(2) !== '/') {
                              text = text.substring(0, 2) + '/' + text.charAt(2);
                              setShouldAddSlash(false);
                            } else if (text.length === 2 && text.charAt(1) === '/') {
                              setShouldAddSlash(true);
                            }
                        
                            // Split the text into mm and yy parts
                            const [mm, yy] = text.split('/');
                        
                            let updatedMM = mm;
                            let updatedYY = yy;
                        
                            // Check if mm is greater than 12 and limit it to 12
                            if (mm && parseInt(mm) > 12) {
                              updatedMM = '12';
                            }
                        
                            // Check if yy is greater than 43 and limit it to 43
                            if (yy && parseInt(yy) > new Date().getFullYear() + 20 - 2000) {
                              updatedYY = (new Date().getFullYear() + 20 - 2000).toString();
                            }
                        
                            const formattedText = updatedMM + (updatedYY ? '/' + updatedYY : '');
                        
                            handleChange('expirationDate')(formattedText);
                          }}
                          onBlur={() => setShouldAddSlash(true)}
                          placeholder={expirationDateInputPlaceholder}
                          value={values.expirationDate}
                          keyboardType="numeric"
                          maxLength={5}
                          onFocus={() => {setExpirationDateInputPlaceholder("MM/YY")}}
                        />
                        {!isValid && <Text style={{color: 'red', fontWeight: 'bold', width: 130}}>{errors.expirationDate}</Text>}


                        </View>

               <View>

                        <FormInput errorMessage={errors.cvv} setInput={handleChange('cvv')} label="CVV" numeric/>
                      
                        </View>
                        </View>

                    <View style={[ { width: '90%', alignSelf: 'center', height: 90 }]}>

                                <DropDownPicker
                                    listMode="SCROLLVIEW"
                                    placeholder="Select credit card"
                                    dropDownContainerStyle={{height: 200, backgroundColor: buttonTheme.buttonMain.background, zIndex: 10}}
                                    style={{
                                        
                                        backgroundColor: background,
                                        borderWidth: 1,
                                        paddingHorizontal: 12,
                                        borderRadius: 5,
                                        marginTop: '6%',
                                        zIndex: 10,
                                    }}
                                    containerStyle={{zIndex: 10}}
                                    textStyle={{color: text.primary}}
                                    open={open}
                                    value={currentCategoryValue}
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
                        title={"set as default"} 
                        checked={isDefault}
                        textStyle={{color: text.primary}}
                        
                        containerStyle={{borderWidth: 0,backgroundColor: background}}
                        onPress={() => {
                        setisDefault(!isDefault)
                        handleChange('isDefault')
                        }}/>        
                        <View style={{marginTop: '10%'}}>
                            <StyledButton onPress={handleSubmit} text='Save' bigbutton disabled={!isValid || !dirty}/>
                            </View>
                            </ScrollView>
                          </>
                        )}
                      </Formik>
                    </View>
                    {!isKeyboardVisible && <BottomNavbar />}
</KeyboardAvoidingView>
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
    dateInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        width: 130
      },
      
    expireincvvCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center'

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