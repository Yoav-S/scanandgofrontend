import React, {useState, useEffect,useContext} from 'react';
import { SafeAreaView, View,Text ,StyleSheet } from 'react-native';
import { BottomNavbarInterface } from '../../interfaces/interfaces';
import { Icon } from 'react-native-elements';

import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useDataContext } from '../../context/DataContext';
import { ThemeContext } from '../../context/ThemeContext';
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
}, [amountofitemsvariable]); 
 
  return (
    <SafeAreaView style={styles.container}>
      <Icon name="home" size={30} color={route.name === "Home" ? 'lightblue' : 'white'} onPress={navigateHome}/>
      <View style={{flexDirection: 'row'}}>
      {amountofitemsvariable > 0 && (
        <Text style={[{ color: 'red' }, styles.amountvariable]}>
          {amountofitemsvariable}
        </Text>
      )}
      <Icon color={route.name === "CartScreen" ? 'lightblue' : 'white'} name="shopping-cart" size={30} onPress={navigateCart}/>
      </View>
      <View style={styles.plusIconContainer}>
      <View style={styles.plusIconSecondCon}>
        <Icon onPress={triggerScan} color="black" name="nfc" size={50} />
      </View>
      </View>
      <Icon name="settings" size={30} color={route.name === "Settings" ? 'lightblue' : 'white'} onPress={navigateSettings}/>
      <Icon name="person" type='ion-icons' size={30} color={route.name === "Stats" ? 'lightblue' : 'white'} onPress={navigateProfile}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#1D2B32',
    position: 'absolute',
    bottom: 0,
    width: '98%',
    height: 70 ,
    paddingBottom: 10,
    marginBottom: '1%',
    borderRadius: 14
  },
  plusIconContainer: {
    width: 90,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20%',
    position: 'relative',
  },
  amountvariable: {
    position: 'absolute',
    top: -10,
    zIndex: 10,
    left: -5,
    fontWeight: 'bold'
  },
  plusIconSecondCon: {
    width: 70,
    height: 70,
    backgroundColor: 'lightblue',
    borderRadius: 50,
    justifyContent: 'center',
  },
});

export default BottomNavbar
