import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import { StyledBarrierProps } from '../../interfaces/interfaces';
import { useTheme } from '../../context/ThemeContext';

const TitledBarrier: React.FC<StyledBarrierProps> = (props) => {
    const {theme} = useTheme();
    return (
        <View style={styles.container}>
            <View style={[styles.line, {borderColor: theme.textColor, backgroundColor: theme.textColor}]}/>
            <Text style={[styles.textstyle, {color: theme.textColor}]}>{props.text}</Text>
            <View style={[styles.line, {borderColor: theme.textColor , backgroundColor: theme.textColor}]}/>
        </View>
    )
}
export default TitledBarrier
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        width: '95%',
        marginTop: '5%'
    },
    line: {
        width: '25%',
        borderWidth: 1,
        height: 1
    },
    textstyle: {

    }
});