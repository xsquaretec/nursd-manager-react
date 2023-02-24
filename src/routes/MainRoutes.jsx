import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerSupport from "../pages/CustomerSupport";
import Home from "../pages/Home";
import AcceptedJobs from "../pages/Jobs/AcceptedJobs";
import CompletedJobs from "../pages/Jobs/CompletedJobs";
import PostedJobs from "../pages/Jobs/PostedJobs";
import UnfulfilledJobs from "../pages/Jobs/UnfulfilledJobs";
import AddAgencyAdmin from "../pages/Users/AddAgencyAdmin";
import AddAgencyManager from "../pages/Users/AddAgencyManager";
import AgencyAdmin from "../pages/Users/AgencyAdmin";
import AgencyManager from "../pages/Users/AgencyManager";
import Nurse from "../pages/Users/Nurse";
import NurseDetails from "../pages/Users/NurseDetails";
import { ColorModeContext, useMode } from "../theme/theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import Logout from "../pages/Auth/Logout";
import CSVUpload from "../pages/CSVUpload";
import AddNewJobs from "../pages/Jobs/AddNewJobs";
import Profile from "../pages/Account/Profile";
import Manager from "../pages/Users/SingleProfile/Manager";
import AgencyAdminProfile from "../pages/Users/SingleProfile/AgencyAdminProfile";
import Bids from "../pages/Jobs/Bids";

const MainRoutes = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box height="100vh" overflow="hidden">
          <AdminNavbar />
          <Box
            display="flex"
            gap={2}
            height="100%"
            sx={{ backgroundColor: "transparent" }}
          >
            <AdminSidebar />
            <Box
              sx={{ flexGrow: 1, backgroundColor: "transparent" }}
              p={1}
              height="95vh"
              bgcolor="white"
              mr={2}
            >
              <PerfectScrollbar>
                <Routes>
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/csv-upload/:str" element={<CSVUpload />} />

                  <Route path="/" element={<Home />} />
                  <Route path="/all-agency-admin" element={<AgencyAdmin />} />
                  <Route
                    path="/add-agency-admin"
                    element={<AddAgencyAdmin />}
                  />
                  <Route
                    path="/add-agency-manager"
                    element={<AddAgencyManager />}
                  />

                  <Route
                    path="/all-agency-manager"
                    element={<AgencyManager />}
                  />

                  <Route path="/manager-profile/:str" element={<Manager />} />

                  <Route
                    path="/agency-admin-profile/:str"
                    element={<AgencyAdminProfile />}
                  />

                  <Route path="/all-nurse" element={<Nurse />} />
                  <Route
                    path="/nurse-details/:str"
                    element={<NurseDetails />}
                  />
                  <Route
                    path="/customer-support"
                    element={<CustomerSupport />}
                  />

                  {/* Jobs */}
                  <Route path="/bids" element={<Bids />} />

                  <Route path="/add-new-jobs" element={<AddNewJobs />} />
                  <Route path="/posted-jobs" element={<PostedJobs />} />
                  <Route path="/accepted-jobs" element={<AcceptedJobs />} />
                  <Route path="/completed-jobs" element={<CompletedJobs />} />
                  <Route
                    path="/unfulfilled-jobs"
                    element={<UnfulfilledJobs />}
                  />

                  <Route path="/bids" element={<Bid />} />

                  {/* Profile Routes */}
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </PerfectScrollbar>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default MainRoutes;
