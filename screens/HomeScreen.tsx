import React from "react";
import { View, StyleSheet , Text} from "react-native";
import { HomeScreenType } from "../interfaces/interfaces";
import { useTheme } from "../context/ThemeContext";
import BottomNavbar from "../components/UIComps/BottomNavbar";
import ThemeProvider from "@react-navigation/native";
const HomeScreen: React.FC<HomeScreenType> = () => {
    const { theme } = useTheme();
    return (
        <View style={styles.container}>
            <Text style={styles.colorBlack}>Home Screen</Text>
            <BottomNavbar theme={theme}/>
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