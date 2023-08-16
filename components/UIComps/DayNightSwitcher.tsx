import React from "react";
import { View, Switch, StyleSheet } from "react-native";
import { DayNightSwitcherProps } from "../../interfaces/interfaces";


const DayNightSwitcher: React.FC<DayNightSwitcherProps> = ({
  isEnabled,
  onToggle,
}) => {
  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onToggle}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute'
  }
});

export default DayNightSwitcher;
