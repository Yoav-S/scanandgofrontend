import React, {useState} from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import { BigTitleType } from '../../interfaces/interfaces';
import { useTheme } from '../../context/ThemeContext';

const BigTitle: React.FC<BigTitleType> = (props) => {
    const { theme } = useTheme();
    const [title, setTitle] = useState<string>(props.title);
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.colorBlack, { color: theme.textColor }]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorBlack: {
        fontWeight: 'bold',
        fontSize: 24,
    }
})

export default BigTitle;
