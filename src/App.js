import React from "react";
import { ColorModeContext, useMode } from "./theme/theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import AdminNavbar from "./components/AdminNavbar";
import AdminSidebar from "./components/AdminSidebar";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import MainRoutes from "./routes/MainRoutes";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box height="100vh" overflow="hidden">
          <AdminNavbar />
          <Box display="flex" gap={2} height="100%" sx={{backgroundColor : "transparent"}}>
            <AdminSidebar />
            <Box
              sx={{ flexGrow: 1 , backgroundColor : "transparent" }}
              p={1}
              height="95vh"
              bgcolor="white"
              mr={2}
            >
              <PerfectScrollbar>
                <MainRoutes />
              </PerfectScrollbar>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
