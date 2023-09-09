import React, {useContext} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TitleAndBtnConProps } from "../../interfaces/interfaces";
import { ThemeContext } from "../../context/ThemeContext";

const TitleAndBtnCon: React.FC<TitleAndBtnConProps> = (props) => {
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors 
    const triggerBtn = () => {
        if (props.onPress) {
            props.onPress();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ color: text.primary, fontWeight: props.textbold ? 'bold' : '300', fontSize: 12 }}>{props.text}</Text>
            <TouchableOpacity onPress={triggerBtn}>
                <Text style={{textAlign: 'center' ,color: text.primary, fontWeight: props.btnbold ? 'bold' : '300' , fontSize: 12 }}> {props.btnlabel}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '95%',
        alignSelf: 'center',
        textAlign: 'center',
    }
});

export default TitleAndBtnCon;
