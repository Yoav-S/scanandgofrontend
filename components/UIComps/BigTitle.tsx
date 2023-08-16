import React from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import { BigTitleType } from '../../interfaces/interfaces'
const BigTitle: React.FC<BigTitleType> = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.colorBlack}>Login</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    colorBlack: {
        color: 'black',
    }
})
export default BigTitle