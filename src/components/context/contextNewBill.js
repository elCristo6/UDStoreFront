// NavigationContext.js
import React, { createContext, useContext, useState } from 'react';

const contextNewBill = createContext();

export const useNavigation = () => useContext(contextNewBill);

export const NavigationProvider = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState('cliente');

  const changeScreen = (screenName) => {
    setActiveScreen(screenName);
  };

  return (
    <contextNewBill.Provider value={{ activeScreen, changeScreen }}>
      {children}
    </contextNewBill.Provider>
  );
};

export const NavigationContext = contextNewBill;
