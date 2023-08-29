import react from 'react';
import {Text, StyleSheet, View} from 'react-native'
import { TitleAndArrowBackProps } from '../../interfaces/interfaces';
import { Icon } from 'react-native-elements';
import { useTheme } from '../../context/ThemeContext';
const TitleAndArrowBack: React.FC<TitleAndArrowBackProps> = (props) => {
    const {theme} = useTheme();
    return (
        <View style={styles.titleandarrowcon}>
                      <Icon 
                      onPress={props.onPress}
                      name="arrow-left" 
                      color={'black'} 
                      size={30}
                      />

            <Text style={{color: theme.textColor, fontWeight: '700'}}>{props.text}</Text>
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