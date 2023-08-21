import React, { useState, useEffect } from "react";
import { View, Switch, StyleSheet } from "react-native";
import { DayNightSwitcherProps } from "../../interfaces/interfaces";
import { useTheme } from "../../context/ThemeContext";
import { NightTheme } from "../../themes/themes"; // Make sure to provide the correct relative path

const DayNightSwitcher: React.FC<DayNightSwitcherProps> = () => {
  const { toggleTheme, theme } = useTheme();
  const [isEnabled, setisEnabled] = useState<boolean>(theme === NightTheme);

  useEffect(() => {
    setisEnabled(theme === NightTheme);
  }, [theme]);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleTheme}
        value={isEnabled}
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
