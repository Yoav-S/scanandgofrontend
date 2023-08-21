import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useTheme } from '../../context/ThemeContext';
import { AllCheckBoxCategoriesProps } from '../../interfaces/interfaces';
import { set_gender_Validator_Flag } from '../../messages/Statements';
const AllCheckBoxCategories: React.FC<AllCheckBoxCategoriesProps> = (props) => {
  const { theme } = useTheme();

  const handleCategorySelect = (category: string) => {
    set_gender_Validator_Flag(true);
    if (props.isSingleCategory) {
      props.setSelectedCategories([category]);
    } else {
      const updatedCategories = props.selectedCategories.includes(category)
        ? props.selectedCategories.filter(cat => cat !== category)
        : [...props.selectedCategories, category];
      props.setSelectedCategories(updatedCategories);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleCon}>
        <Text style={{ color: theme.textColor }}>{props.title}</Text>
      </View>
      <View style={styles.categoriesMapView}>
        {props.categories.map((category, index) => (
          <CheckBox
            key={index}
            title={category}
            center
            checked={props.selectedCategories.includes(category)}
            onPress={() => handleCategorySelect(category)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  titleCon: {},
  categoriesMapView: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    flexWrap: 'wrap'
  },
});

export default AllCheckBoxCategories;
