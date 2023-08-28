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
    resetPassword: (password: string, userId: string) => Promise<boolean>;
    signupAttempt: (newUser: Registergion_Form_Props) => Promise<[boolean, string, string?]>;
    verifyEmail: (email: string) => Promise<[boolean, string, Date?, string?]>;
    showToast: (message: string, status: string, header: string) => void;
    token: string;
    uploadReport: (currentAsset : Asset | null, currentCategoryValue : string, appVersionValue: string , description : string, deviceIdValue : string, osValue : string, systemVersionValue : string, deviceModel: string) => Promise<[boolean, string]>;
    uploadFile: (currentAsset : Asset) => Promise<string>;
    getUserById: (id: string, token: string) => Promise<CurrentUserType | null>; // get a user by Id and set CurrantUser state.
    setToken: React.Dispatch<React.SetStateAction<string>>;
    updateDeviceToken: (userId: string) => Promise<void>;
    autoLoginNewUser: (newToken: string) => Promise<void>;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    loginAttempt: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
}
export interface BottomNavbarInterface {
theme: Theme
}
export interface CurrentUserType{
    _id:string;
    fullName:string;
    email:string;
    deviceToken:string;
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
    value?: string;
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
  bigbutton?: boolean;
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
  