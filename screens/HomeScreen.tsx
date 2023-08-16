import React from "react";
import { View, StyleSheet , Text} from "react-native";
import { HomeScreenType } from "../interfaces/interfaces";

const HomeScreen: React.FC<HomeScreenType> = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.colorBlack}>Home Screen</Text>

        </View>
    )
}
const styles = StyleSheet.create({
    colorBlack: {
        color: 'black'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});
export default HomeScreen;