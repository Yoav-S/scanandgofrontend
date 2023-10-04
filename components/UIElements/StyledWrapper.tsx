import React, { useEffect, useState } from 'react';
import { View, Animated, Dimensions } from 'react-native';

interface StyledWrapperProps {
  style: StyleObj; 
  children: React.ReactNode;
  route: string;
}

interface StyleObj {
  backgroundColor: string;
  flex: number;
}

const StyledWrapper = ({ children, style, route }: StyledWrapperProps) => {
  const [backgroundOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(backgroundOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [route]);

  const animatedStyle = {
    ...style,
    backgroundColor: style.backgroundColor || 'transparent',
    opacity: backgroundOpacity,
  };

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
};

export default StyledWrapper;
