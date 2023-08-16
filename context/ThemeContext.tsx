import React, { createContext, useContext, useState } from 'react';
import { Theme } from '../interfaces/interfaces';
import { ThemeContextType } from '../interfaces/interfaces';
import { Props } from '../interfaces/interfaces';
import { DayTheme, NightTheme } from '../themes/themes';
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<Props> = ({children}) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(DayTheme);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === DayTheme ? NightTheme : DayTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
