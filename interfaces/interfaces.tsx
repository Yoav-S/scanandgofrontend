export interface Theme {
    backgroundColor: string;
    textColor: string;
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
}
export interface BottomNavbarInterface {
theme: Theme
}
export interface CurrentUserType{

}
export interface LoginScreenType {

}
export interface HomeScreenType {
    theme: Theme
}
export interface SignupScreenType {
    
}
export interface BigTitleType {
    theme: Theme;
    title: string;
}
export interface DayNightSwitcherProps {
    isEnabled: boolean;
    onToggle: () => void;
  }
export interface FormInputType{
    label: string;
    setEmailInput: (value: string) => void;
    theme: Theme;
}
export interface StatsScreenType{

}
export interface ProfileScreenType{

}
export interface SettingsScreenType{
    
}