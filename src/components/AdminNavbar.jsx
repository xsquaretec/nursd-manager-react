import { Box, useTheme } from "@mui/material";
import React from "react";
import Logo from "../assets/logo.svg";
import MenuIcon from "@mui/icons-material/Menu";
import { tokens } from "../theme/theme";
// eslint-disable-next-line
import MUI_Icon from "./CustomMui/MUI_Icon";
import { useDispatch } from "react-redux";
import { changeSidebar } from "../redux/sidebarSlice";

const AdminNavbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(changeSidebar());
  };

  return (
    <Box display="flex" alignItems="center" gap={1} bgcolor="#B6B6B664">
      <Box
        width={"300px"}
        p={0.5}
        px={2}
        bgcolor={colors.secondary[700]}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <img src={Logo} alt="" />
        <MUI_Icon
          icon={<MenuIcon />}
          color={"white"}
          background={colors.primary[500]}
          onClick={() => handleChange()}
        />
      </Box>
      <Box p={1} px={2}>
        Menu Here
      </Box>
    </Box>
  );
};

export default AdminNavbar;
