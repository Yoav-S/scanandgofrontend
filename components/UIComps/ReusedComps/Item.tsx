import react, {useContext, useEffect} from 'react';
import {View , Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import {ItemCompInterface} from '../../../interfaces/interfaces'
import { Icon } from 'react-native-elements';
import { ThemeContext } from '../../../context/ThemeContext';
import { useDataContext } from '../../../context/DataContext';
const Item: React.FC<ItemCompInterface> = (props) => {
    const { theme } = useContext(ThemeContext);
    const { text } = theme.colors     
    const {currentUser} = useDataContext();
    useEffect(() => {
console.log('rendered');

      }, [currentUser]);
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.image} source={{uri: props.itemObj.imageSource}}/>
            <View style={styles.contentCon}>
            <Text style={[{color: text.primary},styles.nametext]}>{props.itemObj.name}</Text>
            <Text style={[{color: text.primary},styles.wierlesstext]}>{props.itemObj.category}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[{color: text.primary, marginRight: '3%'},styles.pricetext]}>{props.itemObj.price}</Text>
            <Image source={require('../../../images/shekel.png')} style={[styles.imageShekel]}/>
            </View>
            </View>
            <Icon 
            onPress={() => {props.handleDeleteItem && props.handleDeleteItem(currentUser ? currentUser?._id : '',props.itemObj.nfcTagCode)}} 
            name="cancel" 
            size={30}
            color={text.primary}/>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: '1%',
        marginTop: '3%'
    },
    wierlesstext: {
        fontWeight: '300'
    },
    imageShekel: {
        height: 15,
        width: 15,
    },
    nametext: {
        fontSize: 16,
        fontWeight: '700'
    },
    image: {
        width: '40%',
        height: 150,
        marginRight: '3%',
    },
    pricetext: {
        fontWeight: '600'
    },
    contentCon: {
        width: '40%',
        marginRight: '3%'
    }
});
export default Item;