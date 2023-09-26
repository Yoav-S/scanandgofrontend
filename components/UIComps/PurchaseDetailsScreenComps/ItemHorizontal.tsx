import React, {useContext} from "react";
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native'
import { ItemHorizontalType } from "../../../interfaces/interfaces";
import { ThemeContext } from "../../../context/ThemeContext";
import StyledButton from "../../UIElements/StyledButton";
const ItemHorizontal: React.FC<ItemHorizontalType> = ({cartItem, totalAmount}) => {
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors     
    return (
        <SafeAreaView style={[styles.container]}>
            <Image style={styles.image} source={{uri:cartItem.imageSource}}/>
            <Text style={[styles.nametext, {color: text.primary , fontWeight: '300'}]}>{cartItem.name}</Text>
            <Text style={[styles.pricetext, {color: text.primary , fontWeight: '600'}]}>{cartItem.price}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: '2%',
    alignItems: 'center',
},
btnCon: {

},
image:{
    width: 50,
    height: 50,
},
pricetext:{

},
nametext: {

}
})
export default ItemHorizontal;