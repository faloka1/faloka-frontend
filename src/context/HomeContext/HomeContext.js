import React, { useState } from 'react';

const HomeContextInitialValue = {
  category: null,
  onHome: true,
};

export const HomeContext = React.createContext(HomeContextInitialValue);

export const HomeContextProvider = ({ children }) => {
  const [category, setCategory] = useState(HomeContextInitialValue.category);
  const [onHome, setOnHome] = useState(HomeContextInitialValue.onHome);

  return (
    <HomeContext.Provider value={{
      category,
      onHome,
      setCategory,
      setOnHome
    }}>
      {children}
    </HomeContext.Provider>
  );
};