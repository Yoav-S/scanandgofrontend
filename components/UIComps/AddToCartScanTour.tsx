/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import LottieView from 'lottie-react-native';
import logoutLottieAnimation from '../../assets/addtocartanimationscantour.json';
const { width, height } = Dimensions.get('window');

const AddToCartScanTour: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors;
    const drivingcartobj = (
      <LottieView
        style={{ width: 200, height: 200 , alignSelf: 'center'}}
        speed={1} 
        source={logoutLottieAnimation}
        autoPlay
        loop={false}
      />
    );
  return (
    <View>
      <View style={styles.titleCon}>
        <Text style={[{ color: text.primary, fontSize: 24, fontWeight: '600', marginTop: '5%' }]}>Add Product To Cart</Text>
      </View>
      <View style={styles.lottieCon}>
        {drivingcartobj}
      </View>
      <View style={styles.imagesCon}>
        <View style={[styles.imageTextCon, styles.topCon, {marginTop: '5%'}]}>
          <View style={styles.imageCon}>
          <Image style={styles.image} source={require('../../images/itemaddedtocart.jpg')}/>

          </View>
          <Text style={{color: text.primary, width: width * 0.5, lineHeight: 20}}>
              If the item added succesfully it will be appear at your cart list
          </Text>

        </View>
        <View style={[styles.imageTextCon, styles.topCon, {marginTop: '5%'}]}>
          <View style={styles.imageCon}>
          <Image style={styles.image} source={require('../../images/itemnotadded.jpg')}/>

          </View>
          <Text style={{color: text.primary, width: width * 0.5, lineHeight: 20}}>
              Otherwise you will see an error message and you should try add the item again.
          </Text>

        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    titleCon: {
        
    },
    imageTextCon: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    topCon: {

    },

    lottieCon: {

    },
    imagesCon: {

    },
    image: {
      height: 150,
      width: 75
    },
    imageCon: {
      width: 150,
      alignItems: 'center'
    }
});
export default AddToCartScanTour;