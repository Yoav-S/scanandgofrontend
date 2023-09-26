/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { ThemeContext } from '../../../../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute, RouteProp  } from "@react-navigation/native";

const LetsStartScanComp: React.FC = () => {
    const { theme,buttonTheme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors  
    const navigation = useNavigation<StackNavigationProp<any>>(); 
  return (
    <View style={[styles.container]}>
        <View style={[styles.titleCon]}>
          <Text style={[{color: background, fontWeight: 'bold', fontSize: 24},styles.titleText]}>First Time Scanning ?</Text>
          <Text style={{color: background, fontWeight: '500', fontSize: 16, marginTop: '2%'}}>Full guide about Scan & Go scanning procces.</Text>
        </View>
        <TouchableOpacity onPress={() => {navigation.navigate('ScanningTour')}} style={{backgroundColor: background, width: '35%', alignItems: 'center',marginTop: '10%', borderRadius: 8}}>
            <Text style={{padding: '6%', color: buttonTheme.buttonMain.background, fontWeight: 'bold'}}>Scanning Tour</Text>
        </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    titleText: {

    },
    titleCon: {
    }
})
export default LetsStartScanComp;