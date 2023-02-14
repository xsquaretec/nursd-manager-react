import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Heading from "../../components/Heading";
import { Link } from "react-router-dom";
import { tokens } from "../../theme/theme";
import { useAuth } from "../../context/auth";
import CircleIcon from "@mui/icons-material/Circle";

const AgencyManager = () => {
  const handleChangeStatus = async (e, id) => {
    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/changeMangerAndAdminStatus/${id}/${e}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${auth.user}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .then(() => getData());
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageData, setPageData] = useState([]);

  const auth = useAuth();

  const getData = async () => {
    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/adminManagerProfile?role=manager`,
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
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120, width: "100%", border: "none" }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Status
              </InputLabel>
              <Select
                disableUnderline
                fullWidth
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Status"
                value={params.row.userStatus}
                onChange={(e) =>
                  handleChangeStatus(e.target.value, params.row._id)
                }
              >
                <MenuItem value="availableNow">
                  <CircleIcon
                    fontSize=""
                    className="text-[11px] text-green-600 mr-2"
                  />
                  Available
                </MenuItem>
                <MenuItem value="inactive">
                  <CircleIcon
                    fontSize=""
                    className="text-[11px] text-orange-300 mr-2"
                  />
                  Inactive
                </MenuItem>
                <MenuItem value="suspend">
                  <CircleIcon
                    fontSize=""
                    className="text-[11px] text-red-600 mr-2"
                  />
                  Suspend
                </MenuItem>
                <MenuItem value="delete">
                  <CircleIcon
                    fontSize=""
                    className="text-[11px] text-black mr-2"
                  />
                  Delete
                </MenuItem>
              </Select>
            </FormControl>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        return (
          <ButtonGroup size="small" aria-label="small button group">
            <Link to={`/manager-profile/${params.row._id}`}>
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
        <Heading title="Agency Manager Details" />
        <Box className="flex gap-5">
          <Link to="/csv-upload/manager">
            <Button variant="outlined" sx={{ fontWeight: "700" }}>
              Bulk Upload
            </Button>
          </Link>
          <Link to="/add-agency-manager">
            <Button variant="outlined" sx={{ fontWeight: "700" }}>
              Add New Manager
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

export default AgencyManager;
