import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";
export type SeasonalTheme = "default" | "diwali" | "christmas" | "holi" | "valentine" | "summer";

export interface SeasonalThemeConfig {
  name: string;
  icon: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  gradient: string;
  description: string;
}

export const seasonalThemes: Record<SeasonalTheme, SeasonalThemeConfig> = {
  default: {
    name: "Default",
    icon: "🍦",
    primaryColor: "#ec4899",
    secondaryColor: "#8b5cf6",
    accentColor: "#10b981",
    gradient: "linear-gradient(135deg, #ec4899, #8b5cf6)",
    description: "Classic ice cream vibes",
  },
  diwali: {
    name: "Diwali",
    icon: "🪔",
    primaryColor: "#f59e0b",
    secondaryColor: "#dc2626",
    accentColor: "#fbbf24",
    gradient: "linear-gradient(135deg, #f59e0b, #dc2626)",
    description: "Festival of lights celebration",
  },
  christmas: {
    name: "Christmas",
    icon: "🎄",
    primaryColor: "#dc2626",
    secondaryColor: "#16a34a",
    accentColor: "#fbbf24",
    gradient: "linear-gradient(135deg, #dc2626, #16a34a)",
    description: "Holiday season special",
  },
  holi: {
    name: "Holi",
    icon: "🎨",
    primaryColor: "#ec4899",
    secondaryColor: "#06b6d4",
    accentColor: "#fbbf24",
    gradient: "linear-gradient(135deg, #ec4899, #06b6d4, #fbbf24)",
    description: "Festival of colors",
  },
  valentine: {
    name: "Valentine",
    icon: "💕",
    primaryColor: "#ec4899",
    secondaryColor: "#f43f5e",
    accentColor: "#fda4af",
    gradient: "linear-gradient(135deg, #ec4899, #f43f5e)",
    description: "Love is in the air",
  },
  summer: {
    name: "Summer",
    icon: "☀️",
    primaryColor: "#f97316",
    secondaryColor: "#0ea5e9",
    accentColor: "#22c55e",
    gradient: "linear-gradient(135deg, #f97316, #0ea5e9)",
    description: "Beat the heat",
  },
};

interface ThemeContextType {
  theme: Theme;
  seasonalTheme: SeasonalTheme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setSeasonalTheme: (theme: SeasonalTheme) => void;
  currentSeasonalConfig: SeasonalThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("ice-theme") as Theme;
    if (savedTheme) return savedTheme;
    
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  const [seasonalTheme, setSeasonalThemeState] = useState<SeasonalTheme>(() => {
    const saved = localStorage.getItem("ice-seasonal-theme") as SeasonalTheme;
    return saved || "default";
  });

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    localStorage.setItem("ice-theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    const config = seasonalThemes[seasonalTheme];
    
    // Apply seasonal theme CSS variables
    root.style.setProperty("--seasonal-primary", config.primaryColor);
    root.style.setProperty("--seasonal-secondary", config.secondaryColor);
    root.style.setProperty("--seasonal-accent", config.accentColor);
    root.style.setProperty("--seasonal-gradient", config.gradient);
    
    // Remove all seasonal classes
    Object.keys(seasonalThemes).forEach((t) => {
      root.classList.remove(`theme-${t}`);
    });
    // Add current seasonal class
    root.classList.add(`theme-${seasonalTheme}`);
    
    localStorage.setItem("ice-seasonal-theme", seasonalTheme);
  }, [seasonalTheme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const setSeasonalTheme = (newTheme: SeasonalTheme) => {
    setSeasonalThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        seasonalTheme,
        toggleTheme, 
        setTheme,
        setSeasonalTheme,
        currentSeasonalConfig: seasonalThemes[seasonalTheme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
