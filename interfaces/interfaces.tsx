import { Asset } from "react-native-image-picker";
export interface Theme {
    backgroundColor: string;
    textColor: string;
    primaryColor: string;
    secondaryColor: string;
  }
export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}
export interface Props {
    children?: React.ReactNode
}
export interface DataContextType {
    currentUser: CurrentUserType | null;
    setCurrentUser: (user: CurrentUserType | null) => void;
    getArrayOfDropDownCategories: () => Promise<string[]>;
    authenticated: boolean;
    verifyCouponAttempt: (coupon: string) => Promise<boolean>;
    setamountofitemsvariable: (amount: number) => void;
    amountofitemsvariable: number;
    deleteCardAttempt: (cardId: string, userId: string) => Promise<boolean>;
    handleLogOut: () => void;
    deleteItemAttempt: (userId: string, nfcTagCode: string) => Promise<[boolean,IteminCartType[]?]>;
    changeDefaultCardAttempt: (cardId: string) => Promise<boolean>;
    updatePasswordAttempts: (password: string, newpassword: string) => Promise<boolean>;
    updateDetailsAttempt: (email: string, fullName: string, gender: string, birthDate: string) => Promise<boolean>;
    resetPassword: (password: string, userId: string) => Promise<boolean>;
    signupAttempt: (newUser: Registergion_Form_Props) => Promise<[boolean, string, string?]>;
    verifyEmail: (email: string) => Promise<[boolean, string, Date?, string?]>;
    showToast: (message: string, status: string, header: string) => void;
    token: string;
    isVisibleStatus: boolean;
    setisVisibleStatus: React.Dispatch<React.SetStateAction<boolean>>;
    uploadReport: (currentAsset : Asset | null, currentCategoryValue : string, appVersionValue: string , description : string, osValue : string, systemVersionValue : string, deviceModel: string) => Promise<[boolean, string]>;
    uploadFile: (currentAsset : Asset) => Promise<string>;
    getUserById: (id: string, token: string) => Promise<CurrentUserType | null>; // get a user by Id and set CurrantUser state.
    setToken: React.Dispatch<React.SetStateAction<string>>;
    updateDeviceToken: (userId: string) => Promise<void>;
    autoLoginNewUser: (newToken: string) => Promise<void>;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    loginAttempt: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
}
export interface BottomNavbarInterface {
}
export interface CurrentUserType{
    _id:string;
    fullName:string;
    email:string;
    deviceToken:string;
    gender: string;
    creditCards: creditCardType[];
    cart: IteminCartType[];
}
// interfaces/interfaces.tsx
export interface CreditCardAbstractCompType {
    creditCard: creditCardType;
    onPress?: (cardId: string) => void | undefined; // Make onPress an optional function
    isChecked?: boolean; // Add the isChecked prop
  }
  
export interface IteminCartType{
nfcTagCode: string;
itemId: string;
name: string;
imageSource: string;
price: number;
category: string;
}
export interface ItemCompInterface{
itemObj: IteminCartType;
handleDeleteItem?: (userId: string, nfcTagCode: string) => void;
}
export interface CreditCardFormType{
    userId: string;
    creditCard: creditCardType;
}
export interface creditCardType{
    _id: string;
    cardNumber: string;
    expirationDate: string;
    cardholderName: string;
    cvv: string;
    cardType: string;
    isDefault: boolean;
}
export interface LoginScreenType {

}
export interface HomeScreenType {
}
export interface SignupScreenType {
    
}
export interface BigTitleType {
    title: string;
}
export interface DayNightSwitcherProps {

}
export interface FormInputType{
    label: string;
    setInput: (value: string) => void;
    validator?: boolean;
    errorMessage?: string | undefined;
    startValue?: string;
    isApplied?: boolean;
    isAttempted?: boolean;
    value?: string;
    numeric?: boolean;
    onChangeText?: (value: string) => void;
}
export interface StatsScreenType{

}
export interface ProfileScreenType{

}
export interface SettingsScreenType{
    
}
export interface AuthenticatedStackType{

}
export interface TokenContextType {
    token: Token | null;
    setToken: (token: Token | null) => void;
}
export interface Token {
    exp: number;
    iat: number;
    id: string;
    roles: Role[];
}
export enum Role {
    USER = "user",
    ADMIN = "admin",
}
export interface StyledButtonType {
  text: string;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  bigbutton?: boolean;
  isApplied?: boolean;
  isAttempted?: boolean;
  smallbutton?: boolean;
}
export interface StyledBarrierProps{
    text: string;
}
export interface TitleAndBtnConProps {
    text: string;
    btnlabel: string;
    textbold?: boolean;
    btnbold?: boolean;
    onPress?: () => void; 
    btntextcolor?: string;
}
export interface AllCheckBoxCategoriesProps {
    title: string;
    categories: string[];
    isSingleCategory?: boolean; // Optional prop to determine single or multiple selection
    setSelectedCategories: (value: string | string[]) => void;
    selectedCategories: string | string[];
    validator?: boolean | undefined;
    value: string;
    errorMessage?: string | undefined;
  }
  
  
export interface Registergion_Form_Props{
fullName: string;
email: string;
password: string;
confirmPassword?: string;
gender: string;
birthDate?: string;
deviceToken?: string | null;
termsAndConditions? : boolean;
}
export interface ForgotPasswordProps{

}
export interface IHttpResponse<T> {
    success:boolean;
    data?:T;
    message:string;
    error?:string;
    tokenError?:boolean;
}
export  interface Token{
    exp: number;
    iat: number;
    id: string;
  }

export interface UserEmailVerificationDetails{
    userId: string;
    digits: string;
    email: string;
    expireIn: Date;
}
export interface ProblemReportType{
    
} 
export interface DeviceInfo {
    os: string;
    deviceModel: string;
    systemVersion: string;
    appVersion: number;
}  
export interface ProblemReportRouteParams  {
    cameFrom?: string;
}  
export interface TitleAndArrowBackProps{
    text: string;
    onPress?: () => void;
} 
export interface CouponCompProps{
    isCouponValid: boolean;
    isAttempted: boolean;
    isLoading: boolean;
    handleCouponCheck: () => void;
    btnLabelText: string;
    changeInputHandler: (input: string) => void;
}  