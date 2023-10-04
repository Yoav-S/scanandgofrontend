import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions , ScrollView} from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';
import { useDataContext } from '../../../context/DataContext';
import LottieView from "lottie-react-native";
import welcomeGirlAnimation from '../../../assets/welcomegirlanimation.json';
import Svg, { Circle } from 'react-native-svg'; // Import SVG components
import LetsStartScanComp from './NoTransactionCompsFolder/LetsStartScanComp';
import HelpAndSupportComp from './NoTransactionCompsFolder/HelpAndSupportComp';

const { width, height } = Dimensions.get('window');

interface Props {}

const NoTransactionComp: React.FC<Props> = () => {
  const { theme, buttonTheme } = useContext(ThemeContext);
  const { primary, secondary, text, background , circleBackground} = theme.colors;
  const { currentUser } = useDataContext();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const welcomeLottieObj = (
    <LottieView
      style={{ width: 250, height: 250}}
      speed={1} 
      source={welcomeGirlAnimation}
      autoPlay
      loop={true}
    />
  );
  const handlePageChange = (event: any) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(page);
  };
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.titleCon}>
        <Text style={[{ color: text.primary, fontWeight: '600', fontSize: 30 }]}>
          Welcome
        </Text>
        <View style={{ justifyContent: 'flex-end',  marginLeft: '5%', marginBottom: '2%' }}>
          <Animated.Text
            style={[
              { color: text.secondary, fontWeight: '300', fontSize: 14 },
              { opacity: fadeAnim },
            ]}
          >
            {currentUser?.fullName?.toLocaleUpperCase()}
          </Animated.Text>
        </View>
      </View>
      <View style={styles.lottieCon}>
        {welcomeLottieObj}
      </View>
      <View style={styles.transparentCon}>
  <Svg height={height * 0.6} width={width}>
    <Circle

      cx={width / 2}
      cy={width}
      r={width}
      fill={circleBackground}
      fill-opacity="0.3"
    />
  </Svg>
</View>
<View style={styles.dotsContainer}>
        {[0, 1].map((index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: currentPage === index ? background : '#ccc' },
              { width: currentPage === index ? 30 : 15 },
            ]}
          />
        ))}
      </View>
      <View style={styles.scrollContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handlePageChange}
      >
        <View style={styles.page}>
          <LetsStartScanComp/>
        </View>
        <View style={styles.page}>
          <HelpAndSupportComp/>
        </View>
      </ScrollView>
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
  lottieCon: {
    alignItems: 'center'
  },
  transparentCon: {
    position: 'absolute',
    top: "40%",
    alignItems: 'center',
    justifyContent: 'center'
  },
  dot: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 3
  },
  page: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: height * 0.5,
    height: 50,
    width: 150,
    alignSelf: 'center',
  },
  scrollContainer: {
    position: 'absolute',
    width: '90%',
    height: height * 0.3,
    alignSelf: 'center',
    bottom: height * 0.18,
  },

  scrollViewContent: {
    alignItems: 'center',
  },
});

export default NoTransactionComp;
