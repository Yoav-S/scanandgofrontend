import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native'
import { StyledBarrierProps } from '../../interfaces/interfaces';
import { ThemeContext } from '../../context/ThemeContext';
const TitledBarrier: React.FC<StyledBarrierProps> = (props) => {
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors 
    return (
        <View style={styles.container}>
            <View style={[styles.line, {borderColor: text.primary, backgroundColor: background}]}/>
            <Text style={[styles.textstyle, {color: text.primary}]}>{props.text}</Text>
            <View style={[styles.line, {borderColor: text.primary , backgroundColor: background}]}/>
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