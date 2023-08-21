import React from "react";
import { StyleSheet, View , Text} from "react-native";
import { FormInputType } from "../../interfaces/interfaces";
import { TextInput } from "@react-native-material/core";
import { useTheme } from "../../context/ThemeContext";
const FormInput: React.FC<FormInputType> = (props) => {
  const {theme} = useTheme();

  const onChangeTextHandler = (text: string) => {
    props.setInput(text);
  };
  console.log(props.validator);
  
  return (
    <View>
    <TextInput 
      style={[styles.textInput]}
      onChangeText={onChangeTextHandler}
      autoCapitalize="none"
      autoCorrect={false}
      placeholder={props.label}
      placeholderTextColor={theme.textColor}
      selectionColor="white"
      variant='standard'
      inputStyle={{ color: theme.textColor }}
    />
    {
      !props.validator ? (<Text style={{color: theme.textColor}}>{props.errorMessage}</Text>) : (<Text></Text>)
    }
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    width: '90%',
    alignSelf: 'center',
  },
});

export default FormInput;
