import React from "react";
import { View, StyleSheet , Text, SafeAreaView} from "react-native";
import { HomeScreenType } from "../interfaces/interfaces";
import { useTheme } from "../context/ThemeContext";
import BottomNavbar from "../components/UIComps/BottomNavbar";
const HomeScreen: React.FC<HomeScreenType> = (props) => {
    const { theme } = useTheme();
    return (
        <SafeAreaView style={styles.container} >
            <Text style={styles.colorBlack}>Home Screen</Text>
            <BottomNavbar />
        </SafeAreaView>
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