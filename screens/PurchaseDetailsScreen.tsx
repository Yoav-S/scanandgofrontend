import React, {useContext, useEffect} from "react";
import {View, Text, StyleSheet, SafeAreaView, BackHandler} from 'react-native';
import KorenAnimation from '../assets/koren.json'
import YoavAnimation from '../assets/yoav.json'
import LottieView from "lottie-react-native";
import BottomNavbar from "../components/UIElements/BottomNavbar";
import { IteminCartType } from "../interfaces/interfaces";
import { ScrollView } from "react-native-gesture-handler";
import ItemHorizontal from "../components/UIComps/PurchaseDetailsScreenComps/ItemHorizontal";
import StyledButton from "../components/UIElements/StyledButton";
import { ThemeContext } from "../context/ThemeContext";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute, RouteProp  } from "@react-navigation/native";

const PurchaseDetailsScreen: React.FC = () => {
    const route = useRoute(); // Use the useRoute hook to infer route types
    const { totalAmount, cart } = route.params as { totalAmount: number, cart: IteminCartType[] };
    const navigation = useNavigation<StackNavigationProp<any>>();

    const lottieViewYoav = (<LottieView
    style={{width: 170, height: 170}}
    speed={1} 
    source={KorenAnimation}
    autoPlay
    loop={true}
    />)
    const lottieViewKoren = (<LottieView
    style={{width: 170, height: 170}}
    speed={1} 
    source={YoavAnimation}
    autoPlay
    loop={true}
    />  )

    const randomIndex = Math.random() < 0.5 ? 0 : 1;
    const selectedLottieView = randomIndex === 0 ? lottieViewYoav : lottieViewKoren;
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors     

    useEffect(() => {
        // Add an event listener for the back button press
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        // Clean up the event listener on component unmount
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, []);

    const handleSharePurchaseDetails = () => {
        console.log('shared');
    }

    const handleBackPress = () => {
        navigation.navigate('Home')
        return true;
    };
    return (
        <SafeAreaView style={[styles.container,{backgroundColor: background}]}> 
        <View style={{alignSelf: 'center', marginTop: '5%'}}>
        {selectedLottieView}
        </View>
        <Text style={{color: text.primary, fontSize: 20, textAlign: 'center', marginTop: '5%', fontWeight: '500'}}>Purchase successfully completed</Text>
        <View style={styles.barrier}/>
        <ScrollView style={styles.scrollViewCon}>
            {cart.map((cartItem: IteminCartType) => {
                return(
                    <ItemHorizontal
                    key={cartItem.itemId}
                    cartItem={cartItem}
                    totalAmount={totalAmount}
                    />
                )
            })}
        </ScrollView>
        <View style={styles.btnCon}>
            <StyledButton onPress={handleSharePurchaseDetails} text="Share"/>
            <StyledButton onPress={handleBackPress} text="Return Home"/>
        </View>
        <BottomNavbar/>
                </SafeAreaView>
    )
}
const styles = StyleSheet.create({
container: 
{
    flex: 1
},
scrollViewCon: {
 marginTop: '5%',
},
btnCon: {
    flex: 1,
    position: 'absolute',
    bottom: '30%',
    left: '11%',
    flexDirection: 'row'
},
barrier: {
    borderWidth: 0.5,
    marginTop: '3%',
    width: '95%',
    alignSelf: 'center'
}
});
export default PurchaseDetailsScreen;