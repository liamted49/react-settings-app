import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const defaultSettings = {
    theme: "light",
    language: "en",
  };

  const [theme, setTheme] = useState(defaultSettings.theme);
  const [language, setLanguage] = useState(defaultSettings.language);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("app-settings");
    if (saved) {
      const parsed = JSON.parse(saved);
      setTheme(parsed.theme || "light");
      setLanguage(parsed.language || "en");
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      "app-settings",
      JSON.stringify({ theme, language })
    );
  }, [theme, language]);

  const resetSettings = () => {
    setTheme("light");
    setLanguage("en");
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        language,
        setTheme,
        setLanguage,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
