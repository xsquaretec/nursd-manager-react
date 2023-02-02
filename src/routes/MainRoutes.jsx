import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AgencyAdmin from "../pages/Users/AgencyAdmin";
import AgencyManager from "../pages/Users/AgencyManager";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/all-agency-admin" element={<AgencyAdmin />} />
      <Route path="/all-agency-manager" element={<AgencyManager />} />
    </Routes>
  );
};

export default MainRoutes;
