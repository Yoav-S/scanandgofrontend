import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import Swiper from 'react-native-swiper';
import LottieView from "lottie-react-native";
import welcomeGirlAnimation from '../assets/scansnimation.json';
import TitleAndArrowBack from '../components/UIElements/TitleAndArrowBack';
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import BottomNavbar from '../components/UIElements/BottomNavbar';
import ScannerOpenerSubComp from '../components/UIComps/ScanningTourScreenComps/ScannerOpenerSubComp';
import ScanningItemGuideComp from '../components/UIComps/ScanningTourScreenComps/ScanningItemGuideComp';
import AddToCartScanTour from '../components/UIComps/ScanningTourScreenComps/AddToCartScanTour';
import TryYourSelfComp from '../components/UIComps/ScanningTourScreenComps/TryYourSelfComp'
const { width, height } = Dimensions.get('window');

const ScanningTourComp: React.FC = () => {
    const { theme, buttonTheme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors;
    const navigation = useNavigation<StackNavigationProp<any, 'AddCreditCardScreen'>>();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLastIndex, setislastIndex] = useState<boolean>(false);
    const onIndexChanged = (index: number) => {
        console.log(index);
        
        if(index === 3) { setislastIndex(true);}
        else            { setislastIndex(false);}
        setCurrentIndex(index);
    };


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
                        <ScanningItemGuideComp/>
                    </ScrollView>
                </View>
                <View style={[styles.slide, { backgroundColor: background }]}>
                    <ScrollView style={{ flex: 1, width: '90%' }}>
                        <AddToCartScanTour/>
                    </ScrollView>
                </View>
                <View style={[styles.tryyourselfslide ,{ backgroundColor: background }]}>
                    <ScrollView style={{ flex: 1, width: '90%' }}>
                        <TryYourSelfComp/>
                    </ScrollView>
                </View>
            </Swiper>
            { !isLastIndex && <View style={styles.dotsContainer}>
              {Array.from({ length: 4 }, (_, index) => (
                   <View
                      key={index}
                      style={[
                          styles.dot,
                          { backgroundColor: index === currentIndex ? '#007AFF' : '#D8D8D8' },
                          { width: index === currentIndex ? 40 : 20 },
                      ]}
                  />
              ))}
            </View>}
            <BottomNavbar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleText: {
        fontSize: 24,
        fontWeight: '500',
    },
    tryyourselfslide: {
        maxHeight: height * 0.8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '100%',
        alignSelf: 'center'
    },
    wrapper: {},
    slide: {
        flex: 1,
        maxHeight: height * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '100%',
        alignSelf: 'center'
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        position: 'absolute',
        bottom: height * 0.15,
        left: '31%'
    },
    dot: {
      width: 20,    // Adjust width and height to change the shape
      height: 10,   // Adjust width and height to change the shape
      borderRadius: 5, // Adjust to control the roundness of the corners
      marginHorizontal: 5,
  },
});

export default ScanningTourComp;
