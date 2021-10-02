import React, { useState } from 'react';

const HomeContextInitialValue = {
  category: null,
  homeData: [],
  onHome: true,
};

export const HomeContext = React.createContext(HomeContextInitialValue);

export const HomeContextProvider = ({ children }) => {
  const [category, setCategory] = useState(HomeContextInitialValue.category);
  const [onHome, setOnHome] = useState(HomeContextInitialValue.onHome);
  const [homeData, setHomeData] = useState(HomeContextInitialValue.homeData);

  return (
    <HomeContext.Provider value={{
      category,
      onHome,
      homeData,
      setCategory,
      setOnHome,
      setHomeData
    }}>
      {children}
    </HomeContext.Provider>
  );
};