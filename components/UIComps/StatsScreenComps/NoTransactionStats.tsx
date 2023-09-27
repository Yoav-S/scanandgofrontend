/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import emptyBoxAnimation from '../../../assets/emptystatsanimation.json'
import BigTitle from '../../UIElements/BigTitle';
import { ThemeContext } from '../../../context/ThemeContext';
import StyledButton from '../../UIElements/StyledButton';
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
const NoTransactionStats: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, 'StatsScreen'>>();

  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors 
  const emptyBoxAnimationObject = (<LottieView
    style={{width: 250, height: 250 , zIndex: 10, alignSelf: 'center', marginTop: '5%'}}
    speed={1} 
    source={emptyBoxAnimation}
    autoPlay
    loop={true}
    />)
  return (
    <View>
      {emptyBoxAnimationObject}
      <View style={{marginTop: '5%', gap: 10}}>

      <Text style={{color: text.primary, fontWeight: '600', textAlign: 'center', fontSize: 18}}>Your Shopping Statistics Are Empty</Text>
      <Text style={{color: text.secondary, textAlign: 'center'}}>Move to our scanning tour !</Text>
      <StyledButton onPress={() => {navigation.navigate('ScanningTour')}} text='Scan tour'/>
      </View>

    </View>
  );
};
const styles = StyleSheet.create({

})
export default NoTransactionStats;