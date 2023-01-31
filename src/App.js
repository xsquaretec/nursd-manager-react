import React from "react";
import { ColorModeContext, useMode } from "./theme/theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import AdminNavbar from "./components/AdminNavbar";
import AdminSidebar from "./components/AdminSidebar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box height="100vh" overflow="hidden">
          <AdminNavbar />
          <Box display="flex" gap={2} height="100%">
            <AdminSidebar />
            <Box
              sx={{ flexGrow: 1 }}
              p={1}
              height="95vh"
              bgcolor="white"
              mr={2}
            >
              <PerfectScrollbar>
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
              </PerfectScrollbar>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
