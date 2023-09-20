import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useDataContext } from "../../context/DataContext";
import { Modal, ModalFooter } from 'react-native-modals'
import { ThemeContext } from "../../context/ThemeContext";
import StyledButton from "./StyledButton";
import { Icon } from 'react-native-elements';

const screen = Dimensions.get('window');

const TermsAndConditionsModal: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { background } = theme.colors
  const { isTermsModal, setisTermsModal, setisTermsButtonPressed } = useDataContext();
  const [isReadTerms, setisReadTerms] = useState<boolean>(false);

  const handleScroll = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isScrollable = contentSize.height > layoutMeasurement.height;
    setisReadTerms(isScrollable && contentOffset.y + layoutMeasurement.height >= contentSize.height - 20);
  };

  return (
    <View style={{ position: 'relative' }}>
      <Modal
        visible={isTermsModal}
        swipeThreshold={200}
        modalStyle={styles.modalStyle}
        footer={
          <ModalFooter style={[{ backgroundColor: 'white' }, styles.ModalFooter]}>
            <StyledButton
              bigbutton
              text="I have read and agree"
              disabled={!isReadTerms}
              onPress={() => {
                setisTermsButtonPressed(true);
                setisTermsModal(false);
                setisReadTerms(false);
              }}
            />
          </ModalFooter>
        }>
        <View style={{ height: screen.height * 0.8 }}>
          <View style={{ width: '70%', alignSelf: 'flex-end' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: '4%' }}>
              <Text style={{ color: background, fontWeight: 'bold' }}>Terms and conditions</Text>
              <Icon 
              name="cancel"
              onPress={() => { 
                setisTermsModal(false);
                setisReadTerms(false);
                 }} />
            </View>
          </View>
          <View style={{ height: screen.height * 0.7 }}>
            <ScrollView
              style={styles.modalContent}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              <Text style={{ color: background, lineHeight: 25 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
            optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
            obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
            nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
            tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
            sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
            recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
            minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
            quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
            fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
            consequuntur! Commodi minima excepturi repudiandae velit hic maxime
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
            optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
            obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
            nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
            tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
            sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
            recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
            minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
            quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
            fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
            consequuntur! Commodi minima excepturi repudiandae velit hic maxime
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(128, 0, 128, 0.7)',
    padding: 10,
    textAlign: 'center'
  },
  textStyleName: { color: 'white', fontSize: 15 },
  textStylePrice: { color: 'white', fontSize: 17 },
  modalContent: {
    width: screen.width * 0.9,
    alignSelf: 'center'
  },
  ModalButtonText: {},
  modalStyle: {
    borderTopEndRadius: 40,
    borderTopLeftRadius: 40,
    width: screen.width,
    height: screen.height * 0.9,
    position: 'relative',
    bottom: -screen.height * 0.05
  },
  ModalFooter: {
    height: screen.height * 0.1,
    justifyContent: 'center'
  },
})

export default TermsAndConditionsModal;
