import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Main from './components/UnvisibleComps/Main';
import NfcManager from 'react-native-nfc-manager';
import { ThemeProvider } from './context/ThemeContext';
import { TokenProvider } from './context/TokenContext';
import { DataProvider } from './context/DataContext';
import { ModalPortal } from 'react-native-modals';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
NfcManager.start();
const App: React.FC = () => {
  return (
    <NativeBaseProvider>

    <NavigationContainer>
    <DataProvider>
      <TokenProvider>
    <ThemeProvider>
        <Main/>
        <ModalPortal/>
    </ThemeProvider>
    </TokenProvider>
    </DataProvider>
    </NavigationContainer>
    </NativeBaseProvider>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default App;
