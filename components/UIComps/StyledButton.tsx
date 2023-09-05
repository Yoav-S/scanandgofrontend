import React, {useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { StyledButtonType } from "../../interfaces/interfaces";
import { useTheme } from "../../context/ThemeContext";
import { ActivityIndicator } from "@react-native-material/core";
const StyledButton: React.FC<StyledButtonType> = (props) =>{
    const {theme} = useTheme();
    return (
        <TouchableOpacity 
        disabled={props.disabled} 
        style={[styles.btnstyle, 
        {backgroundColor : props.text === 'Invalid' ? 'red' 
        : props.text === 'Verified' ? 'green' 
        : props.text === 'Image Added' ? 'green' 
        : props.disabled ? theme.primaryColor 
        : theme.secondaryColor, width: props.bigbutton 
        ? 270 : props.smallbutton ? 90 : 120}]} 
        onPress={props.onPress}>
            {!props.isLoading ? (
            <Text style={[styles.textstyle, 
            {color : props.text === 'Invalid' 
            || props.text === 'Verified' ? 'white' 
            : props.text === 'Image Added' ? 'white' 
            : theme.textColor}]}>{props.text}</Text>)
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