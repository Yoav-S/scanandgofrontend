import react, {useContext} from 'react';
import {Text, StyleSheet, View} from 'react-native'
import { TitleAndArrowBackProps } from '../../interfaces/interfaces';
import { Icon } from 'react-native-elements';
import { ThemeContext } from '../../context/ThemeContext';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


const TitleAndArrowBack: React.FC<TitleAndArrowBackProps> = (props) => {

    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors     
    return (
        <View style={[styles.titleandarrowcon, {backgroundColor: background}]}>
            <FontAwesomeIcon 
            name="arrow-left" 
            size={25} color={text.secondary}             
            onPress={props.onPress}
            />

            <Text style={{color: text.primary, fontWeight: '700'}}>{props.text}</Text>
            </View>
    )
} 
export default TitleAndArrowBack

const styles = StyleSheet.create({
    titleandarrowcon: {
        flexDirection: 'row',
        width: '65%',
        alignItems: 'center',
        padding: '3%',
        justifyContent: 'space-between'
    }
})