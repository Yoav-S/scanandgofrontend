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
    setPasswordInputHandler: (password: string) => void;
    setFullNameHandler: (fullName: string) => void;
    setEmailInputHandler: (email: string) => void;
    setConfirmPasswordInputHandler: (value: string, originalpassword?: string) => void;
    full_name: string | undefined;
    password: string | undefined;
    confirm_password: string | undefined;
    email: string | undefined;
    birth_date: string | undefined;
    device_token: string | undefined;
    confirm_password_Validator_Flag: boolean | undefined;
    date_of_birth_Validator_Flag: boolean | undefined;
    device_token_Validator_Flag: boolean | undefined;
    email_Validator_Flag: boolean | undefined
    full_name_Validator_Flag: boolean | undefined;
    gender_Validator_Flag: boolean | undefined;
    password_Validator_Flag: boolean | undefined;
}
export interface BottomNavbarInterface {
theme: Theme
}
export interface CurrentUserType{

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
    errorMessage: string;
    startValue?: string;
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
  btnHandler: () => void;
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
}
export interface AllCheckBoxCategoriesProps {
    title: string;
    categories: string[];
    isSingleCategory?: boolean; // Optional prop to determine single or multiple selection
    setSelectedCategories: (value: string[]) => void;
    selectedCategories: string[];
    validator: boolean | undefined;
}
export interface Registergion_Form_Props{
full_name: string;
email: string;
password: string;
gender: string;
birth_date: string;
device_token: string;
}


 
  
  
  