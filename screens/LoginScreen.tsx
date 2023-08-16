import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { NightTheme } from "../themes/themes";
import BigTitle from "../components/UIComps/BigTitle";
import DayNightSwitcher from "../components/UIComps/DayNightSwitcher";

const LoginScreen: React.FC = () => {
    
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <DayNightSwitcher
        isEnabled={theme === NightTheme}
        onToggle={toggleTheme}
      />
      <View style={styles.imageCon}>
        <Image style={styles.image} source={require("../images/3135715.png")} />
      </View>
      <BigTitle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageCon: {
    alignSelf: 'center',
    padding: '15%',
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default LoginScreen;
