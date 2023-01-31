import { IconButton } from "@mui/material";
import React from "react";

const MUI_Icon = ({ color, background, icon, onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      TouchRippleProps={{
        style: {
          backgroundColor: background + 33,
        },
      }}
      sx={{
        borderRadius: 2,
        color: color,
        fontSize: 18,
        padding: 1,
      }}
    >
      {icon}
    </IconButton>
  );
};

export default MUI_Icon;
