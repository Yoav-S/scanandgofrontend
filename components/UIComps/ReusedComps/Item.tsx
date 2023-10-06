import react, {useContext, useEffect} from 'react';
import {View , Text, StyleSheet, SafeAreaView, Image, Dimensions} from 'react-native';
import {ItemCompInterface} from '../../../interfaces/interfaces'
import { Icon } from 'react-native-elements';
import { ThemeContext } from '../../../context/ThemeContext';
import { useDataContext } from '../../../context/DataContext';
import ShekelPrice from '../../UIElements/ShekelPrice';
const { width, height } = Dimensions.get('window');

const Item: React.FC<ItemCompInterface> = (props) => {
    const { theme } = useContext(ThemeContext);
    const { text } = theme.colors     
    const {currentUser} = useDataContext();
    useEffect(() => {

      }, [currentUser]);
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.image} source={{uri: props.itemObj.imageSource}}/>
            <View style={styles.contentCon}>
            <Text style={[{color: text.primary},styles.nametext]}>{props.itemObj.name}</Text>
            <Text style={[{color: text.primary},styles.wierlesstext]}>{props.itemObj.category}</Text>
            <ShekelPrice num={props.itemObj.price}/>

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
        marginTop: '3%',
        alignSelf: 'center'
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
        width: width * 0.36,
        height: height * 0.18,
        marginRight: '3%',
        borderRadius: 8
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