import React from "react";
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import { useTheme } from "../context/ThemeContext";
import KorenAnimation from '../assets/koren.json'
import YoavAnimation from '../assets/yoav.json'
import LottieView from "lottie-react-native";
import BottomNavbar from "../components/UIComps/BottomNavbar";
import { IteminCartType } from "../interfaces/interfaces";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import ItemHorizontal from "../components/UIComps/ItemHorizontal";
import StyledButton from "../components/UIComps/StyledButton";
const PurchaseDetailsScreen: React.FC = () => {
    const route = useRoute(); // Use the useRoute hook to infer route types
    const { totalAmount, cart } = route.params as { totalAmount: number, cart: IteminCartType[] };

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
    const {theme} = useTheme();
    return (
        <SafeAreaView style={[styles.container,{backgroundColor: theme.backgroundColor}]}> 
        <View style={{alignSelf: 'center', marginTop: '5%'}}>
        {selectedLottieView}
        </View>
        <Text style={{color: theme.textColor, fontSize: 20, textAlign: 'center', marginTop: '5%', fontWeight: '500'}}>Purchase successfully completed</Text>
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
            <StyledButton text="Share"/>
            <StyledButton text="Go Back"/>
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
flexDirection: 'row',
},
barrier: {
    borderWidth: 0.5,
    marginTop: '3%',
    width: '95%',
    alignSelf: 'center'
}
});
export default PurchaseDetailsScreen;