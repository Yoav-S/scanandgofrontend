import React, {useState, useContext} from "react";
import {View, Text, TouchableOpacity, StyleSheet,Dimensions} from 'react-native';
import { StyledButtonType } from "../../interfaces/interfaces";
import { ThemeContext } from "../../context/ThemeContext";
import activitiIndicator from '../../assets/activitiindicator.json'
import LottieView from "lottie-react-native";
const screen = Dimensions.get('window');

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
        {padding: props.text === 'Scan Again' ? '1%' : '3%'},
        {borderRadius: props.text === 'Delete anyway' ? 50 : 4},
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
        ? screen.width * 0.95 : props.smallbutton ? 90 : props.smallbutton && props.text === 'Scan Again' ? 60 : 120}]} 
        onPress={props.onPress}>
            {!props.isLoading ? (
            <Text style={[styles.textstyle, 
            {color : props.text === 'Invalid' 
            || props.text === 'Verified' ? 'white' 
            : props.text === 'Image Added' ? buttonMain.text 
            : buttonAlt.text},
        {fontWeight: props.text === 'Delete anyway' || props.text === 'Scan Again' ? '600' : '500'}]}>{props.text}</Text>)
            :(activitiIndicatorAnimation)}
        </TouchableOpacity>
    )
}
const styles  = StyleSheet.create({
    btnstyle: {
        alignSelf: 'center',
        marginTop: '2%',
        marginBottom: '2%'
    },
    textstyle: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
});
export default StyledButton