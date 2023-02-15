import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "../../../components/Heading";
import { useAuth } from "../../../context/auth";
import CircleIcon from "@mui/icons-material/Circle";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import NoRows from "../../../components/NoRows";
import { Box, FormControl,  MenuItem, Select } from "@mui/material";

const Manager = () => {
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

  const pathname = useParams();
  const [pageData, setPageData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const auth = useAuth();

  const getData = async () => {
    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/managerProfileWithManagerJob/${pathname.str}`,
      {
        headers: {
          Authorization: `Bearer ${auth.user}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setPageData(res.data);
        setJobData(res.jobBasedOnManager.data);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, [pathname, auth]);

  const [loading, setLoading] = useState(true);

  return loading ? (
    ""
  ) : (
    <div>
      <Heading
        title={`${pageData.firstName + " " + pageData.lastName} Details`}
      />

      <div className="grid grid-cols-2 gap-10">
        <div className="grid grid-cols-2 items-center">
          <img
            src={process.env.REACT_APP_PUBLIC_IAMGE_URL + pageData.profileImage}
            alt="manager profile"
            className="w-60 h-60 object-cover rounded-full mb-10"
          />
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-bold ">
              {pageData?.firstName + " " + pageData?.lastName}
            </p>
            <div className="grid grid-cols-3 gap-2 items-center">
              <p className="text-sm  font-bold">Email ID :</p>
              <p className="col-span-2">{pageData?.email}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 items-center">
              <p className="text-sm  font-bold">Phone No. :</p>
              <p className="col-span-2">{pageData?.phoneNumber}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 items-center">
              <p className="text-sm  font-bold">Status :</p>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120, width: "100%", border: "none" }}
              >
                <Select
                  disableUnderline
                  fullWidth
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Status"
                  value={pageData.userStatus}
                  onChange={(e) =>
                    handleChangeStatus(e.target.value, pageData._id)
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
            </div>
            <div className="grid grid-cols-3 gap-2 items-center">
              <p className="text-sm font-bold">Address :</p>
              <p className="col-span-2">
                {pageData?.address?.street} , {pageData?.address?.city},
                {pageData?.address?.zip}, {pageData?.address?.state},
                {pageData?.address?.country}
              </p>
            </div>
          </div>
        </div>
        <div className="border-l pl-10">
          <div className="grid grid-cols-3 gap-2 items-center mt-5">
            <p className="text-sm font-bold">Organization Name :</p>
            <p className="col-span-2">
              {pageData?.organizationDetails?.organizationName} ,
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 items-center">
            <p className="text-sm font-bold">Organization ID :</p>
            <p className="col-span-2">
              {pageData?.organizationDetails?.organizationID} ,
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 items-center">
            <p className="text-sm font-bold">Organization Director Name :</p>
            <p className="col-span-2">
              {pageData?.organizationDetails?.organizationDirectorName} ,
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 items-center mt-5">
            <p className="text-sm font-bold">Customer Support Phone :</p>
            <p className="col-span-2">{pageData?.customerSupport?.phone} ,</p>
          </div>
          <div className="grid grid-cols-3 gap-2 items-center">
            <p className="text-sm font-bold">Customer Support Email :</p>
            <p className="col-span-2">{pageData?.customerSupport?.email} ,</p>
          </div>
        </div>
      </div>

      <Heading title="Job Details" />

      <Box sx={{ height: 520, mb: 10, width: "98%" }}>
        <DataGrid
          sx={{ height: "100%" }}
          rows={jobData}
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
    </div>
  );
};

export default Manager;
