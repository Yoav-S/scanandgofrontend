/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';


const ScannerOpenerSubComp: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors 
  return (
    <View style={[styles.container, {backgroundColor: background}]}>
        <View style={styles.titleCon}>
            <Text style={[{color: text.primary, fontSize: 24, fontWeight: '600', marginTop: '5%'}]}>Open Your Scanner</Text>
        </View>
        <View style={styles.NavigatorImageCon}>
            <Image source={require('../../images/navbardark.jpg')} style={styles.navigatorimage}/>
        </View>
    </View>
  );
};
const styles  = StyleSheet.create({
    container: {
        flex: 1
    },
    NavigatorImageCon: {

    },
    titleCon: {
        width: '90%',
        alignSelf: 'center'
    },
    navigatorimage: {
        width: 250,
        height: 80,
        alignSelf: 'center'
    }
})
export default ScannerOpenerSubComp;