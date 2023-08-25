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
deviceToken?: string;
termsAndConditions? : boolean;
}
export interface ForgotPasswordProps{

}

 
  
  
  