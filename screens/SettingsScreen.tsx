import React from "react";
import { TextInput, StyleSheet, SafeAreaView , Text} from "react-native";
import { SettingsScreenType } from "../interfaces/interfaces";

const SettingsScreen: React.FC<SettingsScreenType> = (props) => {

  return (
    <SafeAreaView>
        <Text style={styles.colorBlack}>SettingsScreen</Text>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    colorBlack: {
        color: 'black'
    }
});

export default SettingsScreen;

