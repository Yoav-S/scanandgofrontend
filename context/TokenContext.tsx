import React, { createContext, useContext, useState } from 'react';
import { TokenContextType, Token } from '../interfaces/interfaces';
import { Props } from '../interfaces/interfaces';
const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<Token | null>(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
