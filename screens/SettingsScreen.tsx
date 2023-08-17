import React from "react";
import { TextInput, StyleSheet, SafeAreaView , Text} from "react-native";
import { SettingsScreenType } from "../interfaces/interfaces";
import { useTheme } from "../context/ThemeContext";
import BottomNavbar from "../components/UIComps/BottomNavbar";

const SettingsScreen: React.FC<SettingsScreenType> = (props) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.colorBlack}>SettingsScreen</Text>
        <BottomNavbar theme={theme}/>
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

export default SettingsScreen;

