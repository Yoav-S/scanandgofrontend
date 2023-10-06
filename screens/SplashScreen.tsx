import React, { useState, useEffect, useContext } from "react";
import { View, Image, StyleSheet, Dimensions, Text, Animated } from 'react-native';
import LottieView from "lottie-react-native";
import activityIndicatorAnimation from '../assets/activitiindicator.json'
import { ThemeContext } from "../context/ThemeContext";

const splashImage = require('../images/scanandgologo.png');
const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const {theme, buttonTheme} = useContext(ThemeContext);
  const {primary, secondary, text, background, loadingBackground} = theme.colors;
  const [imageCurrentWidth, setImageCurrentWidth] = useState<number>(0);
  const [finishPreviewLogo, setFinishPreviewLogo] = useState<boolean>(false);
  const [fadeAnimation] = useState(new Animated.Value(0)); // Initialize fade animation value

  const activityIndicatorAnimationObject = (
    <LottieView
      style={{width: 75, height: 75 , zIndex: 10, margin: '3%', alignSelf: 'center'}}
      speed={1} 
      source={activityIndicatorAnimation}
      autoPlay
      loop={true}
    />
  )

  useEffect(() => {
    let startTimestamp: number;

    function step(timestamp: number) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min(1, (timestamp - startTimestamp) / 600); // 2000 ms = 2 seconds
      setImageCurrentWidth(progress * width * 0.85);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setFinishPreviewLogo(true);
        afterLogoTriggerFunction();
      }
    }

    requestAnimationFrame(step);

    return () => cancelAnimationFrame(startTimestamp);
  }, []);

  const afterLogoTriggerFunction = () => {
    setTimeout(() => {
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true, // Add this line
      }).start();
    }, 500);
  }

  return (
    <View style={[{ height: height, width: width, backgroundColor: finishPreviewLogo ? loadingBackground : background}]}>
      <View>
        <Image style={[styles.image, { width: imageCurrentWidth }]} source={splashImage} />
      </View>
      {finishPreviewLogo && (
        <Animated.View style={{ opacity: fadeAnimation }}>
          {activityIndicatorAnimationObject}
          <Text style={[styles.text, {color: text.primary}]}>Please Wait Few Seconds...</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center'
  },
  text: {
    textAlign: 'center'
  }
});

export default SplashScreen;
