import React from "react";
import { TextInput, StyleSheet, SafeAreaView } from "react-native";
import { FormInputType } from "../../interfaces/interfaces";

const FormInput: React.FC<FormInputType> = (props) => {
  const theme = props.theme; // Assuming theme is passed as a prop

  return (
    <SafeAreaView style={[styles.inputCon, { backgroundColor: theme.backgroundColor }]}>
    <TextInput
      style={[
        styles.textInput,
        {
          color: theme.textColor,
        },
      ]}
      placeholder={props.label}
      onChangeText={text => { props.setEmailInput(text) }}
      
      />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  inputCon: {
    padding: '2%'
  }
});

export default FormInput;
