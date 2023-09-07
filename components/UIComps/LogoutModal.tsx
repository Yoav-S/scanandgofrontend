import React, {useEffect} from "react";
import {View, Text, StyleSheet} from 'react-native'
import { useDataContext } from "../../context/DataContext";
import { Modal, ModalContent, ModalFooter, ModalButton } from 'react-native-modals'
import LottieView from "lottie-react-native";
import logoutLottieAnimation from '../../assets/logoutlottie.json'
import { useTheme } from "../../context/ThemeContext";

const LogoutModal: React.FC = () => {
    const {theme} = useTheme();
    const {isLogoutModal, handleLogOut, setisLogoutModal} = useDataContext();
    const lottieViewYoav = (<LottieView
        style={{width: 200, height: 200}}
        speed={1} 
        source={logoutLottieAnimation}
        autoPlay
        loop={true}
        />)
    return (
        <View>
            <Modal
            visible={isLogoutModal}
            swipeThreshold={200} // default 100
            modalStyle={styles.modalStyle}
            footer={
                <ModalFooter style={styles.ModalFooter}>
                  <ModalButton
                  style={{height: 100}}
                    textStyle={[{color: theme.textColor},styles.ModalButtonText]}
                    text="Are you sure ?"
                    onPress={() => 
                        {
                            setisLogoutModal(false);
                            handleLogOut()
                        }}
                  />
                </ModalFooter>
              }>
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
      modalStyle: {},
      ModalFooter: {},
})
export default LogoutModal;