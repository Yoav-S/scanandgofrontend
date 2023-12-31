import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import { recentTransaction } from "../interfaces/interfaces";
import { useRoute } from "@react-navigation/native";
const TransactionScreen: React.FC = () => {
    const route = useRoute(); // Use the useRoute hook to infer route types
    const { transaction } = route.params as { transaction: recentTransaction[] };
    console.log(transaction);
    
    return (
        <View>

        </View>
    )
}

const styles = StyleSheet.create({
container: {
    flex: 1
}
})
export default TransactionScreen