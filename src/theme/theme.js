import { createContext, useState, useMemo } from "react";

import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        text: {
          100: "#333333",
          200: "#666666",
          300: "#999999",
          400: "#cccccc",
          500: "#ffffff",
          600: "#ffffff",
          700: "#ffffff",
          800: "#ffffff",
          900: "#000000",
        },
        primary: {
          100: "#d0f0e9",
          200: "#a1e1d4",
          300: "#71d2be",
          400: "#42c3a9",
          500: "#13b493",
          600: "#0f9076",
          700: "#0b6c58",
          800: "#08483b",
          900: "#04241d",
        },
        secondary: {
          100: "#ccdeeb",
          200: "#99bdd8",
          300: "#669cc4",
          400: "#337bb1",
          500: "#005a9d",
          600: "#00487e",
          700: "#00365e",
          800: "#00243f",
          900: "#00121f",
        },
      }
    : {
        text: {
          100: "#ffffff",
          200: "#ffffff",
          300: "#ffffff",
          400: "#ffffff",
          500: "#ffffff",
          600: "#cccccc",
          700: "#999999",
          800: "#666666",
          900: "#000000",
        },
        primary: {
          100: "#d0f0e9",
          200: "#a1e1d4",
          300: "#71d2be",
          400: "#42c3a9",
          500: "#13b493",
          600: "#0f9076",
          700: "#0b6c58",
          800: "#08483b",
          900: "#04241d",
        },
        secondary: {
          100: "#ccdeeb",
          200: "#99bdd8",
          300: "#669cc4",
          400: "#337bb1",
          500: "#005a9d",
          600: "#00487e",
          700: "#00365e",
          800: "#00243f",
          900: "#00121f",
        },
      }),
});

export const themeSetting = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            background: {
              default: "#000",
            },
          }
        : ""),
      primary: {
        main: colors.primary[500],
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSetting(mode)), [mode]);

  return [theme, colorMode];
};
