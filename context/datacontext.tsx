import React, { createContext, useContext, useState } from 'react';
import { Props, DataContextType } from '../interfaces/interfaces'; // Make sure to import the required interfaces
import { CurrentUserType } from '../interfaces/interfaces';
const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(null);

  const contextValue: DataContextType = {
    currentUser,
    setCurrentUser,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

// Create a custom hook to use the data context
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
