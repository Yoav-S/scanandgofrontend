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
    apiUrl: string;
    authenticated: boolean;
    signupAttempt: (newUser: Registergion_Form_Props) => Promise<[boolean, string, string?]>;
    verifyEmail: (email: string) => Promise<[boolean, string, Date | undefined]>;
    showToast: (message: string, status: string, header: string) => void;
    token: string;
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
    expiration: number; // Expiration timestamp
    id: string;
    fullname: string;
    email: string;
}
export interface StyledButtonType {
  text: string;
  onPress?: () => void;
  disabled?: boolean;
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
 
  
  
  