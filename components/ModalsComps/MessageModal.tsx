import React, {useEffect, useContext} from "react";
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import { useDataContext } from "../../context/DataContext";
import { Modal, ModalContent, ModalFooter, ModalButton } from 'react-native-modals'
import LottieView from "lottie-react-native";
import creditcardLoader from '../../assets/loadingcreditcard.json'
import { ThemeContext } from "../../context/ThemeContext";
const screen = Dimensions.get('window');

const MessageModal: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors 
  const {isMessageModalVisible} = useDataContext();
    const lottieViewYoav = (<LottieView
        style={{width: screen.width * 0.5, height: screen.height * 0.3, alignSelf: 'center'}}
        speed={1} 
        source={creditcardLoader}
        autoPlay
        loop={true}
        />)
    return (
        <View>
            <Modal
            visible={isMessageModalVisible}
            swipeThreshold={200} // default 100
            modalStyle={[styles.modalStyle, { backgroundColor: background, height: screen.height * 0.4, width: screen.width * 0.65}]}
            footer={
                <ModalFooter style={[styles.ModalFooter, {height: screen.height * 0.05, alignContent: 'center', justifyContent: 'center'}]}>
                  <ModalButton
                  disabled={true}
                  style={{height: screen.height * 0.1}}
                    textStyle={[{color: text.primary},styles.ModalButtonText]}
                    text="Checking Card Details..."
                    onPress={() => {console.log('pressed')}}
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
      modalStyle: {
        justifyContent: 'center'
      },
      ModalFooter: {},
})
export default MessageModal;