import React from "react";
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import { useTheme } from "../context/ThemeContext";
import KorenAnimation from '../assets/koren.json'
import YoavAnimation from '../assets/yoav.json'
import LottieView from "lottie-react-native";

const PurchaseDetailsScreen: React.FC = () => {
    const {theme} = useTheme();
    return (
        <SafeAreaView style={[styles.container,{backgroundColor: theme.backgroundColor}]}>
                <LottieView
                style={{width: 200, height: 200}}
                speed={1} 
                source={KorenAnimation}
                autoPlay
                loop={true}
                />        
                <LottieView
                style={{width: 200, height: 200}}
                speed={1} 
                source={YoavAnimation}
                autoPlay
                loop={true}
                />  
                </SafeAreaView>
    )
}
const styles = StyleSheet.create({
container: 
{
    flex: 1
}
});
export default PurchaseDetailsScreen;