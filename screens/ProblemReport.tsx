import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import packageJson from '../package.json'; // Relative path to your package.json
import {
  ProblemReportType,
  ProblemReportRouteParams,
  IText,
} from '../interfaces/interfaces';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDataContext} from '../context/DataContext';
import DropDownPicker from 'react-native-dropdown-picker';
import TitleAndArrowBack from '../components/UIElements/TitleAndArrowBack';
import Toast from 'react-native-toast-message';
import {ThemeContext} from '../context/ThemeContext';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  categorySchema,
  descriptionSchema,
  imageSchema,
} from '../messages/Statements';
import StyledButton from '../components/UIElements/StyledButton';
import BottomNavbar from '../components/UIElements/BottomNavbar';
import {ScrollView} from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import activityIndicator from '../assets/activitiindicator.json';
import buganimation from '../assets/bugsearchanimation.json';
const validationSchema = Yup.object().shape({
  image: imageSchema,
  category: categorySchema,
  description: descriptionSchema,
});
const {width, height} = Dimensions.get('window');

const ProblemReport: React.FC<ProblemReportType> = () => {
  const navigation = useNavigation<StackNavigationProp<any, 'ProblemReport'>>();
  const route = useRoute<any>(); // Using any type for route parameter
  const {theme, buttonTheme} = useContext(ThemeContext);
  const {primary, secondary, text, background} = theme.colors;
  const styles = createStyles(primary, secondary, text, background);
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
  const {getArrayOfDropDownCategories, showToast, uploadReport} =
    useDataContext();
  const [open, setOpen] = useState(false);
  const descriptionMinLength = 20
  const [allCategoriesValues, setAllCategoriesValues] = useState<
    {label: string; value: string}[]
  >([]);
  const [currentCategoryValue, setCurrentCategoryValue] = useState<string>('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const activitiIndicatorAnimation = (
    <LottieView
      style={{
        width: 150,
        height: 150,
        alignSelf: 'center',
        zIndex: 20,
        position: 'relative',
      }}
      speed={1}
      source={activityIndicator}
      autoPlay
      loop={true}
    />
  );

  const buganimationObject = (
    <LottieView
      style={{
        width: 200,
        height: 200,
        alignSelf: 'center',
        zIndex: 20,
        position: 'relative',
      }}
      speed={1}
      source={buganimation}
      autoPlay
      loop={true}
    />
  );
  useEffect(() => {
    const bringAllDetails = async () => {
      const deviceId: string = DeviceInfo.getDeviceId();
      const systemVersion: string = DeviceInfo.getSystemVersion();
      const baseOs: string = await DeviceInfo.getBaseOs();
      const deviceModel: string = DeviceInfo.getModel();
      const arrayOfCategories: string[] = await getArrayOfDropDownCategories();
      const formattedCategories = arrayOfCategories.map((category: string) => ({
        label: category,
        value: category,
      }));
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
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
        if (
          response.assets[0].type === 'image/png' ||
          response.assets[0].type === 'image/jpeg'
        ) {
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
    try {
      const [isPostUploaded, uploadMessage] = await uploadReport(
        currentAsset,
        currentCategoryValue,
        value.description,
        osValue,
        systemVersionValue,
        deviceModel,
        appVersionValue,
      );
      setIsLoading(false);
      setCurrentAsset(null);
      setSelectedImage('');
      setCurrentCategoryValue('');
      if (isPostUploaded) {
        showToast(
          'We will contact you soon',
          'success',
          'Problem succesfully uploaded',
        );
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      }
    } catch (err: any) {
      setIsLoading(false);
      setCurrentAsset(null);
      setCurrentCategoryValue('');
      showToast(err.message, 'error', 'Problem uploading failed !');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TitleAndArrowBack
        text="Report A Problem"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <View style={{height: height * 0.7}}>
          <ScrollView>
            {buganimationObject}

            <View style={styles.allbutNavbarCon}>
              {isLoading ? (
                <View style={{marginTop: '50%'}}>
                  {activitiIndicatorAnimation}
                </View>
              ) : (
                <Formik
                  initialValues={{category: '', image: '', description: ''}}
                  validationSchema={validationSchema}
                  onSubmit={handleFormSubmit}>
                  {({handleChange, handleSubmit, values, errors, isValid}) => (
                    <>
                      <View style={styles.selectandAddImageCon}>
                        <Text style={styles.problemtype}>
                          Select Problem Type
                        </Text>
                        <StyledButton
                          onPress={uploadPhotoHandler}
                          text={selectedImage ? 'Image Added' : 'Add image'}
                        />
                      </View>
                      <DropDownPicker
                        listMode="SCROLLVIEW"
                        placeholder="Select Problem Type"
                        open={open}
                        value={currentCategoryValue}
                        items={allCategoriesValues}
                        dropDownContainerStyle={{
                          height: 200,
                          backgroundColor: buttonTheme.buttonMain.background,
                          zIndex: 10,
                        }}
                        style={{
                          backgroundColor: background,
                          borderWidth: 1,
                          paddingHorizontal: 12,
                          borderRadius: 5,
                          marginTop: '6%',
                          zIndex: 10,
                          borderColor:
                            currentCategoryValue !== ''
                              ? 'green'
                              : text.secondary,
                        }}
                        textStyle={{color: text.primary}}
                        containerStyle={{zIndex: 10}}
                        onChangeValue={category => {
                          setCurrentCategoryValue(category?.toString() || '');
                          handleChange('category')(category?.toString() || '');
                        }}
                        setOpen={setOpen}
                        setValue={setCurrentCategoryValue}
                        setItems={setAllCategoriesValues}
                      />
                      <View style={styles.descriptionContainer}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              color: text.primary,
                              fontWeight: '500',
                              marginBottom: '3%',
                            }}>
                            Description (Minimum {descriptionMinLength} Letters)
                          </Text>
                          <View>
                            <Text
                              style={{
                                color:
                                  values.description.length < 20
                                    ? 'red'
                                    : 'lightgreen',
                                fontWeight: 'bold',
                              }}>
                              Letters: {values.description.length}
                            </Text>
                          </View>
                        </View>
                        <TextInput
                          multiline
                          numberOfLines={14} // Adjust this based on your design
                          style={[
                            {color: text.primary},
                            styles.descriptionInput,
                          ]}
                          placeholder="Please describe the problem..."
                          placeholderTextColor={text.primary}
                          onChangeText={handleChange('description')}
                          value={values.description}
                        />
                        {values.description.length < descriptionMinLength &&
                          values.description.length > 0 && (
                            <Text
                              style={{
                                color: 'red',
                                fontWeight: 'bold',
                                position: 'absolute',
                                bottom: -25,
                              }}>
                              {errors.description}
                            </Text>
                          )}
                      </View>
                      <View style={{marginTop: height * 0.05}}>
                        <StyledButton
                          text="Save Report"
                          onPress={handleSubmit}
                          bigbutton
                          disabled={values.description.length < 19 || !isValid}
                        />
                      </View>
                    </>
                  )}
                </Formik>
              )}
            </View>
          </ScrollView>
        </View>

        {route.params.cameFrom === 'Settings'
          ? !isKeyboardVisible && <BottomNavbar />
          : null}
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
};

const createStyles = (
  primary: string,
  secondary: string,
  text: IText,
  background: string,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: background,
    },
    titleandarrowcon: {
      flexDirection: 'row',
      width: '60%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    problemtype: {
      fontWeight: '500',
      color: text.primary,
    },
    selectandAddImageCon: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    allbutNavbarCon: {
      margin: '4%',
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
