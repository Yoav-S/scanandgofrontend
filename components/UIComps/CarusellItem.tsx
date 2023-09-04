import React from "react";
import {View, SafeAreaView, Text, StyleSheet, Image} from 'react-native'
import {ItemCompInterface} from '../../interfaces/interfaces'
import { useTheme } from "../../context/ThemeContext";

const CarusellItem: React.FC<ItemCompInterface> = (props) => {
    const {theme} = useTheme();
    return (
        <View style={styles.container}>
            <Image source={{uri: props.itemObj.imageSource}} style={styles.image}/>
            <View style={styles.detailscon}>
                <Text style={{fontWeight: '300' , color: theme.textColor, fontSize: 13}}>{props.itemObj.name}</Text>
                <Text style={{fontWeight: '600', color: theme.textColor, fontSize: 13}}>{props.itemObj.price}</Text>
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
        
    },
    image: {
        height: 100,
        width: 100,
        marginRight: '2%'
    },
    detailscon:  {
        width: '50%'
    }
});
export default CarusellItem;