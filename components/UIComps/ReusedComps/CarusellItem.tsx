import React, {useContext} from "react";
import {View, SafeAreaView, Text, StyleSheet, Image} from 'react-native'
import {ItemCompInterface} from '../../../interfaces/interfaces'
import { ThemeContext } from "../../../context/ThemeContext";
import ShekelPrice from "../../UIElements/ShekelPrice";

const CarusellItem: React.FC<ItemCompInterface> = (props) => {
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors     
    return (
        <View style={styles.container}>

            <Image source={{uri: props.itemObj.imageSource}} style={styles.image}/>
            <View style={styles.detailscon}>
                <Text style={{fontWeight: '300' , color: text.primary, fontSize: 13}}>{props.itemObj.name}</Text>
                <ShekelPrice num={props.itemObj.price}/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 200,
        width: 200,
        paddingRight: '4%',
        borderRightWidth: 5,
        borderRightColor: 'transparent',
    },

    image: {
        height: 100,
        width: 100,
        marginRight: '4%',
        borderRadius: 8
    },
    detailscon:  {
        width: '55%'
    },
    imageShekel: {
        height: 12,
        width: 12,
    },
});
export default CarusellItem;