import { Box, IconButton, useTheme } from "@mui/material";
import React, { useContext } from "react";
import Logo from "../assets/logo.svg";
import MenuIcon from "@mui/icons-material/Menu";
import { ColorModeContext, tokens } from "../theme/theme";
// eslint-disable-next-line
import MUI_Icon from "./CustomMui/MUI_Icon";
import { useDispatch } from "react-redux";
import { changeSidebar } from "../redux/sidebarSlice";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

const AdminNavbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(changeSidebar());
  };

  return (
    <Box display="flex" alignItems="center" gap={1} bgcolor="#B6B6B664">
      <Box
        minWidth={"300px"}
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
      <Box
        p={1}
        px={2}
        className="w-full"
        display="flex"
        justifyContent="space-between"
      >
        <Box></Box>
        <Box>
          <IconButton
            TouchRippleProps={{
              style: {
                backgroundColor: colors.primary[500] + "22",
              },
            }}
            sx={{
              borderRadius: 2,
              color: colors.primary[500],
              fontSize: 18,
              padding: 1,
            }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode == "light" ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminNavbar;
