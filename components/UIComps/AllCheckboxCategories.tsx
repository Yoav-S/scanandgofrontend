import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useTheme } from '../../context/ThemeContext';
import { AllCheckBoxCategoriesProps } from '../../interfaces/interfaces';

const AllCheckBoxCategories: React.FC<AllCheckBoxCategoriesProps> = (props) => {
  const { theme } = useTheme();
  const [categorySelections, setCategorySelections] = useState<{ [key: string]: boolean }>({});

  const isCategorySelected = (category: string) => {
    return categorySelections[category] || false;
  };

  const handleCategorySelect = (category: string) => {
    if (props.isSingleCategory) {
      const newSelections = { [category]: true };
      setCategorySelections(newSelections);
      props.setSelectedCategories(category);
    } else {
      const updatedSelections = { ...categorySelections };
      updatedSelections[category] = !isCategorySelected(category);
      setCategorySelections(updatedSelections);
      const updatedCategories = Object.keys(updatedSelections).filter(cat => updatedSelections[cat]);
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
            checked={isCategorySelected(category)}
            onPress={() => handleCategorySelect(category)}
          />
        ))}
      </View>
      {props.errorMessage && <Text style={{color: theme.textColor, width: '90%', alignSelf:'center'}}>{props.errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '5%'
  },
  titleCon: {},
  categoriesMapView: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    flexWrap: 'wrap'
  },
});

export default AllCheckBoxCategories;
