/* eslint-disable prettier/prettier */
import React,{useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import LottieView from "lottie-react-native";
import welcomeGirlAnimation from '../../assets/scansnimation.json';
import TitleAndArrowBack from './TitleAndArrowBack';
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
const ScanningTourComp: React.FC = () => {
    const { theme,buttonTheme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors  
    const navigation = useNavigation<StackNavigationProp<any, 'AddCreditCardScreen'>>();


    const welcomeLottieObj = (
        <LottieView
          style={{ width: 250, height: 250}}
          speed={1} 
          source={welcomeGirlAnimation}
          autoPlay
          loop={true}
        />
      );

  return (
    <View style={[styles.container, {backgroundColor: background}]}>
      <TitleAndArrowBack text='Scan Tour' onPress={() => {navigation.goBack()}}/>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default ScanningTourComp;