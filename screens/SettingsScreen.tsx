import React, {useContext} from "react";
import { TextInput, StyleSheet, SafeAreaView , Text, View} from "react-native";
import { SettingsScreenType } from "../interfaces/interfaces";
import BottomNavbar from "../components/UIElements/BottomNavbar";
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { ThemeContext } from "../context/ThemeContext";
import BigTitle from "../components/UIElements/BigTitle";
import { useDataContext } from "../context/DataContext";
const SettingsScreen: React.FC<SettingsScreenType> = (props) => {
  const { theme, buttonTheme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors   
  const navigation = useNavigation<StackNavigationProp<any, 'SettingsScreen'>>();
  const {handleLogOut, isLogoutModal, setisLogoutModal} = useDataContext();

  const handleLogOutModal = () => {
    setisLogoutModal(true);
  }
  return (
    <SafeAreaView style={[{backgroundColor: background},styles.container]}>
        <View style={styles.titleAndSettingsIcon}>
        <Icon name="settings" size={30} color={text.primary}/>
          <BigTitle title="Settings"/>
        </View>
        <View style={[styles.topCon,styles.marginTopCon]}>
        <Text style={[styles.formTitle, {color: text.primary, fontWeight: '600'}]}>Account</Text>
        <View style={[styles.formCon, styles.firstCon, {backgroundColor: buttonTheme.buttonMain.background}]}>
        <Button
        icon={{
          name: "person",
          size: 25,
          color: "black"
        }}
        onPress={() => {navigation.navigate('EditProfile', {cameFrom: 'EditProfile'})}}
        title="Edit Profile"
        titleStyle={{color: 'black', fontSize: 14, marginLeft: '5%'}}
        buttonStyle={styles.button}
        />
        <Button
        icon={{
          name: "shield",
          size: 25,
          color: "black",
        }}
        onPress={() => {navigation.navigate('SecurityScreen', {cameFrom: 'SecurityScreen'})}}
        title="Security"
        titleStyle={{color: 'black', fontSize: 14, marginLeft: '5%'}}
        buttonStyle={styles.button}
        />
        <Button
        icon={{
          name: "credit-card",
          size: 25,
          color: "black"
        }}
        onPress={() => {navigation.navigate('PaymentMethodsScreen', {cameFrom: 'PaymentMethodsScreen'})}}
        title="Payment Methods"
        titleStyle={{color: 'black', fontSize: 14, marginLeft: '5%'}}
        buttonStyle={styles.button}
        />
        </View>
        </View>
        <View style={styles.topCon}>
        <Text style={[styles.formTitle, {color: text.primary, fontWeight: '600'}]}>Support & About</Text>
        <View style={[styles.formCon, styles.firstCon, {backgroundColor: buttonTheme.buttonMain.background}]}>
        <Button
        icon={{
          name: "help",
          size: 25,
          color: "black"
        }}
        onPress={() => {navigation.navigate('HelpAndSupportScreen', {cameFrom: 'HelpAndSupportScreen'})}}
        title="Help & Support"
        titleStyle={{color: 'black', fontSize: 14, marginLeft: '5%'}}
        buttonStyle={styles.button}
        />
        <Button
        icon={{
          name: "headset",
          size: 25,
          color: "black",
          type: 'font-awesome-5'
        }}
        onPress={() => {navigation.navigate('TermsAndServicesScreen', {cameFrom: 'TermsAndServicesScreen'})}}
        title="Terms and Policies"
        titleStyle={{color: 'black', fontSize: 14, marginLeft: '5%'}}
        buttonStyle={styles.button}
        />
        </View>
        </View>
        <View style={styles.topCon}>
        <Text style={[styles.formTitle, {color: text.primary, fontWeight: '600'}]}>Actions</Text>
        <View style={[styles.formCon, styles.firstCon, {backgroundColor: buttonTheme.buttonMain.background}]}>
        <Button
        icon={<Icon name={`bug`} style={{color: 'black'}} type='font-awesome' />}
        onPress={() => {navigation.navigate('ProblemReport', {cameFrom: 'Settings'});}}
        title="Report a problem"
        titleStyle={{color: 'black', fontSize: 14, marginLeft: '5%'}}
        buttonStyle={[styles.button, {marginLeft: '2%'}]}
        />
        <Button
        icon={{
          name: "logout",
          size: 25,
          color: "black",
        }}
        onPress={handleLogOutModal}  
        title="Log out"
        titleStyle={{color: 'black', fontSize: 14, marginLeft: '5%'}}
        buttonStyle={styles.button}
        />
        </View>
        </View>
        <BottomNavbar/>
        
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    colorBlack: {
        color: 'black'
    },
    icon: {

    },
    formCon: {
      marginTop: '3%',
    },
    marginTopCon: {
      marginTop: '10%',

    },
    topCon: {
      marginTop: '5%',
      alignSelf:'center',
      width: '80%',
      elevation: 4
    },
    firstCon: {
      borderRadius: 8
    },
    container: {
      flex: 1,
  },
  formTitle: {

  },
  titleAndSettingsIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    justifyContent: 'space-between',
    padding: '2%'
  },
  button: {
    backgroundColor: 'none',
    color: 'black',
    fontSize: 14,
    width: '100%',
    justifyContent: "flex-start",
  }
});

export default SettingsScreen;

