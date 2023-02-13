import { Box } from "@mui/system";
import React, { useState } from "react";
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
// LicenseInfo.setLicenseKey('YOUR_LICENSE_KEY');

// function getWeeksAfter(date, amount) {
//     return date ? date.add(amount, 'week') : undefined;
//   }

const AddNewJobs = () => {
  const [age, setAge] = useState("");
  const [license, setLicense] = useState("");
  const [value, setValue] = useState([null, null]);
  const handleChange = (event) => {
    setLicense(event.target.value);
  };

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

  return (
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
          <FormControl sx={{ m: 1, minWidth: 150, }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Select Jobs
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={age}
              onChange={handleChange}
              autoWidth
              label="Select Job"
            >
              <MenuItem value="">
                <em>none</em>
              </MenuItem>
              <MenuItem value={10}>Create Shift</MenuItem>
              <MenuItem value={21}>Create Visit</MenuItem>
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
            value={license}
            onChange={handleChange}
            width="100%"
            label="License Type"
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
        <TextField required id="outlined-required" label="Shift Title" />
        <FormControl className="">
          <InputLabel id="demo-simple-select-required-label">
            Specialty *
          </InputLabel>
          <Select
            value={license}
            onChange={handleChange}
            width="100%"
            label="Specialty *"
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
        <FormControl>
          <InputLabel id="demo-simple-select-required-label">
            Certification *
          </InputLabel>
          <Select
            value={license}
            onChange={handleChange}
            width="100%"
            label="License Type"
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
        <FormControl>
          <InputLabel id="demo-simple-select-required-label">
            Year of Experience *
          </InputLabel>
          <Select
            value={license}
            onChange={handleChange}
            width="100%"
            label="Year of Experience"
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
        <FormControl>
          <InputLabel id="demo-simple-select-required-label">
            Year of Experience *
          </InputLabel>
          <Select
            value={license}
            onChange={handleChange}
            width="100%"
            label="Year of Experience"
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
        <FormControl>
          <InputLabel id="demo-simple-select-required-label">
            Expiration *
          </InputLabel>
          <Select
            value={license}
            onChange={handleChange}
            width="100%"
            label="Expiration"
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
        <FormControl>
          <InputLabel id="demo-simple-select-required-label">Break</InputLabel>
          <Select
            value={license}
            onChange={handleChange}
            width="100%"
            label="Break *"
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
          type="date"
          
          required
          id="outlined-required"
          label="Enter Start Date"
          placeholder="none"
        />
        <TextField
          type="date"
          required
          id="outlined-required"
          label="Enter End Date"
        />
        <TextField
          type="time"
          required
          id="outlined-required"
          label="Enter Start Time"
        />
        <TextField
          type="time"
          required
          id="outlined-required"
          label="Enter End Time"
        />
        <FormControl>
          <InputLabel id="demo-simple-select-required-label">
            Customer *
          </InputLabel>
          <Select
            value={license}
            onChange={handleChange}
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
        />
        <TextField required id="outlined-required" label="City" />
        <TextField required id="outlined-required" label="Zip Code" />
        <TextField required id="outlined-required" label="State" />
        <TextField required id="outlined-required" label="Country" />
        <TextField required id="outlined-required" label="Unit" />
        <TextField required id="outlined-required" label="Floor" />
        <TextField
          type="number"
          required
          id="outlined-required"
          label="Base Rate"
          placeholder="Rate $"
        />
        <Box className="flex  items-center ">
          <Typography>Disable Bid ?</Typography>
          <PinkSwitch {...label} defaultChecked label="Bid" />
          <Typography>Enable Bid ?</Typography>
        </Box>
        <TextField
          required
          id="outlined-required"
          label="Notes"
          placeholder="Add Notes"
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
        sx={{
          color: teal[500],
          "&.Mui-checked": {
            color: teal[500],
          },
          mt: 3,
          mb: 5,
          width:"100%",
        }}
        variant="outlined"
      >
        Save
      </Button>
    </Box>
  );
};
export default AddNewJobs;
