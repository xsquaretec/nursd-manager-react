import React, { useState, useEffect } from "react";
import { Box, ButtonGroup, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Heading from "../../components/Heading";
import moment from "moment";
import NoRows from "../../components/NoRows";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const Bids = () => {
  const auth = useAuth();

  const [pageData, setPageData] = useState([]);

  const getData = async () => {
    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/pendingJobAcceptByManager`,
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

  const columns = [
    {
      field: "jobID",
      headerName: "Job ID",
      width: 100,
      renderCell: (params) => {
        return params.row.jobId.jobID;
      },
    },
    {
      field: "shiftTitle",
      headerName: "Shift Title",
      width: 200,
      renderCell: (params) => {
        return params.row.jobId.shiftTitle;
      },
    },
    {
      field: "breakManager",
      headerName: "Break By Manager",
      width: 100,
      renderCell: (params) => {
        return params.row.jobId.break == null
          ? "No Added"
          : params.row.jobId.break;
      },
    },
    {
      field: "baseRate",
      headerName: "Base Rate",
      width: 100,
      renderCell: (params) => {
        return params.row.jobId.baseRate;
      },
    },
    {
      field: "maxBidValue",
      headerName: "Max Bid",
      width: 100,
      renderCell: (params) => {
        return params.row.jobId.maxBidValue;
      },
    },
    {
      field: "managerName",
      headerName: "Manager Name",
      width: 150,
      renderCell: (params) => {
        return (
          params.row.managerId.firstName + " " + params.row.managerId.lastName
        );
      },
    },
    {
      field: "nurseBreak",
      headerName: "Nurse Break",
      width: 100,
      renderCell: (params) => {
        return params.row.nurseBreak == null
          ? "No Added"
          : params.row.nurseBreak;
      },
    },
    {
      field: "nurseBid",
      headerName: "Nurse Bid",
      width: 100,
      renderCell: (params) => {
        return params.row.nurseBid;
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <ButtonGroup size="small" aria-label="small button group">
              <IconButton
                color="primary"
                onClick={() =>
                  AcceptBid(params.row.jobId._id, params.row.managerId._id)
                }
              >
                <CheckCircleOutlineOutlinedIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => RejectBid(params.row._id)}
              >
                <CancelOutlinedIcon />
              </IconButton>
            </ButtonGroup>
          </>
        );
      },
    },
  ];

  const [loading, setLoading] = useState(true);

  const AcceptBid = async (job, user) => {
    const data = {
      userId: user,
    };
    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/job/acceptBid/${job}`,
      {
        body: JSON.stringify(data),
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        getData();
      });
  };

  const RejectBid = async (job) => {
    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/jobAcceptByManager/${job}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        getData();
      });
  };

  return (
    <Box sx={{ height: "90%", width: "100%" }}>
      <Heading title="Bids" />
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

export default Bids;
