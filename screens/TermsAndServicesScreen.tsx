import react from 'react';
import {Text, View, StyleSheet, SafeAreaView , ScrollView} from 'react-native'
import { useTheme } from '../context/ThemeContext';
import TitleAndArrowBack from '../components/UIComps/TitleAndArrowBack';
import BottomNavbar from '../components/UIComps/BottomNavbar';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute } from "@react-navigation/native";

const TermsAndServicesScreen: React.FC = () => {
    const {theme} = useTheme();
    const navigation = useNavigation<StackNavigationProp<any, 'SecurityScreen'>>();

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
            <TitleAndArrowBack text='Our Terms Of Service' onPress={() => {navigation.goBack()}}/>
            <ScrollView style={styles.ScrollViewCon}>
                <Text style={[{color: theme.textColor},styles.textstyle]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing
                 elit. Proin vestibulum tortor sit amet imperdiet 
                commodo. Donec suscipit mauris a urna facilisis
                 porttitor.
                 Nam bibendum erat lacus, ac lobortis
                 diam sollicitudin a. Praesent efficitur lobortis 
                sapien, quis tempus nulla facilisis at. Sed magna
                 felis, consectetur ut vulputate eu, tincidunt at felis.
                 Maecenas cursus tincidunt mauris a vehicula.
                 Nunc sed felis vitae felis ullamcorper mattis sed ut 
                dolor.
                 Aliquam et sapien sagittis, egestas tortor vitae
                , sodales magna.
                Lorem ipsum dolor sit amet, consectetur adipiscing
                 elit. Proin vestibulum tortor sit amet imperdiet 
                commodo. Donec suscipit mauris a urna facilisis
                 porttitor.
                 Nam bibendum erat lacus, ac lobortis
                 diam sollicitudin a. Praesent efficitur lobortis 
                sapien, quis tempus nulla facilisis at. Sed magna
                 felis, consectetur ut vulputate eu, tincidunt at felis.
                 Maecenas cursus tincidunt mauris a vehicula.
                 Nunc sed felis vitae felis ullamcorper mattis sed ut 
                dolor.
                 Aliquam et sapien sagittis, egestas tortor vitae
                , sodales magna.
                Lorem ipsum dolor sit amet, consectetur adipiscing
                 elit. Proin vestibulum tortor sit amet imperdiet 
                commodo. Donec suscipit mauris a urna facilisis
                 porttitor.
                 Nam bibendum erat lacus, ac lobortis
                 diam sollicitudin a. Praesent efficitur lobortis 
                sapien, quis tempus nulla facilisis at. Sed magna
                 felis, consectetur ut vulputate eu, tincidunt at felis.
                 Maecenas cursus tincidunt mauris a vehicula.
                 Nunc sed felis vitae felis ullamcorper mattis sed ut 
                dolor.
                 Aliquam et sapien sagittis, egestas tortor vitae
                , sodales magna.
                </Text>
            </ScrollView>
            <BottomNavbar/>
        </SafeAreaView>
        )
}
export default TermsAndServicesScreen
const styles = StyleSheet.create({
    ScrollViewCon: {
        borderWidth: 2,
        margin: '3%',
        borderRadius: 8,
        padding: '4%',
        alignSelf: 'center',
        marginBottom: '40%'
    },
    container: {
        flex: 1
    },
    textstyle: {
        lineHeight: 20,
        fontWeight: '500'
    }
})