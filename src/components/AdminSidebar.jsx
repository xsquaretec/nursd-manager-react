"use client";
import { tokens } from "../theme/theme";
import { useTheme } from "@emotion/react";
import { Box, Divider, ListItemButton, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import { sidebarAPI } from "../localAPI/SidebarAPI";
import MUIList from "./CustomMui/MUI_List";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useSelector } from "react-redux";

const AdminSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const location = useLocation();

  const sidebarData = useSelector((state) => state.sidebar);

  return (
    <Box
      minWidth={sidebarData ? "300px" : "80px"}
      bgcolor={colors.secondary[500]}
      height="100%"
    >
      <Divider color="#fff" sx={{ height: "1px" }} />

      <PerfectScrollbar>
        <Box p={1} px={2} mt={1}>
          {sidebarAPI.map((item, index) => {
            return (
              <Box key={index}>
                {item.link ? (
                  <Link to={item.link} style={{ textDecoration: "none" }}>
                    <ListItemButton
                      sx={{
                        mt: 1,
                        padding: 1.5,
                        borderRadius: 2,
                        backgroundColor:
                          location.pathname === item.link && "white",
                        color: location.pathname === item.link ? "#3D3D3D" : "#fff",

                        "&:hover": {
                          backgroundColor: "#ffffff",
                          color: colors.secondary[500],
                        },
                      }}
                    >
                      <Typography
                        display={"flex"}
                        alignItems={"center"}
                        gap={1}
                        fontWeight={500}
                      >
                        {item.icon}{" "}
                        <span
                          className=""
                          style={{ display: sidebarData ? "block" : "none" }}
                        >
                          {item.name}
                        </span>
                      </Typography>
                    </ListItemButton>
                  </Link>
                ) : (
                  <MUIList
                    item={item}
                    style={{ display: sidebarData ? "block" : "none" }}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </PerfectScrollbar>
    </Box>
  );
};

export default AdminSidebar;
