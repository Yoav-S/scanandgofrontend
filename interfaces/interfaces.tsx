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
    
}
export interface DayNightSwitcherProps {
    isEnabled: boolean;
    onToggle: () => void;
  }
  