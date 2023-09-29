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
      itemBackground: '#D5D3D0',
      itemText: '#222222',
      itemBoxShadow: {
        shadowColor: "#333333",
        shadowOffset: {
          width: 6,
          height: 5
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
      },
      androidShadow: {
        elevation: 10
      }
    },
    fonts: {
      regular: 'Roboto-Regular',
      bold: 'Roboto-Bold',
      // Add more font styles as needed
    },
  };

  const buttonTheme:IButtonTheme = {
    buttonMain:{
      background: '#E6942B',
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
      itemBackground: '#575756',
      itemText: '#222222',
      itemBoxShadow: {
        shadowColor: "#333333",
        shadowOffset: {
          width: 6,
          height: 5
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
      },
      androidShadow: {
        elevation: 10
      }
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
