import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerSupport from "../pages/CustomerSupport";
import Home from "../pages/Home";
import AcceptedJobs from "../pages/Jobs/AcceptedJobs";
import CompletedJobs from "../pages/Jobs/CompletedJobs";
import PostedJobs from "../pages/Jobs/PostedJobs";
import UnfulfilledJobs from "../pages/Jobs/UnfulfilledJobs";
import AgencyAdmin from "../pages/Users/AgencyAdmin";
import AgencyManager from "../pages/Users/AgencyManager";
import Nurse from "../pages/Users/Nurse";
import NurseDetails from "../pages/Users/NurseDetails";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/all-agency-admin" element={<AgencyAdmin />} />
      <Route path="/all-agency-manager" element={<AgencyManager />} />
      <Route path="/all-nurse" element={<Nurse />} />
      <Route path="/nurse-details/:str" element={<NurseDetails />} />
      <Route path="/customer-support" element={<CustomerSupport />} />

      {/* Jobs */}
      <Route path="/posted-jobs" element={<PostedJobs />} />
      <Route path="/accepted-jobs" element={<AcceptedJobs />} />
      <Route path="/completed-jobs" element={<CompletedJobs />} />
      <Route path="/unfulfilled-jobs" element={<UnfulfilledJobs />} />
    </Routes>
  );
};

export default MainRoutes;
