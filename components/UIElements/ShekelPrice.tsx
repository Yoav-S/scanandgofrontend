/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { Icon } from 'react-native-elements';
interface Props {
  num: number;
}

const ShekelPrice: React.FC<Props> = ({num}) => {
    
    const { theme, buttonTheme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors 
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
        <Text style={{color: text.primary}}>{num}</Text>
      <Icon name='shekel-sign' color={text.primary} size={13} type='font-awesome-5'/>
    </View>
  );
};

export default ShekelPrice;