import React, { useState, useEffect } from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Avatar,
  Box,
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
import CircleIcon from "@mui/icons-material/Circle";

const Nurse = () => {
  const handleChangeStatus = async (e, id) => {
    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/changeUserStatus/${id}/${e}`,
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
    await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/user`, {
      headers: {
        Authorization: `Bearer ${auth.user}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setPageData(res.data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, [auth, auth]);

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
            <Link to={`/nurse-details/${params.id}`}>
              <IconButton color="primary">
                <RemoveRedEyeOutlinedIcon />
              </IconButton>
            </Link>
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
      <Heading title="Nurse Details" />
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

export default Nurse;
