import React, {useState, useContext} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { StyledButtonType } from "../../interfaces/interfaces";
import { ThemeContext } from "../../context/ThemeContext";
import activitiIndicator from '../../assets/activitiindicator.json'
import LottieView from "lottie-react-native";
const StyledButton: React.FC<StyledButtonType> = (props) =>{
    const { buttonTheme } = useContext(ThemeContext);
    const {buttonMain,buttonAlt } = buttonTheme;
    const activitiIndicatorAnimation = (<LottieView
        style={{width: 21, height: 21, alignSelf: 'center'}}
        speed={1} 
        source={activitiIndicator}
        autoPlay
        loop={true}
        />)
    return (
        <TouchableOpacity 
        disabled={props.disabled} 
        style={[styles.btnstyle, 
        {borderRadius: props.text === 'Delete anyway' ? 50 : 8},
        {marginLeft: props.text === 'Select birth Date' ? '10%' : '0%'},
        {padding: props.text === 'Delete anyway' ? '10%' : '2%'},
        {alignSelf: props.text === 'Select birth Date' ? 'flex-start' : 'center'},
        {backgroundColor : props.text === 'Invalid' ? 'red'
        : props.text === 'Delete anyway' ? 'crimson' 
        : props.text === 'Verified' ? 'green' 
        : props.text === 'Image Added' ? 'green' 
        : props.disabled ? buttonAlt.background 
        : buttonMain.background, 
        width: props.bigbutton 
        ? 270 : props.smallbutton ? 90 : 120}]} 
        onPress={props.onPress}>
            {!props.isLoading ? (
            <Text style={[styles.textstyle, 
            {color : props.text === 'Invalid' 
            || props.text === 'Verified' ? 'white' 
            : props.text === 'Image Added' ? buttonMain.text 
            : buttonAlt.text},
        {fontWeight: props.text === 'Delete anyway' ? '600' : '300'}]}>{props.text}</Text>)
            :(activitiIndicatorAnimation)}
        </TouchableOpacity>
    )
}
const styles  = StyleSheet.create({
    btnstyle: {
        padding: '3%',
        alignSelf: 'center',
        margin: '5%',
    },
    textstyle: {
        textAlign: 'center',
    }
});
export default StyledButton