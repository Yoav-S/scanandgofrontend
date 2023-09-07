import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import { useTheme } from "../context/ThemeContext";
import { recentTransaction } from "../interfaces/interfaces";
import { useRoute } from "@react-navigation/native";
const TransactionScreen: React.FC = () => {
    const {theme} = useTheme();
    const route = useRoute(); // Use the useRoute hook to infer route types
    const { transaction } = route.params as { transaction: recentTransaction[] };
    console.log(transaction);
    
    return (
        <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>

        </View>
    )
}

const styles = StyleSheet.create({
container: {
    flex: 1
}
})
export default TransactionScreen