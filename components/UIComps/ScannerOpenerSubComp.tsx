import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import LottieView from "lottie-react-native";
import logoutLottieAnimation from '../../assets/mousepointer.json';

const { width, height } = Dimensions.get('window');
const image = require('../../images/scanmodalimage.jpg');

const ScannerOpenerSubComp: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors;
  const [opacity] = useState(new Animated.Value(0)); // Initial opacity is set to 0

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 1,  // Set opacity to 1
        duration: 500,  // Animation duration in milliseconds (0.5 seconds)
        useNativeDriver: true,  // Use native driver for better performance
      }).start();
    }, 2500); // Show after 3 seconds

    return () => {
      clearTimeout(timer); // Clean up timer on component unmount
    };
  }, [opacity]);

  const clickAnimation = (
    <LottieView
      style={{ width: 100, height: 100, transform: [{ rotate: '180deg' }] }}
      speed={1} 
      source={logoutLottieAnimation}
      autoPlay
      loop={false}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.titleCon}>
        <Text style={[{ color: text.primary, fontSize: 24, fontWeight: '600', marginTop: '5%' }]}>
          Open Scanner
        </Text>
        <Text style={{color: text.primary, marginTop: '5%'}}>
            By clicking at the middle button once
        </Text>
      </View>
      <View style={styles.contentCon}>
        <View style={styles.NavigatorImageCon}>
          <Image source={require('../../images/navbardark.jpg')} style={styles.navigatorimage} />
        </View>
        <View style={{ position: 'absolute', bottom: height * 0.05, alignSelf: 'center' }}>
          {clickAnimation}
        </View>
        <Animated.View 
          style={{
            position: 'absolute', 
            bottom: height * 0.2, 
            alignSelf: 'center',
            opacity: opacity, // Use animated opacity
          }}
        >
          <Image style={styles.scanmodalimage} source={image}/>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  NavigatorImageCon: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center'
  },
  titleCon: {
    width: '90%'
  },
  navigatorimage: {
    width: 250,
    height: 80,
    alignSelf: 'center',
  },
  contentCon: {
    height: height * 0.6,
    position: 'relative',
    zIndex: 10
  },
  scanmodalimage: {
    height: 200,
    width: 150
  }
});

export default ScannerOpenerSubComp;
