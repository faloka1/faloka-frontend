import React, { useState } from 'react';
import useToggle from '../../hooks/use-toggle';

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
  const { toggle: showInspireMe, setToggleOff: closeInspireMe, setToggleOn: openInspireMe } = useToggle();

  return (
    <HomeContext.Provider value={{
      category,
      onHome,
      homeData,
      setCategory,
      setOnHome,
      setHomeData,
      showInspireMe,
      closeInspireMe,
      openInspireMe
    }}>
      {children}
    </HomeContext.Provider>
  );
};