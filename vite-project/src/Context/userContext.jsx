import { useContext, createContext, useState, useEffect } from "react";

export const SecretKeyContext = createContext();

export const SecretKeyProvider = ({ children }) => {

  const [data, userData] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : {};
  });


  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(data));
  }, [data]);

  return (
    <SecretKeyContext.Provider value={{ data, userData }}>
      {children}
    </SecretKeyContext.Provider>
  );
};
