import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate to={localStorage.getItem("token") ? "/" : "/login"} replace />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AuthRoutes;
