import React, {useState, useContext} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { StyledButtonType } from "../../interfaces/interfaces";
import { ThemeContext } from "../../context/ThemeContext";
import { ActivityIndicator } from "@react-native-material/core";
const StyledButton: React.FC<StyledButtonType> = (props) =>{
    const { theme, buttonTheme } = useContext(ThemeContext);
    const {buttonMain,buttonAlt } = buttonTheme;

    const { primary, secondary, text, background } = theme.colors     
    return (
        <TouchableOpacity 
        disabled={props.disabled} 
        style={[styles.btnstyle, 
        {backgroundColor : props.text === 'Invalid' ? 'red' 
        : props.text === 'Verified' ? 'green' 
        : props.text === 'Image Added' ? 'green' 
        : props.disabled ? buttonMain.background 
        : buttonAlt.background, width: props.bigbutton 
        ? 270 : props.smallbutton ? 90 : 120}]} 
        onPress={props.onPress}>
            {!props.isLoading ? (
            <Text style={[styles.textstyle, 
            {color : props.text === 'Invalid' 
            || props.text === 'Verified' ? 'white' 
            : props.text === 'Image Added' ? buttonMain.text 
            : buttonAlt.text}]}>{props.text}</Text>)
            :(<ActivityIndicator size={30}/>)}
        </TouchableOpacity>
    )
}
const styles  = StyleSheet.create({
    btnstyle: {
        padding: '3%',
        width: 270,
        alignSelf: 'center',
        margin: '5%',
        borderRadius: 8,
    },
    textstyle: {
        textAlign: 'center',
    }
});
export default StyledButton