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
import StyledButton from '../UIElements/StyledButton';
import { ThemeContext } from '../../context/ThemeContext';
import ShekelPrice from '../UIElements/ShekelPrice';
interface Props {
}
const ScanModel: React.FC<Props> = () => {
  const { theme } = useContext(ThemeContext);
  const { text, background } = theme.colors   
  const {isVisibleStatus, setisVisibleStatus, AddItemToCartAttempt} = useDataContext();
  const [tagId, setTagId] = useState('');
  const [item, setItem] = useState<Itemprop | null>(null);
  const [animation, setAnimation] = useState(scanAnimation)
  const [isItemInCart, setIsItemInCart] = useState(false);
  const [title, setTitle] = useState<string>( 'Hold Your Phone near the tag');
  const {currentUser, getItemAttempt} = useDataContext();
  const [previewSuccessMessage, setPreviewSuccessMessage] = useState<boolean>(true);
  const [resultMessage, setResultMessage] = useState<string>('');
  const [previewErrorMessage, setPreviewErrorMessage] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isItemAddedCart, setisItemAddedCart] = useState<boolean>(false);
  const [isShowingMessage, setisShowingMessage] = useState<boolean>(false);
  const [isPreviewLoadingAnimation, setisPreviewLoadingAnimation] = useState<boolean>(false);
const themeColors = {
  text: '#702963',
  secondaryText: '#333333',
  backgroundColor: 'white',

}
const activitiIndicatorAnimation = (<LottieView
    style={{width: 120, height: 120, position: 'absolute', right: -50, bottom: -18}}
    speed={1} 
    source={activityIndicator}
    autoPlay
    loop={true}
/>)
  const successCartIndicatorObj = (<LottieView
      style={{width: 50, height: 50, position: 'absolute', right: -15, bottom: 2}}
      speed={1} 
      
      source={successCartIndicator}
      autoPlay
      loop={true}
/>)
const failureCartIndicatorObj = (<LottieView
        style={{width: 50, height: 50,position: 'absolute', right: -15, bottom: 2}}
        speed={1} 
        
        source={failureCartIndicator}
        autoPlay
        loop={false}
/>)
const cartbuttonanimation = (<LottieView
      style={{width: 50, height: 50,position: 'absolute', right: -15, bottom: 10}}
      speed={1} 
      source={cartbtnanimation}
      autoPlay
      loop={true}
/>)
const searchingAnimationObject = (<LottieView
  style={{width: 250, height: 250, borderRadius: 50, alignSelf: 'center'}}
  speed={1} 
  source={searchingAnimation}
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
  setResultMessage('')
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
  setResultMessage('')
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
          const itemData:Itemprop = response.data;
          setTitle(`${itemData.name} ${itemData.price}`);
          setItem(itemData);
          setisPreviewLoadingAnimation(true);
          setTimeout(() => {
            setisPreviewLoadingAnimation(false);
          }, 2000)
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
    if(currentUser && tagId){
    for(let i = 0; i < currentUser?.cart?.length; i ++){
      if(currentUser.cart[i].nfcTagCode === tagId){
        setResultMessage('Item Already in your cart !');
        setisShowingMessage(true);
        setPreviewErrorMessage(true);
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
    setisLoading(false);
    setisShowingMessage(true);
    if(isItemAdded){
      setResultMessage('Item Added Successfully');
      setPreviewSuccessMessage(true);
      setisItemAddedCart(true);

    }
    else{
      setResultMessage('Item Failed to add');
      setPreviewErrorMessage(true);
    }
};
const scanned = (
    <ModalContent style={styles.modalContent}>
         

        <View>
{
     isPreviewLoadingAnimation ? (
      <View>
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
      <Text style={{alignSelf: 'center', color: themeColors.text, fontWeight: 'bold'}}>Item Found, Fetching Details</Text>
    </View>
     
) : 
     (<View>
        <Image source={{ uri: item?.imageSource }} style={styles.image} />       
        <View style={{flexDirection: 'row', justifyContent: 'center',margin: '3%'}}>
     <View style={styles.priceAndCartView}>
         <View style={styles.textContainer}>
         <Text style={styles.textStyleName}>{item?.name} </Text>
          <ShekelPrice num={item?.price || 0}/>
            </View>

      </View></View>
              {
        isLoading ? (activitiIndicatorAnimation) : 
        (
        (!isLoading && !isShowingMessage) ? (<TouchableOpacity disabled={isItemInCart}  onPress={handleAddToCart}>
        {cartbuttonanimation}
        </TouchableOpacity>) : (
          <View>
{resultMessage === 'Item Already in your cart !' ? (failureCartIndicatorObj) : (successCartIndicatorObj)}
          </View>
        )
        )


        }
      </View>

         ) 
}
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
      <Text style={{alignSelf: 'center', color: themeColors.text, fontWeight: 'bold'}}>{title}</Text>
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
        modalStyle={[styles.modalStyle,{backgroundColor: 'beige'}]}
        footer={
          <ModalFooter style={[styles.ModalFooter]}>
            <ModalButton
            
              textStyle={[styles.ModalButtonText, {color: themeColors.secondaryText}]}
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
    justifyContent: 'space-between',
    backgroundColor: 'rgba(128, 0, 128, 0.7)',
    padding:8,
    width: 220,
    borderTopEndRadius:20,
    borderBottomLeftRadius:20,
    textAlign:'center',
    marginRight: '20%',
  },
  textStyleName:{color:'white', fontSize:15},
  textStylePrice:{color:'white', fontSize:17},
  modalContent: {
    width: 300,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  ModalButtonText: {},
  modalStyle: {
  },
  ModalFooter: {},
  imageShekel: {
    height: 12,
    width: 12,
},
});


export default ScanModel;