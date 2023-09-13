import React, {useEffect, useContext, useState} from "react";
import {View, Text, StyleSheet} from 'react-native'
import { useDataContext } from "../../context/DataContext";
import { Modal, ModalContent, ModalFooter, ModalButton } from 'react-native-modals'
import { ThemeContext } from "../../context/ThemeContext";
import LottieView from "lottie-react-native";
import trashAnimation from '../../assets/trashanimation.json'
const AreYouSureModal: React.FC = () => {
  const { theme, buttonTheme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors 
  const {isAreYouSureModalOpen, setisAreYouSureModalOpen, setTriggerDeleteCard, triggerDeleteCard} = useDataContext();
  const trashAnimationObject = (<LottieView
    style={{width: 200, height: 200}}
    speed={1} 
    source={trashAnimation}
    autoPlay
    loop={true}
    />)
    return (
        <View>
            <Modal
            visible={isAreYouSureModalOpen}
            swipeDirection={["down", "up", "right", "left"]}
            swipeThreshold={200} // default 100
            modalStyle={[styles.modalStyle, {backgroundColor: background}]}
            onSwipeOut={() => {setisAreYouSureModalOpen(false);}}
            footer={
                <ModalFooter style={[styles.ModalFooter, {justifyContent: 'center'}]}>
                    <Text style={{color: text.primary, alignSelf:'center', marginTop: '10%', fontWeight: 'bold', fontSize: 18}}>Swipe to cancel</Text>
                </ModalFooter>
                
              }>
                <ModalButton
                    style={{ backgroundColor: 'red',  borderRadius: 8, height: 50, width: 150, maxHeight: 65}}
                    textStyle={[{color: text.primary, fontSize: 14,},styles.ModalButtonText]}
                    text="Delete Card"
                    onPress={() => 
                        {
                        setTriggerDeleteCard(!triggerDeleteCard)
                        setisAreYouSureModalOpen(false);
                        }}
                  />
                  
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    priceAndCartView:{
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginTop:10
      },
      textContainer:{
        backgroundColor: 'rgba(128, 0, 128, 0.7)',
        padding:10,

        textAlign:'center'
      },
      textStyleName:{color:'white', fontSize:15},
      textStylePrice:{color:'white', fontSize:17},
      modalContent: {},
      ModalButtonText: {},
      modalStyle: {
        width: 300,
        height: 300,
        justifyContent: 'space-around'
      },
      ModalFooter: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        alignSelf: 'center',
    },
})
export default AreYouSureModal;