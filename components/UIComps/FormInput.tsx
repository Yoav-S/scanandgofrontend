import React, {useContext, useEffect, useState} from "react";
import { StyleSheet, View , Text} from "react-native";
import { FormInputType } from "../../interfaces/interfaces";
import { ThemeContext } from "../../context/ThemeContext";
import { ErrorMessage } from "formik";
import { Icon } from 'react-native-elements';
import { BorderlessButton } from "react-native-gesture-handler";
import { Input } from '@rneui/themed';
const FormInput: React.FC<FormInputType> = (props) => {
  const { theme } = useContext(ThemeContext);
  const { text, background } = theme.colors   
  const [isSecureText, setisSecureText] = useState<boolean>(false);
  const [greenUnderlineCondition, setgreenUnderlineCondition] = useState<boolean>(!props.errorMessage && props.startValue !== '');
  const onChangeTextHandler = (text: string) => {
    if(props.label === 'Card Holder Name'){    
      props.setInput(text.toUpperCase());
    }
    else{
      props.setInput(text);
    }
  };


  const clearInput = () => {
    props.setInput(""); // Clear the input
  };
  console.log(props.label);
  
  return (
    <View style={{marginTop: '1%', marginBottom: '2%'}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <Input 
      value={props.startValue}
      autoFocus={props.focus}
      inputStyle={{color: text.primary}}
      keyboardType={props.numeric ? 'number-pad' : 'default'}
      containerStyle={
        [
          styles.textInput, 
          {
            width: props.label === "Exp Date" ||
             props.label === "CVV" ? 
               120 : props.label === 'Enter Coupon' ? 
               185 : 300,
          },
          
        ]
      }
      leftIcon={
        (!props.errorMessage && props.startValue !== '' && props.label !== 'Enter Coupon')  ? 
        <Icon color={'green'} type={"ionicon"} name="checkmark-done-circle-outline" size={20}/> : <View style={{width: 20}}/>
      }
      rightIcon={
        (props.label === "Password" || props.label === "Confirm Password") 
        ? <Icon onPress={() => {setisSecureText(!isSecureText)}} type="ionicon" name={isSecureText ? "lock-closed-outline" : "eye-outline"} color={text.primary}/> 
        : undefined
      }     
      underlineColorAndroid={"transparent"}
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
      maxLength={props.label === 'CVV' ? 3 : props.label === 'Card Number' ? 16 : 100}
    />
    {}
    {props.startValue !== '' && props.label !== 'Enter Coupon' &&
    (<View style={{padding: '1%', backgroundColor: background, borderRadius: 50, marginBottom: '8%'}}>      
          <Icon onPress={clearInput} name="cancel" iconStyle={{fontWeight: 'bold'}} color={text.primary} size={20}/>
    </View>)}
    </View>
    {(props.errorMessage && props.startValue !== '') && <Text style={{color: 'red',position: 'absolute',bottom: 0, fontWeight: 'bold' , width: props.label === "Exp Date" || props.label === "Cvv" || props.label === 'Enter Coupon' ? 135 : '85%', alignSelf:'center'}}>{props.errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    width: '90%',
    alignSelf: 'center',
  },
});

export default FormInput;
