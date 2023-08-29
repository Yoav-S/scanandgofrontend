import React from "react";
import { TextInput, StyleSheet, SafeAreaView , Text} from "react-native";
import { ProfileScreenType } from "../interfaces/interfaces";
import { useTheme } from "../context/ThemeContext";
import BottomNavbar from "../components/UIComps/BottomNavbar";

const ProfileScreen: React.FC<ProfileScreenType> = (props) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.colorBlack}>ProfileScreen</Text>
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

export default ProfileScreen;

