import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Heading from "../../components/Heading";
import { Button, Checkbox, Link, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LicenseInfo } from "@mui/x-license-pro";
import { alpha, styled } from "@mui/material/styles";
import { pink, teal } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
// LicenseInfo.setLicenseKey('YOUR_LICENSE_KEY');

// function getWeeksAfter(date, amount) {
//     return date ? date.add(amount, 'week') : undefined;
//   }

const AddNewJobs = () => {
  const [pageData, setPageData] = useState([]);
  const auth = useAuth();

  const [loading, setLoading] = useState(true);

  const getData = async () => {
    await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/commonEnum`, {
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


  const [bid, setBid] = useState(false)

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

  const [jobType, setJobType] = useState("");

  const [formValue, setFormValue] = useState({
    // Final Fields
    licenseType: "",
    shiftTitle: "",
    specialty: "",
    certification: "",
    yearofExperience: "",
    expirationDate: "",
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    break: 0,
    customer: "customer80",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    unit: "",
    floor: "",
    baseRate: "",
    notes: "",
    maxBidValue: 0,
  });

  const getStartTime = (date, time) => {
    const fdate = moment(date).format(moment.HTML5_FMT.DATE);
    // const ftime = moment(time).format("HH:mm");

    var dateTime = new Date(fdate + "T" + time);
    return dateTime;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    var startTime = getStartTime(formValue.startDate, formValue.startTime);

    var endTime = getStartTime(formValue.endDate, formValue.endTime);

    const data = JSON.stringify({
      jobType: jobType,
      licenseType: formValue.licenseType,
      shiftTitle: formValue.shiftTitle,
      specialty: [formValue.specialty],
      certification: [formValue.certification],
      yearofExperience: formValue.yearofExperience,
      expirationTime: formValue.expirationDate,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      startTime: startTime,
      endTime: endTime,
      break: parseInt(formValue.break),
      customer: "customer34",
      address: {
        street: formValue.street,
        city: formValue.city,
        zip: formValue.zip,
        state: formValue.state,
        country: formValue.country,
        unit: formValue.unit,
        floor: formValue.floor,
      },
      baseRate: parseInt(formValue.baseRate),
      isEnableBid: bid,
      maxBidValue: formValue.maxBidValue,
      notes: formValue.notes,
    });

    const token = auth.user;

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/job`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    // if (template) {
    //   alert("Save Template Successfully.");
    // }

    axios(config)
      .then((res) => res.data.error === false && alert(res.data.message))
      .then(() => setLoading(false))
      .catch(function (error) {
        alert("Something Went Wrong...");
      }).then(() => setFormValue(""))
  };

  return loading ? (
    <Typography>Loading...</Typography>
  ) : (
    <form onSubmit={handleSubmit}>
      <Box className="w-[95%]">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Heading title="Add New Job" />
          <Link to="/add-agency-admin">
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Select Jobs
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                autoWidth
                label="Select Job"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <MenuItem value="">
                  <em>none</em>
                </MenuItem>
                <MenuItem value={"shift"}>Create Shift</MenuItem>
                <MenuItem value={"visit"}>Create Visit</MenuItem>
              </Select>
            </FormControl>
          </Link>
        </Box>
        <Box className="grid grid-cols-2 gap-x-20 gap-y-5 mt-5 ">
          <FormControl>
            <InputLabel id="demo-simple-select-required-label">
              License Type *
            </InputLabel>
            <Select
              value={formValue.licenseType}
              onChange={(item) => {
                setFormValue({ ...formValue, licenseType: item.target.value });
              }}
              width="100%"
              label="License Type"
              required={true}
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
            >
              <MenuItem value="">
                <em>none</em>
              </MenuItem>
              {pageData.primaryLicenseTypes.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            id="outlined-required"
            label="Shift Title"
            value={formValue.shiftTitle}
            onChange={(item) => {
              setFormValue({ ...formValue, shiftTitle: item.target.value });
            }}
          />
          <FormControl className="">
            <InputLabel id="demo-simple-select-required-label">
              Specialty *
            </InputLabel>
            <Select
              value={formValue.specialty}
              onChange={(item) => {
                setFormValue({ ...formValue, specialty: item.target.value });
              }}
              width="100%"
              label="Specialty *"
              required={true}
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
            >
              <MenuItem value="">
                <em>none</em>
              </MenuItem>
              {pageData.specialtys.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-required-label">
              Certification *
            </InputLabel>
            <Select
              value={formValue.certification}
              onChange={(item) => {
                setFormValue({
                  ...formValue,
                  certification: item.target.value,
                });
              }}
              width="100%"
              label="License Type"
              required={true}
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
            >
              <MenuItem value="">
                <em>none</em>
              </MenuItem>
              {pageData.certifications.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-required-label">
              Year of Experience *
            </InputLabel>
            <Select
              value={formValue.yearofExperience}
              onChange={(item) => {
                setFormValue({
                  ...formValue,
                  yearofExperience: item.target.value,
                });
              }}
              width="100%"
              label="Year of Experience"
              required={true}
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
            >
              <MenuItem value="">
                <em>none</em>
              </MenuItem>
              {pageData.YearofExperience.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-required-label">
              Expiration *
            </InputLabel>
            <Select
              value={formValue.expirationDate}
              onChange={(item) => {
                setFormValue({
                  ...formValue,
                  expirationDate: item.target.value,
                });
              }}
              width="100%"
              label="Expiration"
              required={true}
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
            >
              <MenuItem value="">
                <em>none</em>
              </MenuItem>
              {pageData.ExpirationInHour.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-required-label">
              Break
            </InputLabel>
            <Select
              value={formValue.break}
              onChange={(item) => {
                setFormValue({ ...formValue, break: item.target.value });
              }}
              width="100%"
              label="Break *"
              required={true}
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
            >
              <MenuItem value="">
                <em>none</em>
              </MenuItem>
              {pageData.breaks.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            type="date"
            required
            id="outlined-required"
            label="Enter Start Date"
            placeholder="none"
            value={formValue.startDate}
            onChange={(e) =>
              setFormValue({ ...formValue, startDate: e.target.value })
            }
          />
          <TextField
            type="date"
            required
            id="outlined-required"
            label="Enter End Date"
            value={formValue.endDate}
            onChange={(e) =>
              setFormValue({ ...formValue, endDate: e.target.value })
            }
          />
          <TextField
            type="time"
            required
            id="outlined-required"
            label="Enter Start Time"
            value={formValue.startTime}
            onChange={(e) =>
              setFormValue({ ...formValue, startTime: e.target.value })
            }
          />
          <TextField
            type="time"
            required
            id="outlined-required"
            label="Enter End Time"
            value={formValue.endTime}
            onChange={(e) =>
              setFormValue({ ...formValue, endTime: e.target.value })
            }
          />
          <FormControl>
            <InputLabel id="demo-simple-select-required-label">
              Customer *
            </InputLabel>
            <Select
              value={formValue.customer}
              onChange={(item) => {
                setFormValue({ ...formValue, customer: item.target.value });
              }}
              width="100%"
              label="Customer"
              required={true}
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
            >
              <MenuItem value="">
                <em>none</em>
              </MenuItem>
              <MenuItem value={10}>CNA</MenuItem>
              <MenuItem value={21}>Create Visit</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            id="outlined-required"
            label="Address"
            placeholder="Enter Street Address"
            value={formValue.street}
            onChange={(item) => {
              setFormValue({ ...formValue, street: item.target.value });
            }}
          />
          <TextField
            value={formValue.city}
            onChange={(item) => {
              setFormValue({ ...formValue, city: item.target.value });
            }}
            required
            id="outlined-required"
            label="City"
          />
          <TextField
            value={formValue.zip}
            onChange={(item) => {
              setFormValue({ ...formValue, zip: item.target.value });
            }}
            required
            id="outlined-required"
            label="Zip Code"
          />
          <TextField
            value={formValue.state}
            onChange={(item) => {
              setFormValue({ ...formValue, state: item.target.value });
            }}
            required
            id="outlined-required"
            label="State"
          />
          <TextField
            value={formValue.country}
            onChange={(item) => {
              setFormValue({ ...formValue, country: item.target.value });
            }}
            required
            id="outlined-required"
            label="Country"
          />
          <TextField
            value={formValue.unit}
            onChange={(item) => {
              setFormValue({ ...formValue, unit: item.target.value });
            }}
            required
            id="outlined-required"
            label="Unit"
          />
          <TextField
            value={formValue.floor}
            onChange={(item) => {
              setFormValue({ ...formValue, floor: item.target.value });
            }}
            required
            id="outlined-required"
            label="Floor"
          />
          <TextField
            value={formValue.baseRate}
            onChange={(item) => {
              setFormValue({ ...formValue, baseRate: item.target.value });
            }}
            type="number"
            required
            id="outlined-required"
            label="Base Rate"
            placeholder="Rate $"
          />
          <Box className="flex  items-center ">
            <Typography>Disable Bid ?</Typography>
            <PinkSwitch {...label} value={bid} onChange={(e) => setBid(e.target.checked)}  label="Bid" />
            <Typography>Enable Bid ?</Typography>
          </Box>
          <TextField
            required
            id="outlined-required"
            label="Notes"
            placeholder="Add Notes"
            value={formValue.notes}
            onChange={(item) => {
              setFormValue({ ...formValue, notes: item.target.value });
            }}
          />
          <Box className="flex items-center gap-5">
            <Box className="flex items-center">
              <Checkbox
                {...label}
                defaultChecked
                sx={{
                  color: teal[500],
                  "&.Mui-checked": {
                    color: teal[500],
                  },
                }}
              />
              <Typography>Repeat</Typography>
            </Box>
            <Box className="flex items-center">
              <Checkbox
                {...label}
                defaultChecked
                sx={{
                  color: teal[500],
                  "&.Mui-checked": {
                    color: teal[500],
                  },
                }}
              />
              <Typography>Save as Template</Typography>
            </Box>
            <Box className="flex items-center">
              <Checkbox
                {...label}
                defaultChecked
                sx={{
                  color: teal[500],
                  "&.Mui-checked": {
                    color: teal[500],
                  },
                }}
              />
              <Typography>Publish</Typography>
            </Box>
          </Box>
        </Box>

        <Button
          type="submit"
          sx={{
            color: teal[500],
            "&.Mui-checked": {
              color: teal[500],
            },
            mt: 3,
            mb: 5,
            width: "100%",
          }}
          variant="outlined"
        >
          Save
        </Button>
      </Box>
    </form>
  );
};
export default AddNewJobs;
