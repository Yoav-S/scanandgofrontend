import React, {useContext} from "react";
import { StyleSheet, View , Text} from "react-native";
import { FormInputType } from "../../interfaces/interfaces";
import { TextInput } from "@react-native-material/core";
import { ThemeContext } from "../../context/ThemeContext";
import { ErrorMessage } from "formik";
const FormInput: React.FC<FormInputType> = (props) => {
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors   
  const onChangeTextHandler = (text: string) => {
    if(props.label === 'Card Holder Name'){    props.setInput(text.toUpperCase());
    }
    else{
      props.setInput(text);
    }
  };
  
  return (
    <View style={{marginTop: '1%', marginBottom: '10%'}}>
    <TextInput 
      keyboardType={props.numeric ? 'number-pad' : 'default'}
      style={[styles.textInput, {width: props.label === "Exp Date" || props.label === "CVV" || props.label === 'Enter Coupon' ? 165 : 330}]}
      onChangeText={onChangeTextHandler}
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry={props.label === 'Password' || props.label === 'Repeat Password' || props.label === 'Current Password' || props.label === 'New Password'}
      placeholder={props.label}
      placeholderTextColor={text.primary}
      selectionColor="white"
      variant='standard'
      inputContainerStyle={{}}
      inputStyle={{ color: text.primary }}
    />
    {props.errorMessage && <Text style={{color: 'red', fontWeight: 'bold' , width: props.label === "Exp Date" || props.label === "Cvv" || props.label === 'Enter Coupon' ? 135 : '85%', alignSelf:'center'}}>{props.errorMessage}</Text>}
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
