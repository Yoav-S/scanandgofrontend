import React from "react";
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "../../context/ThemeContext";
import { useDataContext } from "../../context/DataContext";
import { IteminCartType } from "../../interfaces/interfaces";
import CarusellItem from "./CarusellItem";
const CartCarusell: React.FC = () => {
    const { currentUser } = useDataContext();
    const {theme} = useTheme();
    return (
        <SafeAreaView style={[styles.container]}>
            <Text style={{color: theme.textColor, marginBottom: '2%', fontWeight: '600'}}>Cart</Text>
            <ScrollView horizontal style={styles.caruselle}>
                {
                    currentUser?.cart.map((item: IteminCartType) => {
                        return(
                            <CarusellItem
                            key={item.itemId}
                            itemObj={item}
                            />
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '95%',
        alignSelf: 'center',
        marginTop: '3%'
    },
    caruselle: {
        flexDirection: 'row'
    }
});
export default CartCarusell