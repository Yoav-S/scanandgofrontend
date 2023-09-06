import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Modal, ModalContent, ModalFooter, ModalButton } from 'react-native-modals'
import axios from 'axios';
import searchingAnimation   from '../../assets/searching.json'
import scanAnimation  from '../../assets/scan.json'
import notFoundAnimation  from '../../assets/notFound.json'
import cart  from '../../assets/cart.json'
import { Buffer } from 'buffer'
import LottieView from 'lottie-react-native';
import {Itemprop} from '../../interfaces/interfaces'
import { Text } from '@rneui/base';
import { useDataContext } from '../../context/DataContext';
interface Props {
}
const ScanModel: React.FC<Props> = () => {
  const {isVisibleStatus, setisVisibleStatus, AddItemToCartAttempt} = useDataContext();
  const [tagId, setTagId] = useState<string>('');
  const [item, setItem] = useState<Itemprop | null>(null);
  const [animation, setAnimation] = useState(scanAnimation)
  const [isItemInCart, setIsItemInCart] = useState(false);
  const LottieRef = useRef(null); // <---------------- Create reference variable
  const [title, setTitle] = useState<string>( 'Hold Your Phone near the tag');
  const {currentUser} = useDataContext();


  const handleReadFromNFC = async () => {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      if (tag && tag.ndefMessage && tag.ndefMessage.length > 0) {
        setAnimation(searchingAnimation)
        setTitle('Tag found, searching for item');
        const ndefRecord = tag.ndefMessage[0]; // Assuming you want to read the first NDEF record
        if (tag.id) {
          setTagId(tag.id);
        }
        const payloadBytes = ndefRecord.payload;
        const payloadString = Buffer.from(payloadBytes).toString('utf-8');
        // Prefix to remove
        const itemId = payloadString.substring(3);

        const requestBody = {
          query: {
            _id: itemId,
          },
          projection: {},
        };
        const response = await axios.post(
          'https://scan-and-go.onrender.com/items/getOne',
          requestBody,
        );
        if (response.status == 200 || response.status == 201) {
          const itemData:Itemprop = response.data[0];
          setTitle(`${itemData.name} ${itemData.price}`);
          setItem(itemData);
        }
        else{
          setTitle(`Oops somthing went wrong try another tag`);
          setAnimation(notFoundAnimation)
        }
      }
      else{
        setTitle(`Oops somthing went wrong try another tag`);
        setAnimation(notFoundAnimation)
      }
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  };
  const handleAddToCart = async () => {
    if(LottieRef != null){
      LottieRef.current.play()
    }
    setIsItemInCart(true);
    const itemInCart = {
      itemId: item?._id || '',
      nfcTagCode: tagId,
    }
    const isItemAdded : boolean = await AddItemToCartAttempt(currentUser?._id || '', itemInCart );
    console.log(isItemAdded);
    console.log(currentUser);
  };
  const scanned = (
    <ModalContent style={styles.modalContent}>
    <Image source={{ uri: item?.imageSource }} style={styles.image} />
    <View style={styles.priceAndCartView}>
        <View style={styles.textContainer}>
        <Text style={styles.textStyleName}>{item?.name} </Text>
        <Text style={styles.textStylePrice}>${item?.price}</Text>
        </View>
        <TouchableOpacity disabled={isItemInCart}  onPress={handleAddToCart}>
    <LottieView
      style={{
        width: 50, // Set the width to make it larger
        height: 50, // Set the height to make it larger
      }}
      speed={1}
      ref={LottieRef}
      autoPlay={false} 
      source={cart}
      loop={false}
    />
      </TouchableOpacity>
    </View>
  </ModalContent>
  );
  const notScanned = (
    <ModalContent style={styles.modalContent}>
    <LottieView
      style={{
        width: 200, // Set the width to make it larger
        height: 200, // Set the height to make it larger
        alignSelf: 'center', // Center horizontally
        marginVertical: 20, // Add vertical margin for spacing
      }}
      speed={1}
      source={animation}
      autoPlay
      loop={true}
    />

    <View>
      <Text>{title}</Text>
    </View>
  </ModalContent>
  );
  useEffect(() => {
    if (isVisibleStatus) {
      handleReadFromNFC();
    }
  }, [isVisibleStatus]);

  return (
    <View>
      <Modal
        onSwipeOut={() => {
          setisVisibleStatus(!isVisibleStatus);
        }}
        visible={isVisibleStatus}
        swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
        swipeThreshold={200} // default 100
        modalStyle={styles.modalStyle}
        footer={
          <ModalFooter style={styles.ModalFooter}>
            <ModalButton
              textStyle={styles.ModalButtonText}
              text="swipe to close"
              onPress={() => {console.log('pressed')}}
            />
          </ModalFooter>
        }>
        {item !== null ? scanned : notScanned}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  image:{
    width: 200,
    height: 200,
    alignSelf:'center',
  },
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
});


export default ScanModel;