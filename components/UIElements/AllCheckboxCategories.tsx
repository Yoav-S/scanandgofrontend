import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { ThemeContext } from '../../context/ThemeContext';
import { AllCheckBoxCategoriesProps } from '../../interfaces/interfaces';

const AllCheckBoxCategories: React.FC<AllCheckBoxCategoriesProps> = (props) => {
  const { theme , buttonTheme} = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors   
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
    <View style={[styles.container, {backgroundColor: background}]}>
      <View style={styles.titleCon}>
        <Text style={{ color: text.primary, fontWeight: 'bold', fontSize: 18 }}>{props.title}</Text>
      </View>
      <View style={styles.categoriesMapView}>
        {props.categories.map((category, index) => (
          <CheckBox
            key={index}
            containerStyle={{backgroundColor: background, borderWidth: 0, alignItems: 'flex-start'}}
            textStyle={{color: text.primary}}
            checkedColor='green'
            title={category}
            center
            checked={isCategorySelected(category)}
            onPress={() => handleCategorySelect(category)}
          />
        ))}
      </View>
      {props.errorMessage && <Text style={{color: 'red', fontWeight: 'bold' , width: '90%', alignSelf:'center'}}>{props.errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
  },
  titleCon: {
    marginLeft: '5%'
  },
  categoriesMapView: {
    marginTop: '3%'
  },
});

export default AllCheckBoxCategories;
