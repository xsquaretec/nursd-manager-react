import React, { useState, useEffect } from "react";
import { Box, Button, ButtonGroup, IconButton, Modal, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Heading from "../../components/Heading";
import moment from "moment";
import NoRows from "../../components/NoRows";
import { useAuth } from "../../context/auth";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CreateIcon from '@mui/icons-material/Create';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};



const UnfulfilledJobs = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const auth = useAuth();

  const [pageData, setPageData] = useState([]);

  const getData = async () => {
    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/job?jobStatus=open`,
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
    { field: "jobID", headerName: "Job ID", width: 100 },
    { field: "shiftTitle", headerName: "Shift Title", width: 200 },

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
      // flex: 1,
      width: 200,
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
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <ButtonGroup size="small" aria-label="small button group">
              {/* <IconButton
                color="primary"
                onClick={() =>
                  AcceptBid(params.row.jobId._id, params.row.managerId._id)
                }
              >
                <CheckCircleOutlineOutlinedIcon />
              </IconButton> */}
              <IconButton
                color="error"
                onClick={() => RejectJob(params.row._id)}
              >
                <CancelOutlinedIcon />
              </IconButton>
              <IconButton
                color="success"
                onClick={handleOpen}
              >
                <CreateIcon />
              </IconButton>
            </ButtonGroup>
          </>
        );
      },
    },
  ];

  const [loading, setLoading] = useState(true);

  const RejectJob = async (job) => {
    await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/job/${job}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.user}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        getData();
      });
  };





  

  return (
    
    <>
    <Modal
      sx={{border:"none"}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography sx={{marginBottom:5,color:"#13b493",fontSize:20,fontWeight: "bold"}}>Unfulfilled Jobs Details</Typography>
          <Box className="grid grid-cols-2 gap-10">
            <TextField
              id="outlined-basic"
              label="Job ID"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Shift Title"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Shift Date"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Shift Time"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Duration"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Specialty"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Break"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Current Rate"
              variant="outlined"
              placeholder="$"
            />
          </Box>
          <Button  sx={{marginTop:5,backgroundColor:"#13b493",color:"white","&:hover":{
            color:"#13b493",
          }}}>Save</Button>
        </Box>
      </Modal>
    <Box sx={{ height: "90%", width: "100%" }}>
      <Heading title="Unfulfilled Jobs Details" />
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
    </>

  );
};

export default UnfulfilledJobs;
