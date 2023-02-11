import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

import logo from "../../assets/logo.svg";
import { Button, useTheme } from "@mui/material";
import { tokens } from "../../theme/theme";

const Login = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const auth = useAuth();

  const navigate = useNavigate();

  const handleLogin = () => {
    auth.login(user);
    navigate("/");
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-[#ebeef2]">
      <img src={logo} alt="" className="w-32" />
      <div className="bg-white p-5 rounded-md mt-5 w-[400px] mb-32">
        <p className="text-xl text-slate-800">Sign In</p>
        <p className="text-slate-500 text-sm">Login to Super Admin Panel</p>
        <div className="mt-5">
          <label htmlFor="" className="text-[#13b493] font-medium">
            Enter Email or Phone
          </label>
          <input
            type="email"
            className="border focus:outline-none w-full mt-2 p-2 rounded-md"
            value={user.userName}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="" className="text-[#13b493] font-medium">
            Password
          </label>
          <input
            type="password"
            className="border focus:outline-none w-full mt-2 p-2 rounded-md"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <Button
          variant="contained"
          fullWidth
          sx={{
            color: "white",
            bgcolor: colors.primary[400],
            mt: 2,
            fontWeight: "700",
            "&:hover": {
              bgcolor: colors.primary[500],
            },
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
