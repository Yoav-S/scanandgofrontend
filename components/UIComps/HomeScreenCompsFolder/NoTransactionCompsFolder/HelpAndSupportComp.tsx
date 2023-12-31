/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { ThemeContext } from '../../../../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute, RouteProp  } from "@react-navigation/native";


const HelpAndSupportComp: React.FC = () => {
    const { theme,buttonTheme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors 
    const navigation = useNavigation<StackNavigationProp<any>>();
 
  return (
    <View style={[styles.container]}>
              <View style={[styles.titleCon]}>
          <Text style={[{color: text.primary, fontWeight: 'bold', fontSize: 24}]}>Help And Support System</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: '5%', gap: 10, alignItems: 'flex-end'}}>
            <Text style={{color: text.primary}}>We Have fully</Text>
            <TouchableOpacity onPress={() => {navigation.navigate('HelpAndSupportScreen')}}>
                <Text style={{color: buttonTheme.buttonMain.background, fontWeight: 'bold', fontSize: 16}}>help and support</Text>
            </TouchableOpacity>
            <Text style={{color: text.primary}}>page,</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: '3%'}}>
        <Text style={{color: text.primary}}>which is located at our</Text>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => {navigation.navigate('Settings')}}>
            <Text style={{color: buttonTheme.buttonMain.background, fontWeight: 'bold', fontSize: 16}}> settings </Text>
            <Text style={{color: text.primary, fontSize: 14}}>screen.</Text>
        </TouchableOpacity>
        </View>
        <View style={{marginTop: '2%', width: '90%'}}>
            <Text style={{color: text.primary, lineHeight: 25}}>And suggests a complete instractions tour about the Scan & Go application.</Text>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
container: {
flex: 1,
width: '100%'

},
titleCon: {

}
})
export default HelpAndSupportComp;