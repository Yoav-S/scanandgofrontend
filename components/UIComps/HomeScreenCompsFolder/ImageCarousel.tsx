import React, {useContext} from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import {ImageCarouselProps} from '../../../interfaces/interfaces';
import { ThemeContext } from '../../../context/ThemeContext';
const {width, height} = Dimensions.get('window');
  
  const SPACING = 5;
  const ITEM_LENGTH = width * 0.9; // Item is a square. Therefore, its height and width are of the same length.
  const BORDER_RADIUS = 20;
  
// ... (other imports and styles)

// ... (other imports and styles)

const ImageCarousel: React.FC<ImageCarouselProps> = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors     
  return (
      <View style={[styles.container, {backgroundColor: 'white', elevation: 12}]}>
        <FlatList
        disableIntervalMomentum
          data={data}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={{ width: ITEM_LENGTH, alignItems: 'center',padding: '3%', height: 250  }}>
                <View >
                  <Image style={{width: width * 0.5, height: height * 0.27}} source={{ uri: item.imageSource }}  />
                  <View style={{position: 'absolute', zIndex: 10, backgroundColor: 'pink', padding: '3%', alignItems: 'center', justifyContent: 'center',borderBottomStartRadius: 18, borderTopEndRadius: 18, bottom: -5, left: -30}}>
                  <Text style={{color: text.primary, fontWeight: '600'}} numberOfLines={1}>
                    {item.name}
                  </Text>
                  </View>
                </View>
              </View>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.itemId}-${index}`} // Ensure each key is unique
          snapToInterval={ITEM_LENGTH}
        />
        <View>
          
        </View>
      </View>
    );
  };
  
  
  
export default ImageCarousel;
  const styles = StyleSheet.create({
    container: {
        marginTop: '5%',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 18
    }
  });