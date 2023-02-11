"use client";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MUIList = ({ item: pageData, style }) => {
  const location = useLocation();


  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(false);
    if (pageData !== []) {
      pageData.menu.map((item) => {
        return location.pathname.includes(item.link) && setActive(true);
      });
    }
  }, [pageData, location.pathname]);

  return (
    <List>
      <ListItemButton
        onClick={handleClick}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 1.5,
          pl: 1.5,
          borderRadius: 2,
          color: active ? "#3D3D3D" : "#fff",
          backgroundColor: active && "#fff",

          "&:hover": {
            backgroundColor: "#ffffff",
            color:  "#3D3D3D",
          },
        }}
      >
        <Typography
          display={"flex"}
          alignItems={"center"}
          gap={1}
          fontWeight={500}
        >
          {pageData.icon} <span style={style}>{pageData.name}</span>
        </Typography>
        <span style={style}> {open ? <ExpandLess /> : <ExpandMore />}</span>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {pageData.menu.map((item, index) => {
            return (
              <Link
                to={item.link}
                style={{ textDecoration: "none" }}
                key={index}
              >
                <ListItemButton
                  sx={{
                    padding: 1,
                    pl: 5,
                    borderRadius: 2,
                    backgroundColor: location.pathname === item.link && "white",
                    color: location.pathname !== item.link ? "white" : "#3D3D3D",
                    my: 0.5,

                    "&:hover": {
                      backgroundColor: "#ffffff",
                      color: "#3D3D3D",
                    },
                  }}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </Link>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
};

export default MUIList;
