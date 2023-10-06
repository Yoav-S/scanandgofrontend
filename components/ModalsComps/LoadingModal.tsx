import React, {useEffect, useContext} from "react";
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import { useDataContext } from "../../context/DataContext";
import { Modal, ModalContent, ModalFooter, ModalButton } from 'react-native-modals'
import LottieView from "lottie-react-native";
import activityIndicatorAnimation from '../../assets/activitiindicator.json'
import { ThemeContext } from "../../context/ThemeContext";
import {Text as NativeText} from "native-base"
const screen = Dimensions.get('window');

const LoadingModal: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors     
  const {isLoadingModal, setisLoadingModal} = useDataContext();
  
    const activityIndicatorAnimationObject = (<LottieView
        style={{width: 200, height: 200}}
        speed={1} 
        source={activityIndicatorAnimation}
        autoPlay
        loop={true}
        />)
    return (
        <View style={{ position: 'relative' }}>
            <Modal
            visible={isLoadingModal}
            swipeDirection={[]}
            swipeThreshold={200} // default 100
            modalStyle={[styles.modalStyle,{backgroundColor: background}]}
            footer={
                <ModalFooter/>
              }>
              <View style={{height: screen.height}}>
              {activityIndicatorAnimationObject}
              </View>
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
export default LoadingModal;