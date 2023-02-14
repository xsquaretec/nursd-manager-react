import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Heading from "../../components/Heading";
import moment from "moment";
import NoRows from "../../components/NoRows";
import { useAuth } from "../../context/auth";

const PostedJobs = () => {
  const auth = useAuth();

  const [pageData, setPageData] = useState([]);

  const getData = async () => {
    await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/job`, {
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
  }, []);

  console.log(pageData)

  const columns = [
    { field: "jobID", headerName: "Job ID", width: 100 },
    { field: "shiftTitle", headerName: "Shift Title", width: 200 },
    {
      field: "expirationDate",
      headerName: "Expiration",
      width: 200,
      renderCell: (params) => {
        return (
          <p>
            {moment(params.value).isBefore() ? (
              <span className="text-red-500 font-bold">
                Expired {moment(params.value).fromNow()}
              </span>
            ) : (
              moment(params.value).fromNow()
            )}
          </p>
        );
      },
    },

    {
      field: "startDate",
      headerName: "Shift Date",
      width: 120,
      renderCell: (params) => {
        return moment(params.value).isBefore() ? (
          <span className="text-red-500 font-bold">
            {moment(params.value).format("MMM Do YYYY")}
          </span>
        ) : (
          moment(params.value).format("MMM Do YYYY")
        );
      },
    },

    {
      field: "startTime",
      headerName: "Shift Time",
      width: 150,
      renderCell: (params) => {
        return (
          moment(params.row.startTime).format("LT") +
          "-" +
          moment(params.row.endTime).format("LT")
        );
      },
    },

    {
      headerName: "Duration",
      width: 100,
      renderCell: (params) => {
        return (
          moment(params.row.endTime).diff(
            moment(params.row.startTime),
            "hours"
          ) + " hours"
        );
      },
    },

    {
      field: "Address",
      headerName: "Address",
      flex: 1,
      valueGetter: ({ row }) =>
        row.address.street +
        " " +
        row.address.city +
        " " +
        row.address.zip +
        " " +
        row.address.state +
        ", " +
        row.address.country,
    },
    {
      field: "specialty",
      headerName: "specialty",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex gap-1">
            {params.value.map((item, index) => (
              <p
                className="bg-[#0db391] text-white font-bold p-1 rounded-md text-xs"
                key={index}
              >
                {item}
              </p>
            ))}
          </div>
        );
      },
    },

    {
      field: "break",
      headerName: "Break",
      width: 70,
      renderCell: (params) => {
        return params.value + " mins";
      },
    },

    {
      field: "baseRate",
      headerName: "Current Rate",
      width: 100,
      renderCell: (params) => {
        return <p className="text-[#278d44] font-bold">$ {params.value}/hr</p>;
      },
    },
  ];

  const [loading, setLoading] = useState(true);

  return (
    <Box sx={{ height: "90%", width: "100%" }}>
      <Heading title="Posted Jobs Details" />
      <Box
        sx={{
          height: "100%",
          "& .bg": {
            bgcolor: "#ff000011",
          },
        }}
      >
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
            NoRowsOverlay: NoRows,
          }}
          loading={loading}
          getRowClassName={(params) =>
            moment(params.row.endDate).isBefore() ? `bg` : ""
          }
        />
      </Box>
    </Box>
  );
};

export default PostedJobs;
