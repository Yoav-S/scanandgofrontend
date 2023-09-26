import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const splashImage = require('../images/scanandgologo.png');
const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const [imageCurrentWidth, setImageCurrentWidth] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number;

    function step(timestamp: number) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min(1, (timestamp - startTimestamp) / 600); // 2000 ms = 2 seconds
      setImageCurrentWidth(progress * width * 0.85);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);

    return () => cancelAnimationFrame(startTimestamp);
  }, []);

  return (
    <View style={[{ height: height, width: width }]}>
      <View>
        <Image style={[styles.image, { width: imageCurrentWidth }]} source={splashImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center'
  }
});

export default SplashScreen;
