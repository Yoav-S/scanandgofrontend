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



  const animatedStyle = {
    ...style,
    backgroundColor: style.backgroundColor,
  };

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
};

export default StyledWrapper;
