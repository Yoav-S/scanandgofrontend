import React from 'react';
import { View, StyleSheet } from 'react-native';
import Main from './components/UnvisibleComps/Main';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Main />
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
