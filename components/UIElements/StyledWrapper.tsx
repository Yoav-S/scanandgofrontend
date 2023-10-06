import React, { useContext } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
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

  const { theme } = useContext(ThemeContext);

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
