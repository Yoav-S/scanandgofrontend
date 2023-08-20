import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { StyledButtonType } from "../../interfaces/interfaces";
import { useTheme } from "../../context/ThemeContext";
const StyledButton: React.FC<StyledButtonType> = (props) =>{
    const {theme} = useTheme();
    return (
        <TouchableOpacity style={[styles.btnstyle, {backgroundColor : theme.primaryColor}]} onPress={props.btnHandler}>
            <Text style={[styles.textstyle, {color: theme.textColor}]}>{props.text}</Text>
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