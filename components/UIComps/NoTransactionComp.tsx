import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { useDataContext } from '../../context/DataContext';

interface Props {}

const NoTransactionComp: React.FC<Props> = () => {
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors;
  const { currentUser } = useDataContext();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.titleCon}>

        <Text style={[{ color: text.primary, fontWeight: '600', fontSize: 30 }]} >
        Welcome
          </Text>
        <View style={{ justifyContent: 'flex-end', marginBottom: '1%', marginLeft: '5%' }}>

          <Animated.Text
          style={[
            { color: text.secondary, fontWeight: '300', fontSize: 14 },
            { opacity: fadeAnim },
          ]}
        >
          
          {currentUser?.fullName.toLocaleUpperCase()}
        </Animated.Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleCon: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%',
  },
});

export default NoTransactionComp;
