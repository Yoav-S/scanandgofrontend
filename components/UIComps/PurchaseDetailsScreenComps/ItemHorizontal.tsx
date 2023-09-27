import React, {useContext} from "react";
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native'
import { ItemHorizontalType } from "../../../interfaces/interfaces";
import { ThemeContext } from "../../../context/ThemeContext";
import StyledButton from "../../UIElements/StyledButton";
import ShekelPrice from "../../UIElements/ShekelPrice";
const ItemHorizontal: React.FC<ItemHorizontalType> = ({cartItem, totalAmount}) => {
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors     
    return (
        <SafeAreaView style={[styles.container]}>
            <Image style={[styles.image, { borderRadius: 50}]} source={{uri:cartItem.imageSource}}/>
            <Text style={[styles.nametext, {color: text.primary , fontWeight: '300'}]}>{cartItem.name}</Text>
            <Text style={[styles.nametext, {color: text.primary , fontWeight: '300'}]}>{cartItem.category}</Text>
            <ShekelPrice num={cartItem.price}/>
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
imageShekel: {
    height: 12,
    width: 12
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