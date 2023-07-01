// LangContext.js
import React, { createContext, useState } from 'react';

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [selectedLang, setSelectedLang] = useState(0);

  return (
    <LangContext.Provider value={{ selectedLang, setSelectedLang }}>
      {children}
    </LangContext.Provider>
  );
};

export default LangContext;
