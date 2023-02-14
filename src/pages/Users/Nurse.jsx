import React, { useState, useEffect } from "react";
import { Avatar, Box, ButtonGroup, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CreateIcon from "@mui/icons-material/Create";
import Heading from "../../components/Heading";
import { Link } from "react-router-dom";

const Nurse = () => {
  const [pageData, setPageData] = useState([]);
  console.log(pageData)

  

  const getData = async () => {
    await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/user`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTBmMzhhOWU5ZjA4OWNlOTRkZDkxYyIsImVtYWlsIjoibWFuYWdlckBnbWFpbC5jb20iLCJwaG9uZU51bWJlciI6IjYzNTIzMjg1NDciLCJyb2xlIjoibWFuYWdlciIsImlhdCI6MTY3NjM1NDgwMywiZXhwIjoxNjc4OTQ2ODAzfQ.awbk2QT1VKgm7i0aQIMSWITE-48BAfzf9nd_z9mSMb8`,
      },
    })
      .then((res) => res.json())
      .then((res) => setPageData(res.data))
      .then(() => setLoading(false));
  };

  console.log(getData())

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
    { field: "gender", headerName: "Gender", width: 170 },
    {
      field: "dateOfBirth",
      headerName: "DOB",
      width: 170,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        return (
          <ButtonGroup size="small" aria-label="small button group">
            <Link to={`/nurse-details/${params.id}`}>
              <IconButton color="primary">
                <RemoveRedEyeOutlinedIcon />
              </IconButton>
            </Link>
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
      <Heading title="Nurse Details" />
      <DataGrid
        sx={{ height: "100%" }}
        rows={pageData}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={5}
        rowsPerPageOptions={[5]}
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

export default Nurse;
