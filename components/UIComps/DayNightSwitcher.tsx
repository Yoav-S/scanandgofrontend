import React, {useState} from "react";
import { View, Switch, StyleSheet } from "react-native";
import { DayNightSwitcherProps } from "../../interfaces/interfaces";
import { useTheme } from "../../context/ThemeContext";

const DayNightSwitcher: React.FC<DayNightSwitcherProps> = () => {
  const { toggleTheme} = useTheme();
  const [isEnabled, setisEnabled] = useState<boolean>(false);
  const changeSwitcher = () => {
    toggleTheme();
    setisEnabled(!isEnabled);
  }
  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={changeSwitcher}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
  }
});

export default DayNightSwitcher;
