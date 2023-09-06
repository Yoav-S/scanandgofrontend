import react from 'react';
import {View , Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import {ItemCompInterface} from '../../interfaces/interfaces'
import { Icon } from 'react-native-elements';
import { useTheme } from '../../context/ThemeContext';
import { useDataContext } from '../../context/DataContext';
const Item: React.FC<ItemCompInterface> = (props) => {
    console.log(props.itemObj);
    const {theme} = useTheme();
    const {currentUser} = useDataContext();

     

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.image} source={{uri: props.itemObj.imageSource}}/>
            <View style={styles.contentCon}>
            <Text style={[{color: theme.textColor},styles.nametext]}>{props.itemObj.name}</Text>
            <Text style={[{color: theme.textColor},styles.wierlesstext]}>{props.itemObj.category}</Text>
            <Text style={[{color: theme.textColor},styles.pricetext]}>{props.itemObj.price}</Text>
            </View>
            <Icon onPress={() => {props.handleDeleteItem && props.handleDeleteItem(currentUser ? currentUser?._id : '',props.itemObj.nfcTagCode)}} name="cancel" size={30}/>
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
    nametext: {
        fontSize: 16,
        fontWeight: '700'
    },
    image: {
        width: '40%',
        height: 150,
        marginRight: '3%'
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