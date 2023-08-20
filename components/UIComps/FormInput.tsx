import React from "react";
import { StyleSheet } from "react-native";
import { FormInputType } from "../../interfaces/interfaces";
import { TextInput } from "@react-native-material/core";

const FormInput: React.FC<FormInputType> = (props) => {
  const theme = props.theme;

  const onChangeTextHandler = (text: string) => {
    if (props.label === "Email" && props.setEmailInput) {
      props.setEmailInput(text);
    } else if (props.label === "Password" && props.setPasswordInput) {
      props.setPasswordInput(text);
    }
  };

  return (
    <TextInput 
      style={styles.textInput}
      onChangeText={onChangeTextHandler}
      autoCapitalize="none"
      autoCorrect={false}
      placeholder={props.label}
      placeholderTextColor={theme.textColor}
      underlineColorAndroid="transparent"
      selectionColor="white"
      variant='standard'
      inputStyle={{ color: theme.textColor }}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
    width: '90%',
    alignSelf: 'center'
  },
});

export default FormInput;
