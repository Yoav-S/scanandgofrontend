import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TitleAndBtnConProps } from "../../interfaces/interfaces";
import { useTheme } from "../../context/ThemeContext";

const TitleAndBtnCon: React.FC<TitleAndBtnConProps> = (props) => {
    const { theme } = useTheme();

    const triggerBtn = () => {
        if (props.onPress) {
            props.onPress();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ color: theme.textColor, fontWeight: props.textbold ? 'bold' : '300', fontSize: 12 }}>{props.text}</Text>
            <TouchableOpacity onPress={triggerBtn}>
                <Text style={{ color: theme.textColor, fontWeight: props.btnbold ? 'bold' : '300' , fontSize: 12 }}> {props.btnlabel}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '95%',
        alignSelf: 'center',
    }
});

export default TitleAndBtnCon;
