import React, { createContext, useState, useEffect } from 'react';

export const AgeVerificationContext = createContext();

export const AgeVerificationProvider = ({ children }) => {
  const [isOver18, setIsOver18] = useState(localStorage.getItem('isOver18') === 'true');

  useEffect(() => {
    if (!isOver18) {
      setTimeout(() => {
        setIsOver18(true);
      }, 5000);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('isOver18', true);
    setIsOver18(true); 
  };

  return (
    <AgeVerificationContext.Provider value={{ isOver18, handleConfirm}}>
      {children}
    </AgeVerificationContext.Provider>
  );
};
