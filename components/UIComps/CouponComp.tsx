import React, {useState} from "react";
import {Text, View, StyleSheet, SafeAreaView} from 'react-native'
import { CouponCompProps} from '../../interfaces/interfaces'
import { useTheme } from "../../context/ThemeContext";
import { Icon } from 'react-native-elements';
import FormInput from "./FormInput";
import StyledButton from "./StyledButton";

const CouponComp: React.FC<CouponCompProps> = ({isCouponValid, isAttempted, handleCouponCheck, isLoading, changeInputHandler, btnLabelText}) => {
    const {theme} = useTheme();




    return(
        <SafeAreaView style={[styles.container]}>
        <Icon name="note" size={30}/>
        <FormInput isApplied isAttempted label="Enter Coupon" setInput={(input: string) => {changeInputHandler(input)}}/>
        <StyledButton isApplied isAttempted onPress={handleCouponCheck} isLoading={isLoading} smallbutton text={btnLabelText}/>
        </SafeAreaView>
    )
}


export default CouponComp;
const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    justifyContent: 'space-between',
    alignSelf: 'center',
}
})