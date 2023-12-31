import React, {useState, useEffect,useContext} from 'react';
import { SafeAreaView, View,Text ,StyleSheet, Dimensions } from 'react-native';
import { BottomNavbarInterface } from '../../interfaces/interfaces';
import { Icon } from 'react-native-elements';

import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useDataContext } from '../../context/DataContext';
import { ThemeContext } from '../../context/ThemeContext';
const screen = Dimensions.get('window');

const BottomNavbar: React.FC<BottomNavbarInterface> = (props) => {
  const route = useRoute();
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors 
  const [routeName, setRouteName] = useState<string>(route.name);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const {isVisibleStatus,setisVisibleStatus, currentUser, amountofitemsvariable, setamountofitemsvariable} = useDataContext();  
 const navigateHome = () => {
  navigation.navigate('Home');
 }
 const navigateCart = () => {
  navigation.navigate('CartScreen');
 }
 const navigateSettings = () => {
  navigation.navigate('Settings');
 }
 const navigateProfile = () => {
  navigation.navigate('Stats');
 }
 const triggerScan = () => {
  setisVisibleStatus(!isVisibleStatus);
}


useEffect(() => {
setamountofitemsvariable(currentUser?.cart.length || 0)
}, [currentUser]); 
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', width: 125}}>

  
      <Icon name="home" size={30} color={
      route.name === "Home" || 
      route.name === "ScanningTour"
      ? 'black' : 'white'} onPress={navigateHome}/>
      <View style={{flexDirection: 'row'}}>
      {amountofitemsvariable > 0 && ( 
        <Text style={[{ color: 'white', backgroundColor: 'red', borderRadius: 50, width: 18, textAlign: 'center', fontSize: 12  }, styles.amountvariable]}>
          {currentUser?.cart.length}
        </Text>
      )}
      <Icon color={route.name === "CartScreen" || 
      route.name === 'CheckoutScreen' ||
      route.name === 'PurchaseScreen' ? 
      'black' :
       'white' } 
       name="shopping-cart" size={30} onPress={navigateCart}/>
      </View>
      </View>
      <View style={styles.plusIconSecondCon}>
        <Icon onPress={triggerScan} color="black" name="nfc" size={50} />
      </View>
      <View style={{flexDirection: 'row' , justifyContent: 'space-around', width: 125}}>

      <Icon 
      name="settings" 
      size={30} 
      color={route.name === "Settings" 
      || route.name === "EditProfile" 
      || route.name === "SecurityScreen" 
      || route.name === "PaymentMethodsScreen" 
      || route.name === "TermsAndServicesScreen" 
      || route.name === "ProblemReport"
      || route.name === "HelpAndSupportScreen"
      || route.name === "AddCreditCardScreen"
      ? 'black' : 'white'} 
      onPress={navigateSettings}/>
      <Icon name="bar-chart" type='ion-icons' size={30} color={route.name === "Stats" ? 'black' : 'white'} onPress={navigateProfile}/>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#E6942B',
    position: 'absolute',
    padding: '4%',
    bottom: 0,
    width: '100%',
    marginBottom: '1%',
    borderRadius: 14
  },
  amountvariable: {
    position: 'absolute',
    top: -10,
    zIndex: 10,
    left: 20,
    fontWeight: 'bold'
  },
  plusIconSecondCon: {
    width: 70,
    height: 70,
    backgroundColor: 'lightblue',
    borderRadius: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: '44%',
    bottom: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // This is for Android
  },
  
  
});

export default BottomNavbar
