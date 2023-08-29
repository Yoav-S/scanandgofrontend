import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { Icon } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import packageJson from '../package.json'; // Relative path to your package.json
import { ProblemReportType, ProblemReportRouteParams } from "../interfaces/interfaces";
import { useTheme } from "../context/ThemeContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useDataContext } from "../context/DataContext";
import DropDownPicker from 'react-native-dropdown-picker';
import TitleAndArrowBack from "../components/UIComps/TitleAndArrowBack";
import {
    launchCamera,
    launchImageLibrary,
    CameraOptions,
    ImagePickerResponse,
    Asset
  } from 'react-native-image-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { categorySchema, descriptionSchema, imageSchema } from "../messages/Statements";
import StyledButton from "../components/UIComps/StyledButton";
import { ActivityIndicator } from "@react-native-material/core";
import BottomNavbar from "../components/UIComps/BottomNavbar";
const validationSchema = Yup.object().shape({
    image: imageSchema,
    category: categorySchema,
    description: descriptionSchema
  });
const ProblemReport: React.FC<ProblemReportType> = () => {
    const navigation = useNavigation<StackNavigationProp<any, 'ProblemReport'>>();
    const route = useRoute<any>(); // Using any type for route parameter
    
    const {theme} = useTheme();
    const appVersion = packageJson.version;
    const [currentAsset, setCurrentAsset] = useState<Asset | null>(null);
    const [cameFrom, setCameFrom] = useState<string>();
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [appVersionValue, setAppVersionValue] = useState<string>(appVersion);
    const [deviceModel, setdeviceModel] = useState<string>('');
    const [systemVersionValue, setSystemVersionValue] = useState<string>('');
    const [osValue, setOsValue] = useState<string>('');
    const [isFormatedImage, setisFormatedImage] = useState<boolean>(true);
    const {getArrayOfDropDownCategories, showToast, uploadReport} = useDataContext();
    const [open, setOpen] = useState(false);
    const [allCategoriesValues, setAllCategoriesValues] = useState<{ label: string; value: string }[]>([]);
    const [currentCategoryValue, setCurrentCategoryValue] = useState<string>('');
    const [isFormValidating, setIsFormValidating] = useState<boolean>(true);
    useEffect(() => {
        const bringAllDetails = async () => {
            const deviceId: string = DeviceInfo.getDeviceId();
            const systemVersion: string = DeviceInfo.getSystemVersion();
            const baseOs: string = await DeviceInfo.getBaseOs();
            const deviceModel: string =  DeviceInfo.getModel(); 
            const arrayOfCategories: string[] = await getArrayOfDropDownCategories();
            const formattedCategories = arrayOfCategories.map((category : string) => ({ label: category, value: category }));            
            setAllCategoriesValues(formattedCategories);
            setdeviceModel(deviceModel);
            setSystemVersionValue(systemVersion);
            setOsValue(baseOs);
        };

        bringAllDetails();

        if (route.params && route.params.cameFrom) {
            setCameFrom(route.params.cameFrom);
        }
    }, [route.params]);
    

    const uploadPhotoHandler = async () => {
        const options: CameraOptions = {
          mediaType: 'photo',
          quality: 1,
        };
    
        try {
          const response = await launchImageLibrary(options);
          if (response.didCancel) {
          } else if (response.errorMessage) {
          } else if (response.assets && response.assets.length > 0) {
            if (response.assets[0].type === 'image/png' || response.assets[0].type === 'image/jpeg') {
              const selectedUri = response.assets[0].uri;
              setSelectedImage(selectedUri || '');
              setCurrentAsset(response.assets[0] || null);
            } else {
              setisFormatedImage(false);
              setTimeout(() => {
                setisFormatedImage(true);
              }, 2000);
            }
            
            
          }
        } catch (error) {
          console.log('Image picker error: ', error);
        }
      };
      const handleFormSubmit = async (value: {description: string}) => {
        setIsLoading(true);
        console.log(currentAsset);
        console.log(selectedImage);
        try{
          const [isPostUploaded, uploadMessage]= await uploadReport(currentAsset, currentCategoryValue, value.description, osValue, systemVersionValue, deviceModel, appVersionValue)
          if(isPostUploaded) {
            showToast('We will contact you soon', 'success', 'Problem succesfully uploaded')
            setTimeout(() => {
              navigation.goBack();   
            }, 3000)
          }
        } catch(err : any) {
          setCurrentAsset(null);
          setCurrentCategoryValue('');
          showToast(err.message, 'error', 'Problem uploading failed !')
        }
      }
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>

                        <TitleAndArrowBack text="Report A Problem" onPress={() => {navigation.goBack()}}/>
                        <View style={styles.allbutNavbarCon}>

            {
                isLoading ? (<ActivityIndicator style={{marginTop: '20%'}} size={70}/>) : (            <Formik
                    initialValues={{ category: '', image: '', description: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                    >
                    {({ handleChange, handleSubmit, values, errors, isValid }) => (
                    <>
                    <View style={styles.selectandAddImageCon}>
                        <Text style={{color: theme.textColor, fontWeight: '500'}}>Select Problem Type</Text>
                    <StyledButton  onPress={uploadPhotoHandler} text={selectedImage ? 'Image Added' : 'Add image'} />
    
                    </View>
                    <DropDownPicker
                      open={open}
                      value={currentCategoryValue}
                      items={allCategoriesValues}
                      onChangeValue={(category) => {
                        setCurrentCategoryValue(category?.toString() || '');
                        handleChange('category')(category?.toString() || '');}}
                      setOpen={setOpen}
                      setValue={setCurrentCategoryValue}
                      setItems={setAllCategoriesValues}
                    />
                          <View style={styles.descriptionContainer}>
                          <Text style={{ color: theme.textColor, fontWeight: '500' , marginBottom: '3%'}}>Description</Text>
                          <TextInput
                            multiline
                            numberOfLines={14} // Adjust this based on your design
                            style={[{color: theme.textColor},
                            styles.descriptionInput]}
                            placeholder="Please describe the problem..."
                            placeholderTextColor={theme.textColor}
                            onChangeText={handleChange('description')}
                            value={values.description}
                          />
                          {values.description.length < 20 && <Text style={{color: theme.textColor}}>{errors.description}</Text>}
                        </View>
                        <StyledButton text="Save Report" onPress={handleSubmit} bigbutton disabled={values.description.length < 19 || !isValid}/>
                    </>
        )}
      </Formik>)
            }
</View>
            {route.params.cameFrom === "Settings" ? (<BottomNavbar/>) : (null)}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleandarrowcon: {
        flexDirection: 'row',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    selectandAddImageCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    allbutNavbarCon: {
      margin: '4%'
    },
    descriptionContainer: {
        marginTop: 20,
      },
      descriptionInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        height: 200, // Adjust this based on your design
        textAlignVertical: 'top', // Start text from the top
      },
});

export default ProblemReport;
