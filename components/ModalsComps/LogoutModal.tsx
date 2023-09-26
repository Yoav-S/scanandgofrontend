import React, {useEffect, useContext} from "react";
import {View, Text, StyleSheet} from 'react-native'
import { useDataContext } from "../../context/DataContext";
import { Modal, ModalContent, ModalFooter, ModalButton } from 'react-native-modals'
import LottieView from "lottie-react-native";
import logoutLottieAnimation from '../../assets/logoutlottie.json'
import { ThemeContext } from "../../context/ThemeContext";
import {Text as NativeText} from "native-base"
const LogoutModal: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors     
  const {isLogoutModal, handleLogOut, setisLogoutModal} = useDataContext();
  
    const lottieViewYoav = (<LottieView
        style={{width: 200, height: 200}}
        speed={1} 
        source={logoutLottieAnimation}
        autoPlay
        loop={true}
        />)
    return (
        <View style={{}}>
            <Modal
            visible={isLogoutModal}
            swipeDirection={["down", "up", "right", "left"]}
            swipeThreshold={200} // default 100
            modalStyle={[styles.modalStyle,{backgroundColor: background}]}
            onSwipeOut={() => {setisLogoutModal(false);}}
            footer={
                <ModalFooter style={[{backgroundColor: background},styles.ModalFooter]}>
                  <ModalButton
                    style={{height: 50, backgroundColor: 'red', margin: '10%', borderRadius: 2}}
                    textStyle={[{color: text.primary, fontSize: 12, flexWrap: 'wrap'},styles.ModalButtonText]}
                    text="Logout"
                    onPress={() => 
                        {
                            setisLogoutModal(false);
                            handleLogOut()
                        }}
                  />
                </ModalFooter>
              }>
                <NativeText color={text.primary} fontFamily={"montserrat"} margin={"2%"} fontWeight={"bold"}>swipe to cancel logout</NativeText>
                {lottieViewYoav}
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    priceAndCartView:{
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginTop:10
      },
      textContainer:{
        flexDirection: 'row',
        backgroundColor: 'rgba(128, 0, 128, 0.7)',
        padding:10,
        borderTopEndRadius:20,
        borderBottomLeftRadius:20,
        textAlign:'center'
      },
      textStyleName:{color:'white', fontSize:15},
      textStylePrice:{color:'white', fontSize:17},
      modalContent: {},
      ModalButtonText: {},
      modalStyle: {
        width: 250
      },
      ModalFooter: {
        height: 75
      },
})
export default LogoutModal;