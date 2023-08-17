import React, {useState} from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { BottomNavbarInterface } from '../../interfaces/interfaces';
import { Icon } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
const BottomNavbar: React.FC<BottomNavbarInterface> = (props) => {
  const route = useRoute();
  const [routeName, setRouteName] = useState<string>(route.name);
  const navigation = useNavigation<StackNavigationProp<any>>();
 const navigateHome = () => {
  navigation.navigate('Home');
 }
 const navigateStats = () => {
  navigation.navigate('Stats');
 }
 const navigateSettings = () => {
  navigation.navigate('Settings');
 }
 const navigateProfile = () => {
  navigation.navigate('Profile');
 }
 const triggerScan = () => {
  console.log('Scanner triggered');
  
 }
  return (
    <SafeAreaView style={styles.container}>
      <Icon name="home" size={30} color={route.name === "Home" ? 'lightblue' : 'white'} onPress={navigateHome}/>
      <Icon color={route.name === "Stats" ? 'lightblue' : 'white'} name="book" size={30} onPress={navigateStats}/>
      <View style={styles.plusIconContainer}>
      <View style={styles.plusIconSecondCon} >
        <Icon onPress={triggerScan} color="black" name="add" size={50} />
      </View>
      </View>
      <Icon name="settings" size={30} color={route.name === "Settings" ? 'lightblue' : 'white'} onPress={navigateSettings}/>
      <Icon name="person" size={30} color={route.name === "Profile" ? 'lightblue' : 'white'} onPress={navigateProfile}/>
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
    height: 80 ,
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
  plusIconSecondCon: {
    width: 70,
    height: 70,
    backgroundColor: 'lightblue',
    borderRadius: 50,
    justifyContent: 'center',
  },
});

export default BottomNavbar
