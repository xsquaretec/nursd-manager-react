import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerSupport from "../pages/CustomerSupport";
import Home from "../pages/Home";
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
    </Routes>
  );
};

export default MainRoutes;
