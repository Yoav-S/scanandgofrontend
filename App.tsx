import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Main from './components/UnvisibleComps/Main';
import { ThemeProvider } from './context/ThemeContext';
import { TokenProvider } from './context/TokenContext';
import { DataProvider } from './context/DataContext';
import { NavigationContainer } from '@react-navigation/native';
const App: React.FC = () => {
  return (
    <NavigationContainer>
    <DataProvider>
      <TokenProvider>
    <ThemeProvider>
        <Main/>
    </ThemeProvider>
    </TokenProvider>
    </DataProvider>
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default App;
