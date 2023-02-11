import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, ButtonGroup, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CreateIcon from "@mui/icons-material/Create";
import Heading from "../../components/Heading";
import { Link } from "react-router-dom";

const AgencyAdmin = () => {
  const [pageData, setPageData] = useState([]);

  const getData = async () => {
    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/adminManagerProfile?skip=1&limit=100&role=admin`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => setPageData(res.data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

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
            <IconButton color="primary">
              <RemoveRedEyeOutlinedIcon />
            </IconButton>
            <IconButton color="secondary">
              <CreateIcon />
            </IconButton>
          </ButtonGroup>
        );
      },
    },
  ];

  const [loading, setLoading] = useState(true);

  return (
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
        <Link to="/add-agency-admin">
          <Button variant="outlined" sx={{ fontWeight: "700" }}>
            Add New Agency
          </Button>
        </Link>
      </Box>
      <DataGrid
        sx={{ height: "100%" }}
        rows={pageData}
        columns={columns}
        getRowId={(row) => row._id}
        autoPageSize
        pagination
        checkboxSelection
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
