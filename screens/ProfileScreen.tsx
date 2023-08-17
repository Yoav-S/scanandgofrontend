import React from "react";
import { TextInput, StyleSheet, SafeAreaView , Text} from "react-native";
import { ProfileScreenType } from "../interfaces/interfaces";

const ProfileScreen: React.FC<ProfileScreenType> = (props) => {

  return (
    <SafeAreaView>
        <Text style={styles.colorBlack}>ProfileScreen</Text>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    colorBlack: {
        color: 'black'
    }
});

export default ProfileScreen;

