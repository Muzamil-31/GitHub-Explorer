import { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Theme state is created here and shared with App through context.
  const [theme, setTheme] = useState(
    () => localStorage.getItem("github-explorer-theme") || "dark"
  );

  // Expose the current theme and its toggle function to child components.
  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((currentTheme) => {
          const nextTheme = currentTheme === "dark" ? "light" : "dark";
          localStorage.setItem("github-explorer-theme", nextTheme);
          return nextTheme;
        });
      }
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
