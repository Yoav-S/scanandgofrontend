import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import axios from "axios";
import { useToken } from '../context/TokenContext'; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<any, 'Signup'>>();
    const { setToken } = useToken(); // Use the useToken hook

    const signupHandler = () => {
        navigation.navigate('Login');
    }

    const SignupAttempt = async () => {
        try {
            const response = await axios.post('your_signup_endpoint', {
            });
            const newToken = response.data.token; 
            setToken(newToken);
            await AsyncStorage.setItem('token', newToken);
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.colorBlack}>
                signup screen
            </Text>
            <TouchableOpacity style={styles.btn} onPress={signupHandler}>
                <Text style={styles.colorBlack}>Navigate to Login Screen</Text>
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
