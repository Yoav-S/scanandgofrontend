import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SignupScreenType } from "../interfaces/interfaces";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
const SignupScreen: React.FC<SignupScreenType> = () => {
    const navigation = useNavigation<StackNavigationProp<any, 'Signup'>>();
    const signupHandler = () => {
        navigation.navigate('Login');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.colorBlack}>
                signup screen
            </Text>
            <TouchableOpacity style={styles.btn} onPress={signupHandler}>
            <Text style={styles.colorBlack}> navigate to login Screen</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    colorBlack: {
        color: 'black',
    },
    container: {
        flex: 1, 
        backgroundColor: 'white'
    },
    btn: {
        backgroundColor: 'red',
        padding: '3%',
        alignSelf: 'center',
        width: 150
    }
});
export default SignupScreen;