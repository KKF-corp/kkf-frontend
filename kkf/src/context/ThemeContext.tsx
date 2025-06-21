import React, { createContext, useState, useContext } from "react";

type ThemeContextType = {
  mode: 'light' | 'dark';
  toggleMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useCustomTheme = () => useContext(ThemeContext);
