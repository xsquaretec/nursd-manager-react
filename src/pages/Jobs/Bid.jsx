import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Heading from "../../components/Heading";
import moment from "moment";
import NoRows from "../../components/NoRows";
import { useAuth } from "../../context/auth";
import CircleIcon from "@mui/icons-material/Circle";

const Bid = () => {
  const auth = useAuth();

  const [pageData, setPageData] = useState([]);

  const getData = async () => {
    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/jobAcceptByManager`,
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
  }, []);

  const handleChangeStatus = async (e, id) => {
    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/api/job/acceptBid/${e}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${auth.user}`,
        },
        body: JSON.stringify({
          userId: id,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .then(() => getData());
  };

  const columns = [
    {
      field: "JobID",
      headerName: "Job ID",
      width: 100,
      flex: 1,
      renderCell: (params) => {
        return <p className=" font-bold">{params?.row?.jobId?.jobID}</p>;
      },
    },
    {
      field: "NurseName",
      headerName: "Nurse Name",
      width: 200,
      flex: 1,

      renderCell: (params) => {
        return (
          <p className="font-bold">
            {params?.row?.userId?.firstName +
              " " +
              params?.row?.userId?.lastName}
          </p>
        );
      },
    },

    {
      field: "nurseBid",
      headerName: "Bid Rate",
      flex: 1,
      width: 100,
      renderCell: (params) => {
        return <p className="text-[#278d44] font-bold">$ {params.value}/hr</p>;
      },
    },

    {
      field: "baseRate",
      headerName: "Base Rate",
      width: 100,
      flex: 1,

      renderCell: (params) => {
        return <p className="font-bold">$ {params?.row?.jobId?.baseRate}/hr</p>;
      },
    },
    {
      field: "maxBid",
      headerName: "Max Bid Rate",
      width: 100,
      flex: 1,

      renderCell: (params) => {
        return (
          <p className="font-bold">$ {params?.row?.jobId?.maxBidValue}/hr</p>
        );
      },
    },

    {
      field: "Updated",
      headerName: "Updated At.",
      width: 120,
      flex: 1,
      renderCell: (params) => {
        return (
          <span className=" font-bold">
            {moment(params?.row?.updatedAt).format("MMM Do YYYY")}
          </span>
        );
      },
    },

    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() =>
                handleChangeStatus(
                  params?.row?._id,
                  "63ebc40ec0b5ca169455d152"
                )
              }
            >
              Accept
            </Button>
          </>
        );
      },
    },
  ];

  const [loading, setLoading] = useState(true);

  return (
    <Box sx={{ height: "90%", width: "100%" }}>
      <Heading title="Bid Details" />
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

export default Bid;
