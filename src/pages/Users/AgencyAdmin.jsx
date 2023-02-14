import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CreateIcon from "@mui/icons-material/Create";
import Heading from "../../components/Heading";
import { Link } from "react-router-dom";
import { tokens } from "../../theme/theme";
import { useAuth } from "../../context/auth";

const AgencyAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [pageData, setPageData] = useState([]);

  const auth = useAuth();

  const getData = async () => {
    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/adminManagerProfile?skip=1&limit=100&role=admin`,
      {
        headers: {
          Authorization: `Bearer ${auth.user}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => setPageData(res.data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, [auth]);

  function getFullName(params) {
    return `${params.row.firstName || ""} ${params.row.lastName || ""}`;
  }

  const columns = [
    {
      field: "profileImage",
      headerName: "Image",
      width: 60,
      renderCell: (params) => <Avatar src={params.value} />,
    },
    { headerName: "Full Name", width: 150, valueGetter: getFullName, flex: 1 },
    { field: "email", headerName: "Email", width: 170, flex: 1 },
    { field: "phoneNumber", headerName: "Phone", width: 170 },
    {
      field: "Org Name",
      headerName: "Organization Name",
      width: 170,
      valueGetter: ({ row }) => row.organizationDetails.organizationName,
      flex: 1,
    },
    {
      field: "Org ID",
      headerName: "Organization ID",
      width: 170,
      valueGetter: ({ row }) => row.organizationDetails.organizationID,
    },
    {
      field: "Org Director",
      headerName: "Organization Director",
      width: 170,
      valueGetter: ({ row }) =>
        row.organizationDetails.organizationDirectorName,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        return (
          <ButtonGroup size="small" aria-label="small button group">
            <Link to={`/agency-admin-profile/${params.row._id}`}>
              <IconButton color="primary">
                <RemoveRedEyeOutlinedIcon />
              </IconButton>
            </Link>
            {/* <IconButton color={colors.text[500]}>
              <CreateIcon />
            </IconButton> */}
          </ButtonGroup>
        );
      },
    },
  ];

  const [loading, setLoading] = useState(true);

  return loading ? (
    ""
  ) : (
    <Box sx={{ height: "90%", width: "100%" }}>
      <Box
        width="100%"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Heading title="Agency Admin Details" />
        <Box className="flex gap-5">
          <Link to="/csv-upload/admin">
            <Button variant="outlined" sx={{ fontWeight: "700" }}>
              Bulk Upload
            </Button>
          </Link>
          <Link to="/add-agency-admin">
            <Button variant="outlined" sx={{ fontWeight: "700" }}>
              Add New Agency
            </Button>
          </Link>
        </Box>
      </Box>
      <DataGrid
        sx={{ height: "100%" }}
        rows={pageData}
        columns={columns}
        getRowId={(row) => row._id}
        autoPageSize
        pagination
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        components={{
          Toolbar: GridToolbar,
        }}
        loading={loading}
      />
    </Box>
  );
};

export default AgencyAdmin;
