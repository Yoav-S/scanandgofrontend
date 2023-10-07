import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useDataContext} from '../../context/DataContext';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalButton,
} from 'react-native-modals';
import {ThemeContext} from '../../context/ThemeContext';
import LottieView from 'lottie-react-native';
import activityIndicatorAnimation from '../../assets/activitiindicator.json';
import cancelDeleteAnimation from '../../assets/cancelDeleteAnimation.json';
import deleteSuccessAnimation from '../../assets/deletesuccessanimation.json';
import deleteFailureAnimation from '../../assets/deletefailureanimation.json';
import StyledButton from '../UIElements/StyledButton';
import { Icon } from 'react-native-elements';

const screen = Dimensions.get('window');

const AreYouSureModal: React.FC = () => {
  const {theme, buttonTheme} = useContext(ThemeContext);
  const {primary, secondary, text, background} = theme.colors;
  const {
    isAreYouSureModalOpen,
    setisAreYouSureModalOpen,
    cardId,
    deleteCardAttempt,
    currentUser,
  } = useDataContext();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isPreviewSuccessAnimation, setisPreviewSuccessAnimation] =
    useState<boolean>(false);
  const [isPreviewFailureAnimation, setisPreviewFailureAnimation] =
    useState<boolean>(false);
  const [resultMessage, setresultMessage] = useState<string>('');

  const activityIndicatorobject = (
    <LottieView
      style={{width: screen.width * 0.2, height: screen.height * 0.1, alignSelf: 'center'}}
      speed={1}
      source={activityIndicatorAnimation}
      autoPlay
      loop={true}
    />
  );
  const successAnimationObject = (
    <LottieView
      style={{width: 100, height: 100}}
      speed={1}
      source={deleteSuccessAnimation}
      autoPlay
      loop={false}
    />
  );
  const failureAnimationObject = (
    <LottieView
      style={{width: 100, height: 100}}
      speed={1}
      source={deleteFailureAnimation}
      autoPlay
      loop={false}
    />
  );

  const handleDeleteCardProcess = async () => {
    setisLoading(true);
    const [isDeleted, message] = await deleteCardAttempt(
      cardId,
      currentUser?._id || '',
    );
    console.log(isDeleted);
    setisLoading(false);
    setresultMessage(message || '');
    if (isDeleted) {
      setisPreviewSuccessAnimation(true);
      setTimeout(() => {
        setisPreviewSuccessAnimation(false);
        setisAreYouSureModalOpen(false);
      }, 3000);
    } else {
      setisPreviewFailureAnimation(true);
      setTimeout(() => {
        setisPreviewFailureAnimation(false);
        setisAreYouSureModalOpen(false);
      }, 3000);
    }
  };

  return (
    <View>
      <Modal
        visible={isAreYouSureModalOpen}
        swipeDirection={[]}
        swipeThreshold={200} // default 100
        modalStyle={[styles.modalStyle, {backgroundColor: background}]}
        footer={
          <ModalFooter
            style={[
              styles.ModalFooter,
              {
                justifyContent: isLoading ? 'center' : 'flex-end'
              },
            ]}>
            {!isLoading &&
              !isPreviewSuccessAnimation &&
              !isPreviewFailureAnimation && (
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <StyledButton
                onPress={() => {setisAreYouSureModalOpen(false);}}
                text="Cancel"
                />
                <StyledButton
                onPress={handleDeleteCardProcess}
                text="Delete anyway"
                />
                </View>
              )}
            {isLoading && (
              <View style={{alignSelf: 'center', borderRadius: 150, borderWidth: 1, backgroundColor: 'black', alignItems: 'center'}}>
                {activityIndicatorobject}
              </View>
            )}
            {isPreviewSuccessAnimation && (
              <View style={{alignItems: 'center'}}>
                {successAnimationObject}
                <Text
                  style={{
                    color: 'lightgreen',
                    fontWeight: 'bold',
                    marginTop: '5%',
                  }}>
                  Credit Card deleted Successfully
                </Text>
              </View>
            )}

            {isPreviewFailureAnimation && (
              <View style={{alignItems: 'center'}}>
                {failureAnimationObject}
                <Text
                  style={{
                    color: 'crimson',
                    fontWeight: 'bold',
                    marginTop: '5%',
                  }}>
                  {resultMessage.length > 0
                    ? resultMessage
                    : 'Failed To Delete Credit Card'}
                </Text>
              </View>
            )}
          </ModalFooter>
        }
        >

        <View
          style={{alignSelf: 'center'}}>
          <Icon color={text.secondary} name="cancel" size={25} containerStyle={{alignSelf: 'flex-end'}} onPress={() => {setisAreYouSureModalOpen(false)}}/>
          <Text
            style={{
              color: text.primary,
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 16,
              marginTop: '4%'
            }}>
              Are you sure you want to delete ?
          </Text>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  priceAndCartView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  textContainer: {
    backgroundColor: 'rgba(128, 0, 128, 0.7)',
    padding: 10,

    textAlign: 'center',
  },
  textStyleName: {color: 'white', fontSize: 15},
  textStylePrice: {color: 'white', fontSize: 17},
  modalContent: {},
  ModalButtonText: {},
  modalStyle: {
    width: 300,
    height: 300,
    justifyContent: 'space-around',
  },
  ModalFooter: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    width: '90%',
    alignSelf: 'center',
  },
});
export default AreYouSureModal;
