import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Modal, ModalContent, ModalFooter, ModalButton } from 'react-native-modals'
import axios from 'axios';
import searchingAnimation   from '../../assets/searching.json'
import scanAnimation  from '../../assets/scan.json'
import notFoundAnimation  from '../../assets/notFound.json'
import activityIndicator from '../../assets/insertcartloader.json'
import cartbtnanimation from '../../assets/cartbuttonanimation.json'
import successCartIndicator from '../../assets/successlottieanimation.json'
import failureCartIndicator from '../../assets/failureaddtocart.json'
import cart  from '../../assets/cart.json'
import { Buffer } from 'buffer'
import LottieView from 'lottie-react-native';
import {IteminCartType, Itemprop} from '../../interfaces/interfaces'
import { Text } from '@rneui/base';
import { useDataContext } from '../../context/DataContext';
import StyledButton from './StyledButton';
interface Props {
}
const ScanModel: React.FC<Props> = () => {
  const {isVisibleStatus, setisVisibleStatus, AddItemToCartAttempt, showToast} = useDataContext();
  const [tagId, setTagId] = useState<string>('');
  const [item, setItem] = useState<Itemprop | null>(null);
  const [animation, setAnimation] = useState(scanAnimation)
  const [isItemInCart, setIsItemInCart] = useState(false);
  const LottieRef = useRef(null); // <---------------- Create reference variable
  const [title, setTitle] = useState<string>( 'Hold Your Phone near the tag');
  const {currentUser, getItemAttempt} = useDataContext();
  const [previewSuccessMessage, setPreviewSuccessMessage] = useState<boolean>(true);
  const [resultMessage, setResultMessage] = useState<string>('');
  const [previewErrorMessage, setPreviewErrorMessage] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isItemAddedCart, setisItemAddedCart] = useState<boolean>(false);
  const [isShowingMessage, setisShowingMessage] = useState<boolean>(false);
  const activitiIndicatorAnimation = (<LottieView
    style={{width: 120, height: 120, position: 'absolute', right: -50, bottom: -21}}
    speed={1} 
    source={activityIndicator}
    autoPlay
    loop={true}
    />)
    const successCartIndicatorObj = (<LottieView
      style={{width: 50, height: 50, position: 'absolute', right: -15, bottom: -25}}
      speed={1} 
      
      source={successCartIndicator}
      autoPlay
      loop={false}
      />)
      const failureCartIndicatorObj = (<LottieView
        style={{width: 50, height: 50,position: 'absolute', right: -15, bottom: -25}}
        speed={1} 
        
        source={failureCartIndicator}
        autoPlay
        loop={false}
        />)
    const cartbuttonanimation = (<LottieView
      style={{width: 50, height: 50,position: 'absolute', right: -15, bottom: -25}}
      speed={1} 
      source={cartbtnanimation}
      autoPlay
      loop={true}
      />)
 const resetModel = () =>{
  setisVisibleStatus(!isVisibleStatus);
  setItem(null);
  setisShowingMessage(false);
  setPreviewSuccessMessage(false);
  setTitle('Hold Your Phone near the tag');
  setAnimation(scanAnimation);
  setTagId('')
  setIsItemInCart(false)
 }
 const resetAbstractModel = () =>{
  setItem(null);
  setPreviewSuccessMessage(false);
  setisShowingMessage(false);
  setTitle('Hold Your Phone near the tag');
  setAnimation(scanAnimation);
  setTagId('')
  setisItemAddedCart(false);
  setIsItemInCart(false)
 }
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
        const response = await getItemAttempt(itemId);
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
    if(currentUser){
    for(let i = 0; i < currentUser?.cart?.length; i ++){
      if(currentUser.cart[i].itemId === item?._id){
        setResultMessage('Item Already in your cart !');
        setisShowingMessage(true);
        setPreviewErrorMessage(true);
        setTimeout(() => {
          
          setResultMessage('');
          setisShowingMessage(false);
          setPreviewErrorMessage(false);
        }, 4000)
        return;
      }
    }
    }
    setIsItemInCart(true);
    if(!item) { return false ; }
    const itemInCart: IteminCartType = {
      itemId: item?._id || '',
      nfcTagCode: tagId,
      name: item?.name,
      category: item?.category,
      price: item?.price,
      imageSource: item?.imageSource
    }
    setisLoading(true);
    const [isItemAdded, newCart] : [boolean, IteminCartType | null] = await AddItemToCartAttempt(currentUser?._id || '', itemInCart );     
    setisItemAddedCart(isItemAdded);
    setisLoading(false);
    setisShowingMessage(true);
    if(isItemAdded){
      setResultMessage('Item Added Successfully');
      setPreviewSuccessMessage(true);
      setTimeout(() => {
        setPreviewSuccessMessage(false);
        setResultMessage('');
        resetAbstractModel();
      }, 3000)
    }
    else{
      setResultMessage('Item Failed to add');
      setPreviewErrorMessage(true);
      setTimeout(() => {
        setResultMessage('');
        setPreviewErrorMessage(false);
      }, 4000)
    }
   };
  const scanned = (
    <ModalContent style={styles.modalContent}>
    <Image source={{ uri: item?.imageSource }} style={styles.image} />
    <View style={{flexDirection: 'row', justifyContent: 'center',margin: '3%'}}>
    <View style={styles.priceAndCartView}>
        <View style={styles.textContainer}>
        <Text style={styles.textStyleName}>{item?.name} </Text>
        <Text style={styles.textStylePrice}>${item?.price}</Text>
        
        </View>

        {
        isLoading ? (activitiIndicatorAnimation) : 
        (
        (!isLoading && !isShowingMessage) ? (<TouchableOpacity disabled={isItemInCart}  onPress={handleAddToCart}>
        {cartbuttonanimation}
        </TouchableOpacity>) : (
          <View>
            {isItemAddedCart ? (<View>
              {successCartIndicatorObj}
            </View>) : (<View>
              {failureCartIndicatorObj}
            </View>)}
          </View>
        )
        )


        }
      </View>
</View>
{
       (previewSuccessMessage || previewErrorMessage) &&  <View style={{bottom: 0,position: 'absolute', alignSelf: 'center'}}>
          <Text style={{color: resultMessage === 'Item Added Successfully' ? 'green' : 'red', fontWeight: 'bold'}}>{resultMessage}</Text>
        </View>
      }
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
          resetModel();
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
     alignItems: 'center',
     marginTop:10,
  },
  textContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(128, 0, 128, 0.7)',
    padding:10,
    width: 200,
    borderTopEndRadius:20,
    borderBottomLeftRadius:20,
    textAlign:'center',
    marginRight: '20%',
  },
  textStyleName:{color:'white', fontSize:15},
  textStylePrice:{color:'white', fontSize:17},
  modalContent: {
    margin: '2%',
    width: 300,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  ModalButtonText: {},
  modalStyle: {},
  ModalFooter: {},
});


export default ScanModel;