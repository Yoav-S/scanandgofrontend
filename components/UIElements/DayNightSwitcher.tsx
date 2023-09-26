import React, { useState, useEffect, useContext } from "react";
import { View, Switch, StyleSheet } from "react-native";
import { DayNightSwitcherProps } from "../../interfaces/interfaces";
import { ThemeContext } from "../../context/ThemeContext";

const DayNightSwitcher: React.FC<DayNightSwitcherProps> = () => {
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors 


  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
});

export default DayNightSwitcher;
