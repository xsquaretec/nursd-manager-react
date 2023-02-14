import { tokens } from "../theme/theme";
import { useTheme } from "@emotion/react";
import { Box, Grid, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DashBG from "../assets/dashboard_bg.png";
import Nurse from "../assets/Nurse.svg";
import Agencies from "../assets/Agencies.svg";
import Notification from "../components/Dashboard/Notification";


export const DashboardCard = ({ title, icon, count }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <Box
      p={2}
      height={200}
      borderRadius={2}
      sx={{
        // backgroundImage: `url('${DashBG}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderLeft: "5px solid #13B493",
        backgroundColor: "#F2FAF8"
      }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box display="flex" flexDirection="column">
        <Typography variant="h2" fontWeight={700} sx={{ color: "#1082CB" }}>
          {count}
        </Typography>
        <Typography color={colors.text[900]} variant="h5">
          {title}
        </Typography>
      </Box>
      <img src={icon} alt="" style={{ height: 100 }} />
    </Box>
  );
};

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [pageData, setPageData] = useState([]);

  const getData = async () => {
    await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/adminDashboard`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setPageData(res.data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  const [loading, setLoading] = useState(true);

  return loading ? (
    "Loading..."
  ) : (
    <Box mt={1} sx={{ flexGrow: 1 }}>
      <Typography
        mb={2}
        variant="h5"
        fontWeight={600}
        color={colors.primary[500]}
      >
        Total Details
      </Typography>

      <Grid container spacing={5} mb={5}>
        <Grid item xs={4}>
          <Link href="/all-agency-admin" style={{textDecoration: "none"}}>
          <DashboardCard title="Total Agencies" count={pageData?.totlaAgencyAdmin} icon={Agencies} />
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link href="/all-nurse" style={{textDecoration: "none"}}>
          <DashboardCard title="Total Nurses" count={pageData?.totalNurse} icon={Nurse} />
          </Link>
        </Grid>
        <Grid item xs={4}>
          <DashboardCard title="Total Jobs" count={pageData?.totalPostedJobs} />
        </Grid>
      </Grid>

      <Grid container spacing={5}>
        <Grid item container xs={6} columnSpacing={5}>
          <Grid item xs={12}>
            <Typography
              mb={2}
              variant="h5"
              fontWeight={600}
              color={colors.primary[500]}
            >
              Job Details
            </Typography>
          </Grid>
          <Grid item container xs={12} spacing={5}>
            <Grid item xs={6}>
              <DashboardCard title="Open Jobs" count={12} />
            </Grid>
            <Grid item xs={6}>
              <DashboardCard title="Closed Jobs" count={12} />
            </Grid>
            <Grid item xs={6}>
              <DashboardCard title="Cancelled Jobs" count={12} />
            </Grid>
            <Grid item xs={6}>
              <DashboardCard title="Expired Jobs" count={12} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={6} columnSpacing={5}>
          <Grid item xs={12}>
            <Typography
              mb={2}
              variant="h5"
              fontWeight={600}
              color={colors.primary[500]}
            >
              Managed By Employees
            </Typography>
          </Grid>
          <Grid item xs={12} container spacing={5}>
            <Grid item xs={12}>
              <DashboardCard title="Accepted Jobs by Emp." count={12} />
            </Grid>
            <Grid item xs={12}>
              <DashboardCard title="Rejected Jobs by Emp." count={12} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Notification/>
    </Box>
  );
};

export default Home;
