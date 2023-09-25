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
  console.log(route.name);
  
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
    <View style={{marginTop: '1%', marginBottom: '8%'}}>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
    <NativeBaseInput 
      variant={route.name === 'Login' || route.name === 'Signup' ? 'Outline' : 'Outline'}
      value={props.startValue}
      autoFocus={props.focus}
      width={props.label === "CVV" ? 
      120 : props.label === 'Enter Coupon' ? 
      185 : 320}
      borderWidth={1}
      style={[{
      marginBottom:props.label === 'CVV' ? '1%' : '4%',
      color: text.primary,             
      }, styles.textInput]}
      keyboardType={props.numeric ? 'number-pad' : 'default'}
      leftElement={
        (!props.errorMessage && props.startValue !== '' && props.label !== 'Enter Coupon')  ? 
        <Icon style={{marginLeft: '2%'}} color={'green'} type={"ionicon"} name="checkmark-done-circle-outline" size={20}/> : props.label === 'Enter Coupon' ? <View style={{width: 0}}/> :<View style={{width: 20, marginLeft: '2%'}}/>
      }
      rightElement={
        <View style={{flexDirection: 'row', alignItems: 'center', width: props.label !== 'CVV' ? width * 0.15 : 0, justifyContent: 'space-between', margin: '1%'}}>
          {(props.startValue && props.label !== 'CVV') && <Icon onPress={clearInput} name="cancel" iconStyle={{fontWeight: 'bold'}} color={text.primary} size={20}/>} 
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
      maxLength={props.label === 'CVV' ? 3 : props.label === 'Card Number' ? 16 : 100}
    />
    </View>
    {(props.errorMessage && props.startValue !== '' && props.label !== 'CVV') && <Text style={{left: route.name === 'ForgotPassword' ? width * 0.185 : width * 0.14,fontSize: 12,color: 'red',position: 'absolute',bottom: height * 0.005, fontWeight: 'bold' , width: props.label === "Exp Date" || props.label === "Cvv" || props.label === 'Enter Coupon' ? 135 : '85%', alignSelf:'center'}}>{props.errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 50,
    paddingHorizontal: 16,
    fontSize: 14,
    alignSelf: 'center',
  },
});

export default FormInput;
