import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import Swiper from 'react-native-swiper';
import LottieView from "lottie-react-native";
import welcomeGirlAnimation from '../../assets/scansnimation.json';
import TitleAndArrowBack from './TitleAndArrowBack';
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import BottomNavbar from './BottomNavbar';
import ScannerOpenerSubComp from './ScannerOpenerSubComp';

const { width, height } = Dimensions.get('window');

const ScanningTourComp: React.FC = () => {
    const { theme, buttonTheme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors;
    const navigation = useNavigation<StackNavigationProp<any, 'AddCreditCardScreen'>>();

    const [currentIndex, setCurrentIndex] = useState(0);

    const onIndexChanged = (index: number) => {
        setCurrentIndex(index);
    };

    const welcomeLottieObj = (
        <LottieView
            style={{ width: 250, height: 250 }}
            speed={1}
            source={welcomeGirlAnimation}
            autoPlay
            loop={true}
        />
    );

    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <TitleAndArrowBack text='Scan Tour' onPress={() => { navigation.goBack() }} />
            <Swiper
                style={styles.wrapper}
                loop={false}
                onIndexChanged={onIndexChanged}
            >
                <View style={[styles.slide, { backgroundColor: background }]}>
                    <ScrollView style={{ flex: 1, width: '90%' }}>
                        <ScannerOpenerSubComp />
                    </ScrollView>
                </View>
                <View style={[styles.slide, { backgroundColor: background }]}>
                    <ScrollView style={{ flex: 1, width: '90%' }}>
                        <Text>dsfsdfsdfsdfsdfd</Text>
                    </ScrollView>
                </View>
                {/* Add more views for additional screens */}
            </Swiper>
            <View style={styles.dotsContainer}>
              {Array.from({ length: 2 }, (_, index) => (
                  <View
                      key={index}
                      style={[
                          styles.dot,
                          { backgroundColor: index === currentIndex ? '#007AFF' : '#D8D8D8' },
                      ]}
                  />
              ))}
            </View>
            <BottomNavbar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleCon: {
        marginTop: '5%',
        margin: '3%',
    },
    titleText: {
        fontSize: 24,
        fontWeight: '500',
    },
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        position: 'absolute',
        bottom: height * 0.15,
        left: '43%'
    },
    dot: {
      width: 20,    // Adjust width and height to change the shape
      height: 10,   // Adjust width and height to change the shape
      borderRadius: 5, // Adjust to control the roundness of the corners
      marginHorizontal: 5,
  },
});

export default ScanningTourComp;
