import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, ModalContent, ModalFooter, ModalButton } from 'react-native-modals'
import axios from 'axios';
import animationData from '../../assets/scansnimation.json'
import LottieView from 'lottie-react-native';
import { Text } from '@rneui/base';
import { useDataContext } from '../../context/DataContext';
interface Props {
}
const ScanModel: React.FC<Props> = () => {
    const [tagId, setTagId] = useState<string>('');
    // create item state and interface
    const {isVisibleStatus, setisVisibleStatus} = useDataContext();
    const [currentScanText, setCurrentScanText] = useState<string>('Hold Your Phone near the tag');
    const handleReadFromNFC = async () => {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      if (tag && tag.ndefMessage && tag.ndefMessage.length > 0) {
        setCurrentScanText('Tag found, getting item information')
        const ndefRecord = tag.ndefMessage[0]; // Assuming you want to read the first NDEF record
        if (tag.id)
         {setTagId(tag.id);}
        const payloadBytes = ndefRecord.payload;
        const payloadString = Buffer.from(payloadBytes).toString('utf-8');
       // Prefix to remove
        const itemId = payloadString.substring(3);
        console.log('NFC Tag Payload:', itemId);


        const requestBody = {
          query:{
            _id:itemId,
          },
          projection:{},
        };
        const response = await axios.post('https://scan-and-go.onrender.com/items/getOne',requestBody);
        console.log(response.data);
      }
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  };

  useEffect(() => {
    if(isVisibleStatus){
        handleReadFromNFC();
    }
  }, [isVisibleStatus]);

  return (
    <View>
      <Modal
      onSwipeOut={() => {setisVisibleStatus(!isVisibleStatus)}}
        visible={isVisibleStatus}
        swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
        swipeThreshold={200} // default 100
        modalStyle={styles.modalStylel}
        footer={
          <ModalFooter style={styles.ModalFooter} >
            <ModalButton textStyle={styles.ModalButtonText} text='swipe to close'/>
          </ModalFooter>
        }
      >
        <ModalContent style={styles.modalContent}>
            <LottieView
            style={{width: 50, height: 50}}
            speed={1}
            source={animationData}
            autoPlay
            loop={true}
            />
          <View>
            <Text>{currentScanText}</Text>
          </View>
        </ModalContent>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    modalContent: {

    },
    ModalButtonText:{

    },
    modalStylel:{

    },
    ModalFooter: {

    }
})
export default ScanModel;