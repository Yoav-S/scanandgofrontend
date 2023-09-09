import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, IButtonTheme, ThemeContextType } from '../interfaces/interfaces';
import { Props } from '../interfaces/interfaces';

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider: React.FC<Props> = ({ children }) => {


  const lightTheme: Theme = {
    colors: {
      primary: '#702963',
      secondary: '#e4e5f1',
      text: {
        primary: '#702963',
        secondary: '#333333',
      },
      background: '#FCF5E5',
      // Add more colors as needed
    },
    fonts: {
      regular: 'Roboto-Regular',
      bold: 'Roboto-Bold',
      // Add more font styles as needed
    },
  };
  const buttonTheme:IButtonTheme = {
    buttonMain:{
      background: '#702963',
      text: '#ffffff'
    },
    buttonAlt:{
      background: '#51414F',
      text: '#ffffff'
    },
  }
  // Define the dark mode theme
  const darkTheme: Theme = {
    colors: {
      primary: '#702963',
      secondary: '#424549',
      text: {
        primary: '#ffffff',
        secondary: '#cccccc',
      },
      background: '#343434',
      // Add more colors as needed
    },
    fonts: {
      regular: 'Roboto-Regular',
      bold: 'Roboto-Bold',
      // Add more font styles as needed
    },
  };
  const [theme, setTheme] = useState(lightTheme);
  const value: ThemeContextType = {
    theme,
    setTheme,
    lightTheme,
    darkTheme,
    buttonTheme,
  };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;

};
