import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const Main: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <Text style={{ color: theme.textColor }}>Hello, themed world!</Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Text>Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
