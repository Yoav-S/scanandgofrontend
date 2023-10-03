import React, { useEffect } from 'react';
import { View, StyleSheet, Animated ,Dimensions} from 'react-native';

interface StyledWrapperProps {
  style?: object; // Allow additional styles
  children: React.ReactNode;
  route: string;
}
const { width, height } = Dimensions.get('window');

const StyledWrapper = ({ children, style, route }: StyledWrapperProps) => {
  const position = new Animated.ValueXY({ x: -width, y: 0 }); // Start off-screen


  useEffect(() => {
    Animated.timing(position, {
      toValue: { x: 0, y: 0 }, // Slide in from the left
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [route]);

  return (
    <Animated.View style={[style, { transform: position.getTranslateTransform() }]}>
      {children}
    </Animated.View>
  );
};

export default StyledWrapper;
