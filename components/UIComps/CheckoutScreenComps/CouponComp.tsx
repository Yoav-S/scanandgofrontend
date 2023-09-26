import React, {useState, useContext} from "react";
import {Text, View, StyleSheet, SafeAreaView} from 'react-native'
import { CouponCompProps} from '../../../interfaces/interfaces'
import { ThemeContext } from "../../../context/ThemeContext";
import { Icon } from 'react-native-elements';
import FormInput from "../../UIElements/FormInput";
import StyledButton from "../../UIElements/StyledButton";

const CouponComp: React.FC<CouponCompProps> = ({isCouponValid,startValue, isAttempted, handleCouponCheck, isLoading, changeInputHandler, btnLabelText}) => {
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors 


    return(
        <SafeAreaView style={[styles.container, {backgroundColor: background}]}>
        <Icon color={text.primary} name="note" size={30}/>
        <View style={{marginTop: '3%'}}><FormInput isApplied isAttempted label="Enter Coupon" setInput={(input: string) => {changeInputHandler(input)}}/></View>
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