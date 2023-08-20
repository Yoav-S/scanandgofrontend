import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { TitleAndBtnConProps } from "../../interfaces/interfaces";
import { useTheme } from "../../context/ThemeContext";
const TitleAndBtnCon: React.FC<TitleAndBtnConProps> = (props) => {
    const {theme} = useTheme();
    const navigateHandler = () => {
        props.onNavigateToSignUp?.(); // Call the navigation function if provided
      };
return (
    <View style={styles.container}>
        <Text style={{color: theme.textColor, fontWeight: props.textbold ? 'bold' : '300'}}>{props.text}</Text>
        <TouchableOpacity style={{marginLeft: '4%'}} onPress={navigateHandler}>
            <Text style={{color: theme.textColor , fontWeight: props.btnbold ? 'bold' : '300'}}>{props.btnlabel}</Text>
        </TouchableOpacity>
    </View>
)
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '95%',
        alignSelf: 'center',
    }
})
export default TitleAndBtnCon;