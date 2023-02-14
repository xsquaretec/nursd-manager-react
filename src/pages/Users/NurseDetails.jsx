import { alpha, Box, Button, FormControl, InputLabel, MenuItem, Select, styled, Switch, Typography, useTheme } from "@mui/material";
import { teal } from "@mui/material/colors";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "../../components/Heading";
import { useAuth } from "../../context/auth";
import { tokens } from "../../theme/theme";

const NurseDetails = () => {
  const pathname = useParams();
  const [pageData, setPageData] = useState([]);
  const [data, setData] = useState([]);

  const auth = useAuth();

  const getData = async () => {
    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/user/${pathname.str}`,
      {
        headers: {
          Authorization: `Bearer ${auth.user}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPageData(res.data);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, [pathname, auth]);

  console.log(pageData, "pagedata");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(true);


  const PinkSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: teal[500],
      "&:hover": {
        backgroundColor: alpha(teal[500], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: teal[500],
    },
  }));
  const label = {
    inputProps: {
      "aria-label": "Color switch demo",
      "aria-label": "Checkbox demo",
    },
  };
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);}

  return loading ? (
    ""
  ) : (
    <div>
      <Heading
        title={`${pageData.firstName + " " + pageData.lastName} Details`}
      />

      <div className="grid grid-cols-2 w-[80%]">
        <div className="flex items-center">
          <img
            src={process.env.REACT_APP_PUBLIC_IAMGE_URL + pageData.profileImage}
            alt="Image here"
            className="w-60 h-60 object-cover rounded-full mb-10"
          />
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-bold ">
              {pageData.firstName + " " + pageData.lastName}
            </p>
            <p className="text-lg">
              {pageData.gender} | {moment().diff(pageData.dateOfBirth, "years")}{" "}
              YR
            </p>
            <div className="grid grid-flow-col gap-2 items-center">
            <p className="text-lg">Email ID :</p>
            <p classname="">{pageData.email}</p>
          </div>
          <Box sx={{ minWidth: 140 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
          <em>none</em>
          </MenuItem>
          <MenuItem value={10}>Active</MenuItem>
          <MenuItem value={20}>Deactive</MenuItem>
          <MenuItem value={30}>Suspend</MenuItem>
          <MenuItem value={30}>Block</MenuItem>
        </Select>
      </FormControl>
    </Box>
          </div>
        </div>
        <div className="border-l pl-10">
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              mt: 1,
              color: colors.secondary[700],
              fontWeight: 600,
            }}
          >
            Personal Information
          </Typography>
          <div className="grid grid-cols-2">
            <p className="text-lg">Date of Birth</p>
            <p className="">{new Date(pageData.dateOfBirth).toDateString()}</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Mobile No.</p>
            <p className="">{pageData.phoneNumber}</p>
          </div>
          
          {/* <div className="grid grid-cols-2">
            <p className="text-lg">Height</p>
            <p className="">150 cm</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Weight</p>
            <p className="">70 kg</p>
          </div> */}
          <div className="grid grid-cols-2">
            <p className="text-lg">Address</p>
            <a
              href={`https://maps.google.com/maps?q=${
                pageData?.address?.street +
                pageData?.address?.city +
                pageData?.address?.zip +
                pageData?.address?.state +
                pageData?.address?.country
              }`}
              className=""
            >
              {pageData?.address?.street} , {pageData?.address?.city},
              {pageData?.address?.zip}, {pageData?.address?.state},
              {pageData?.address?.country}
            </a>
          </div>
          <div className="">
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                mt: 1,
                color: colors.secondary[700],
                fontWeight: 600,
              }}
            >
              Education Data
            </Typography>
            <div className="grid grid-cols-2">
              <p className="text-lg">Education</p>
              {/* <p className="">{data?.educationData?.data[0].education}</p> */}
            </div>
            <div className="grid grid-cols-2">
              <p className="text-lg">Graduation Date</p>
              <p className="">2019-10-02T12:27:00.000Z</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 w-[80%] mt-10">
        <div className="">
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              mt: 1,
              color: colors.secondary[700],
              fontWeight: 600,
            }}
          >
            Clinical Data
          </Typography>
          <div className="grid grid-cols-2">
            <p className="text-lg">Primary State</p>
            <p className="">lllinois</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Primary Licence Type</p>
            <p className="">RN</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Multistate Privilege</p>
            <p className="">True</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Clinical Licence</p>
            <p className="">L212344</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Clinical Licence Expiration At</p>
            <p className="">2028-06-10T12:26:00.000Z</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Registered Portal</p>
            <p className="">Independent</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Employee ID</p>
            <p className=""></p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Employee Name</p>
            <p className=""></p>
          </div>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              mt: 1,
              color: colors.secondary[700],
              fontWeight: 600,
            }}
          >
            Speciality
          </Typography>
          {/* <p className="text-lg">Address</p> */}
        </div>
        <div className="border-l pl-10">
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              mt: 1,
              color: colors.secondary[700],
              fontWeight: 600,
            }}
          >
            Cerification Data
          </Typography>
          <div className="grid grid-cols-2">
            <p className="text-lg">Certification</p>
            <p className="">ACLS</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Expiration At</p>
            <p className="">2023-02-07T18:26:22.138Z</p>
          </div>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              mt: 1,
              color: colors.secondary[700],
              fontWeight: 600,
            }}
          >
            Skill Data
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              mt: 1,
              color: colors.secondary[700],
              fontWeight: 600,
            }}
          >
            Skills
          </Typography>
          <div className="grid grid-cols-2">
            <p className="text-lg">0</p>
            <p className="">Team Work</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">1</p>
            <p className="">Compassion</p>
          </div>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              mt: 1,
              color: colors.secondary[700],
              fontWeight: 600,
            }}
          >
            EHR EMR Experience
          </Typography>
          <div className="grid grid-cols-2">
            <p className="text-lg">0</p>
            <p className="">ABELMed</p>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-2 w-[80%] mt-10">
        <div className="border-l pl-10">
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              mt: 1,
              color: colors.secondary[700],
              fontWeight: 600,
            }}
          >
            Personal Information
          </Typography>
          <div className="grid grid-cols-2">
            <p className="text-lg">Date of Birth</p>
            <p className="">20/4/1993</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Mobile No.</p>
            <p className="">1234567890</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Email ID</p>
            <p :classname="">demo@gmail.com</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Height</p>
            <p className="">150 cm</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Weight</p>
            <p className="">70 kg</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Address</p>
            <p className="">Bandra House Bombay</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Nationality</p>
            <p className="">Indian</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 w-[80%] mt-10">
        <div className="">
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              mt: 1,
              color: colors.secondary[700],
              fontWeight: 600,
            }}
          >
            Personal Information
          </Typography>
          <div className="grid grid-cols-2">
            <p className="text-lg">Date of Birth</p>
            <p className="">20/4/1993</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Mobile No.</p>
            <p className="">1234567890</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Email ID</p>
            <p :classname="">demo@gmail.com</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Height</p>
            <p className="">150 cm</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Weight</p>
            <p className="">70 kg</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Address</p>
            <p className="">Bandra House Bombay</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Nationality</p>
            <p className="">Indian</p>
          </div>
        </div>
        <div className="border-l pl-10">
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              mt: 1,
              color: colors.secondary[700],
              fontWeight: 600,
            }}
          >
            Personal Information
          </Typography>
          <div className="grid grid-cols-2">
            <p className="text-lg">Date of Birth</p>
            <p className="">20/4/1993</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Mobile No.</p>
            <p className="">1234567890</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Email ID</p>
            <p :classname="">demo@gmail.com</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Height</p>
            <p className="">150 cm</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Weight</p>
            <p className="">70 kg</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Address</p>
            <p className="">Bandra House Bombay</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-lg">Nationality</p>
            <p className="">Indian</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default NurseDetails;
