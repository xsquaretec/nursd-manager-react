import { Typography, useTheme } from "@mui/material";
// import { usePathname } from "next/navigation";
import React from "react";
import { tokens } from "../theme/theme";
import CustomBreadcrumbs from "./CustomBreadcrumbs";

const Heading = ({ title }) => {
  // const pathname = usePathname();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          mt: 1,
          color : colors.primary[500],
          fontWeight : 600
        }}
      >
        {title}
      </Typography>
      {/* {pathname !== "/admin" && <CustomBreadcrumbs />} */}
    </>
  );
};

export default Heading;
