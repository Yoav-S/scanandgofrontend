import React from "react";
import { TextInput, StyleSheet, SafeAreaView , Text} from "react-native";
import { StatsScreenType } from "../interfaces/interfaces";
import { useTheme } from "../context/ThemeContext";
import BottomNavbar from "../components/UIComps/BottomNavbar";
const StatsScreen: React.FC<StatsScreenType> = (props) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.colorBlack}>StatsScreen</Text>
        <BottomNavbar/>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    colorBlack: {
        color: 'black'
    },
    container: {
      flex: 1,
      backgroundColor: 'white'
  }
});

export default StatsScreen;

