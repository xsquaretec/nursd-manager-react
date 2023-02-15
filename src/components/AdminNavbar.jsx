import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import Logo from "../assets/logo.svg";
import MenuIcon from "@mui/icons-material/Menu";
import { tokens } from "../theme/theme";
// eslint-disable-next-line
import MUI_Icon from "./CustomMui/MUI_Icon";
import { useDispatch } from "react-redux";
import { changeSidebar } from "../redux/sidebarSlice";
import {
  AccountCircle,
  ExitToAppOutlined,
  Person2Outlined,
  SettingsOutlined,
} from "@mui/icons-material";
import Popover from "@mui/material/Popover";
import { teal } from "@mui/material/colors";

import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(changeSidebar());
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
        {/* 
        // eslint-disable-next-line
         */}
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
          >
            <AccountCircle
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box className="flex items-center p-2 px-4">
                <Person2Outlined
                  sx={{
                    color: teal[500],
                    "&.Mui-checked": {
                      color: teal[500],
                    },
                  }}
                />
                <Typography
                  sx={{
                    p: 1,
                    color: teal[500],
                    "&.Mui-checked": {
                      color: teal[500],
                    },
                  }}
                >
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    View Profile
                  </Link>
                </Typography>
              </Box>

              <Box className="flex items-center  p-2 px-4">
                <SettingsOutlined
                  sx={{
                    color: teal[500],
                    "&.Mui-checked": {
                      color: teal[500],
                    },
                  }}
                />
                <Typography
                  sx={{
                    p: 1,
                    color: teal[500],
                    "&.Mui-checked": {
                      color: teal[500],
                    },
                  }}
                >
                  Account setting
                </Typography>
              </Box>
              <Link to="/logout">
              <Box className="flex items-center  p-2 px-4">
                <ExitToAppOutlined
                  sx={{
                    color: teal[500],
                    "&.Mui-checked": {
                      color: teal[500],
                    },
                  }}
                />
                <Typography
                  sx={{
                    p: 1,
                    color: teal[500],
                    "&.Mui-checked": {
                      color: teal[500],
                    },
                  }}
                >
                  Sign Out
                </Typography>
              </Box>
              </Link>
            </Popover>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminNavbar;
