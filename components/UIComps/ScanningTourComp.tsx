/* eslint-disable prettier/prettier */
import React,{useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';

const ScanningTourComp: React.FC = () => {
    const { theme,buttonTheme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors  
  return (
    <View style={[styles.container, {backgroundColor: background}]}>
      <Text>Scanning Tour</Text>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default ScanningTourComp;