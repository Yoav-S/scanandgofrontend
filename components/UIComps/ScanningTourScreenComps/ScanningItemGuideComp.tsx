/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';
import LottieView from "lottie-react-native";
import scanproductanimation from '../../../assets/scanproductanimation.json';

const ScanningItemGuideComp: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors;



    const scanProductAnimationObj = (
        <LottieView
          style={{ width: 150, height: 150, transform: [{ rotate: '180deg' }] }}
          speed={1} 
          source={scanproductanimation}
          autoPlay
          loop={true}
        />
      );
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.titleCon}>
      <Text style={[{ color: text.primary, fontSize: 24, fontWeight: '600', marginTop: '5%' }]}>
          Scan Product 
        </Text>
        <Text style={{color: text.primary, marginTop: '5%', lineHeight: 20, width: '100%'}}>
                Hold your phone in front of your product ticket tag.
        </Text>
        <View style={styles.holdyourPhoneCon}>
            <View style={styles.amimationCon}>
                {scanProductAnimationObj}
            </View>
            <View style={styles.animationContentCon}>
                    <Text style={[styles.contentText, {color: text.primary}]}>Catch The product tag, by holding the phone infront of the product</Text>
            </View>
        </View>
        <View style={styles.holdyourPhoneCon}>
            <View style={styles.amimationCon}>
                <Image style={styles.image} source={require('../../../images/itemfoundimage.jpg')}/>
            </View>
            <View style={styles.animationContentCon}>
                    <Text style={[styles.contentText, {color: text.primary}]}>When the item previewed at the modal, you can select if to add it to your cart, or to cancel by swipe the modal</Text>
            </View>
        </View>
        <View style={[styles.holdyourPhoneCon, {marginTop: '15%'}]}>
            <View style={styles.amimationCon}>
            <Image style={styles.image} source={require('../../../images/itemnotfoundimage.jpg')}/>
            </View>
            <View style={styles.animationContentCon}>
                    <Text style={[styles.contentText, {color: text.primary}]}>In case that item not found, please speak to store manager / Checkout Seller.</Text>
            </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    titleCon: {
        width: '95%'
    },
    contentText: {
        fontSize: 16,
        lineHeight: 25
    },
    image: {
        height: 150,
        width: 75
    },
    holdyourPhoneCon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '5%',
        width: '100%',
    },
    amimationCon: {
        width: 150,
        alignItems: 'center'
    },
    animationContentCon: {
        width: '55%'
    }
});
export default ScanningItemGuideComp;