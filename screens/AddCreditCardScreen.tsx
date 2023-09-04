import React, {useState} from "react";
import {View, Text, StyleSheet, SafeAreaView} from 'react-native'
import TitleAndArrowBack from "../components/UIComps/TitleAndArrowBack";
import BottomNavbar from "../components/UIComps/BottomNavbar";
import { useTheme } from '../context/ThemeContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CreditCard from 'react-native-credit-card';
import StyledButton from "../components/UIComps/StyledButton";
import { cardNumberSchema, cardholderSchema, cvvSchema, expirationDateSchema, isDefaultSchema, cardTypeSchema } from "../messages/Statements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { CheckBox } from "react-native-elements";
import DropDownPicker from 'react-native-dropdown-picker';
import FormInput from "../components/UIComps/FormInput";
import { useDataContext } from "../context/DataContext";
import { ScrollView } from "react-native-gesture-handler";
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
    const [allCategoriesValues, setAllCategoriesValues] = useState<{ label: string; value: string }[]>([
        { label: 'dankort', value: 'dankort' },
        { label: 'discover', value: 'discover' },
        { label: 'mastercard', value: 'mastercard' },
        { label: 'visa', value: 'visa' },
        { label: 'amex', value: 'amex' },
    ]);
    const [currentCategoryValue, setCurrentCategoryValue] = useState<string>('');
    const {theme} = useTheme();
    const handleFormSubmit = async (values: {cardType: string, cardNumber: string, cardholderName: string, expirationDate: string, cvv: string, isDefault: boolean}) => {
        
    }
    
    return (
        <SafeAreaView style={[{backgroundColor: theme.backgroundColor},styles.container]}>
                <TitleAndArrowBack text="Add new credit card" onPress={() => {navigation.goBack()}}/>
                    <View style={styles.formikCon}>

                    <Formik
                        initialValues={{cardType: "", cardNumber: "", cardholderName: "", expirationDate: "", cvv: "", isDefault: false}}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                      >
                        
                        {({ handleChange, handleSubmit, values, errors, isValid, dirty, setFieldValue, touched }) => (
                          <>
                        <View style={styles.cardContainer}>
                        <CreditCard
                        type={values.cardType}
                        number={values.cardNumber}
                        name={values.cardholderName}
                        expiry={values.expirationDate}
                        cvc={values.cvv}
                        />
                        </View>
                        <FormInput errorMessage={errors.cardNumber} setInput={handleChange('cardNumber')} label="Card Number" numeric/>
                        <FormInput errorMessage={errors.cardholderName} setInput={handleChange('cardholderName')} label="Card Holder Name"/>
                        <View style={styles.expireincvvCon}>
                        <FormInput errorMessage={errors.expirationDate} setInput={handleChange('expirationDate')} label="Exp Date"/>
                        <FormInput errorMessage={errors.cvv} setInput={handleChange('cvv')} label="Cvv" numeric/>
                        </View>
                        <DropDownPicker
                        style={{width: 300, alignSelf: 'center', marginTop: '5%'}}
                        open={open}
                        value={currentCategoryValue}
                        items={allCategoriesValues}
                        onChangeValue={(category) => {
                        setCurrentCategoryValue(category?.toString() || '');
                        handleChange('cardType')(category?.toString() || '');}}
                        setOpen={setOpen}
                        setValue={setCurrentCategoryValue}
                        setItems={setAllCategoriesValues}
                        />

                        <CheckBox 
                        style={{marginTop: '5%'}}
                        title={"set as default"} 
                        checked={isDefault}
                        onPress={() => {
                        setisDefault(!isDefault)
                        handleChange('isDefault')
                        }}/>        
                            <StyledButton onPress={handleSubmit} text='Save' bigbutton disabled={!isValid || !dirty}/>
                          </>
                        )}
                      </Formik>
                    </View>
                <BottomNavbar/>
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
    expireincvvCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center'
    },
    cardContainer: {
        marginBottom: "5%",
        flex: 1,
        width: '90%'
    },
    cardCon: {

    },
    formikCon: {
        margin: '2%'
    },
    card: {
    }
})