import React, {useEffect, useContext, useState} from "react";
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import { useDataContext } from "../../context/DataContext";
import { Modal, ModalContent, ModalFooter, ModalButton } from 'react-native-modals'
import LottieView from "lottie-react-native";
import activityIndicatorAnimation from '../../assets/activitiindicator.json'
import { ThemeContext } from "../../context/ThemeContext";
import {Text as NativeText} from "native-base"
const screen = Dimensions.get('window');

const LoadingModal: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { background } = theme.colors;
  const { isLoadingModal, setisLoadingModal } = useDataContext();
  const [isLoading, setisLoading] = useState<boolean>(isLoadingModal);




  const activityIndicatorAnimationObject = (
    <LottieView
      style={{
        width: screen.width * 0.3,
        height: screen.height * 0.2,
        position: 'absolute',
        left: screen.width * 0.35,
        top: screen.height * 0.4,
      }}
      speed={1}
      source={activityIndicatorAnimation}
      autoPlay
      loop={true}
    />
  );

  return (
    isLoadingModal && <View style={[styles.overlay, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}>
      <View style={styles.container}>
        {activityIndicatorAnimationObject}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: screen.width,
    height: screen.height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingModal;