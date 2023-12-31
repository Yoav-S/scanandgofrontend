import React, {useContext, useEffect, useState} from "react";
import { StyleSheet, View , Text,Dimensions} from "react-native";
import { FormInputType } from "../../interfaces/interfaces";
import { ThemeContext } from "../../context/ThemeContext";
import { ErrorMessage } from "formik";
import { Icon } from 'react-native-elements';
import { BorderlessButton } from "react-native-gesture-handler";
import { Input } from '@rneui/themed';
import {Input as NativeBaseInput} from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute, RouteProp  } from "@react-navigation/native";
const { width, height } = Dimensions.get('window');

const FormInput: React.FC<FormInputType> = (props) => {
  const route = useRoute();
  const [previusText, setPreviusText] = useState('');
  const { theme } = useContext(ThemeContext);
  const { text, background, inputBackground } = theme.colors   
  const [isSecureText, setisSecureText] = useState<boolean>(true);


  const onChangeTextHandler = (text: string) => {
    if (props.label === 'Expirein') {    
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      
      if(text.length === 5){
        let mm: string = text.substring(0,2);
        let yy: string = text.substring(3,5);
        if(Number(yy) > Number(currentYear.toString().substring(2,4)) + 20){
          const newYY: number = Number(currentYear.toString().substring(2,4)) + 20;
          const stringnewYY: string = newYY.toString();
          const newText: string = text.substring(0,3) + stringnewYY;
          setPreviusText(newText);
          props.setInput(newText);
          return;
        }
        else if(Number(yy) < Number(currentYear.toString().substring(2,4))){
          if(Number(mm) >= Number(currentMonth)){
            const newYY: number = Number(currentYear.toString().substring(2,4));
            const newText: string = text.substring(0,3) + newYY;
            setPreviusText(newText);
            props.setInput(newText);
            return;

          }
          else{
            const newMM: string = currentMonth.toString();
            const newYY: number = Number(currentYear.toString().substring(2,4));
            const newText: string = newMM + '/' + newYY;
            setPreviusText(newText);
            props.setInput(newText);
            return;

          }
        }
        else if(Number(yy) === Number(currentYear.toString().substring(2,4)) && Number(mm) < Number(currentMonth)){
          mm = currentMonth.toString();
          const newText: string = mm + text.substring(2,5);
          setPreviusText(newText);
          props.setInput(newText);
          return;

        }
        else{
          setPreviusText(text);
          props.setInput(text);
          return;

        }
      }
      else if(text.length === 4){
        let yearDecade: string = currentYear.toString()[0];
        let twoyearsDecade: number = Number(yearDecade) + 2;
        let stringTwoYearsDecade: string = twoyearsDecade.toString();
        if(Number(text[3]) < Number(yearDecade)){          
          const newText = text.substring(0,3) + yearDecade;
          setPreviusText(newText);
          props.setInput(newText);
          return;

        }
        else if(Number(text[3]) > Number(Number(yearDecade) + 2)){ 
          const newText = text.substring(0,3) + stringTwoYearsDecade
          setPreviusText(newText);
          props.setInput(newText);
          return;

        }
        else{
          setPreviusText(text);
          props.setInput(text);
          return;

        }
      }
      else if(text.length < previusText.length){        
        if(previusText.length === 3){
          setPreviusText(text[0]);
          props.setInput(text[0]);
          return;

        }
        else{
          setPreviusText(text);
          props.setInput(text);
          return;

        }
      }
      else if(text.length === 2 && (text.length > previusText.length)){
        let localText: string = text;
        if(Number(text) > 12){
          localText = '12';
        }
        setPreviusText(localText + '/');
        props.setInput(localText + '/');
        return;
      }
      else{
        setPreviusText(text);
        props.setInput(text);
        return;
      }
    } 



    else if (props.label === 'Card Holder Name') {
      props.setInput(text.toUpperCase());
    } 

    else {
      props.setInput(text);
    }

  };
  


  const clearInput = () => {
    props.setInput(""); // Clear the input
  };
  
  return (
    <View style={{marginTop: '1%', marginBottom: '10%'}}>
      <View style={{flexDirection: 'row', alignSelf: 'center',}}>
    <NativeBaseInput 
      onPressIn={() => {props.onPress && props.onPress()}}
      variant={route.name === 'Login' || route.name === 'Signup' ? 'filled' : 'Outline'}
      value={props.startValue}
      width={props.label === "CVV" || props.label === 'Expirein' ? 
      width * 0.35 : props.label === 'Enter Coupon' ? 
      185 : width * 0.85}
      borderRadius={12}
      backgroundColor={inputBackground}
      borderWidth={0}
      padding={'4%'}
      style={[{
      marginBottom:props.label === 'CVV' ? '1%' : '1%',
      color: text.primary,             
      }, styles.textInput]}
      keyboardType={props.numeric ? 'number-pad' : 'default'}
      leftElement={
        (!props.errorMessage && props.startValue !== '' && props.label !== 'Enter Coupon')  ? 
        <Icon style={{marginLeft: '2%'}} color={'green'} type={"ionicon"} name="checkmark-done-circle-outline" size={20}/> : props.label === 'Enter Coupon' ? <View style={{width: 0}}/> :<View style={{width: 20, marginLeft: '2%'}}/>
      }
      rightElement={
        <View style={{flexDirection: 'row', alignItems: 'center', width: props.label !== 'CVV'  && props.label !== 'Expirein' ? width * 0.15 : 0, justifyContent: 'space-between', margin: '1%'}}>
          {(props.startValue && props.label !== 'CVV' && props.label !== 'Expirein') && <Icon onPress={clearInput} name="cancel" iconStyle={{fontWeight: 'bold'}} color={text.primary} size={20}/>} 
          {(props.label === "Password" || props.label === "Confirm Password") && <Icon onPress={() => {setisSecureText(!isSecureText)}} type="ionicon" name={isSecureText ? "lock-closed-outline" : "eye-outline"} color={text.primary}/>}

        </View>}     
      onChangeText={onChangeTextHandler}
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry={
        (props.label === 'Password' ||
       props.label === 'Repeat Password' ||
       props.label === 'Confirm Password' ||
        props.label === 'Current Password' ||
         props.label === 'New Password') && isSecureText
      }
      placeholder={props.label}
      placeholderTextColor={text.primary}
      maxLength={props.label === 'CVV' ? 3 : props.label === 'Card Number' ? 16 : props.label === 'Expirein' ? 5 : 100}
    />
    </View>
    {(props.errorMessage && props.startValue !== '' && props.label !== 'CVV') && 
    <Text 
    style={{
    left: route.name === 'ForgotPassword' ? width * 0.185 : width * 0.053,
    fontSize: 12,color: 'red',
    position: 'absolute',
    bottom: height * -0.03,
    fontWeight: 'bold' ,
    width: props.label === "Exp Date" || props.label === "Cvv" || props.label === 'Enter Coupon' ? 135 : '85%', 
    alignSelf:'center'}}>
    {props.errorMessage}
    </Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 14,
    alignSelf: 'center',
  },
});

export default FormInput;
