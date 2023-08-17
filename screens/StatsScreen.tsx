import React from "react";
import { TextInput, StyleSheet, SafeAreaView , Text} from "react-native";
import { StatsScreenType } from "../interfaces/interfaces";

const StatsScreen: React.FC<StatsScreenType> = (props) => {

  return (
    <SafeAreaView>
        <Text style={styles.colorBlack}>StatsScreen</Text>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    colorBlack: {
        color: 'black'
    }
});

export default StatsScreen;

