import React, { createContext, useState, useContext } from "react";

const ViewContext = createContext();

export const HomeViewProvider = ({ children }) => {
  const [ currentView, setCurrentView ] = useState('home');

  return (
    <ViewContext.Provider value={{currentView, setCurrentView}}>
      {children}
    </ViewContext.Provider>
  )
}

export const useViewContext = () => useContext(ViewContext);
