import React, {useState, useContext} from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import { BigTitleType } from '../../interfaces/interfaces';
import { ThemeContext } from "../../context/ThemeContext";

const BigTitle: React.FC<BigTitleType> = (props) => {
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors 
    const [title, setTitle] = useState<string>(props.title);
    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <Text style={[styles.colorBlack, { color: text.primary }]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: '5%'
    },
    colorBlack: {
        fontWeight: 'bold',
        fontSize: 24,
    }
})

export default BigTitle;
