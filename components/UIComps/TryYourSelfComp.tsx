/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { ThemeContext } from '../../context/ThemeContext';
import arrowPointer from '../../assets/arrowPointer.json';

import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StyledButton from './StyledButton';
const { width, height } = Dimensions.get('window');

const TryYourSelfComp: React.FC = () => {
    const { theme, buttonTheme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors;
    const navigation = useNavigation<StackNavigationProp<any, 'AddCreditCardScreen'>>();
    const arrowPointerObj = (
        <LottieView
          style={{ width: 100, height: 100, position: 'absolute', bottom: -40, marginTop: '65%'}}
          speed={1} 
          source={arrowPointer}
          autoPlay
          loop={true}
        />
      );
  return (
    <View style={[styles.container,{}]}>
      <View style={styles.titleCon}>
        <Text style={{color: text.primary, fontSize: 32, fontWeight: '500', textAlign: 'center'}}>Try Yourself !</Text>
      </View>
      <View style={styles.goHomeBtn}>
            <StyledButton onPress={() => {navigation.navigate('Home')}} bigbutton text='Return home'/>
      </View>
      <View style={styles.lottieAnimationCon}>
{arrowPointerObj}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleCon: {
        marginTop: '5%'
    },
    lottieAnimationCon: {
        position: 'relative',
        height: height * 0.6,
        alignItems: 'center'
    },
    goHomeBtn: {
        marginTop: '5%'
    }
})
export default TryYourSelfComp;