import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Heading from "../../components/Heading";
import { Button, TextField, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { teal } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditJob = () => {
  const successMsg = (e) => toast.success(e);
  const errorMsg = (e) => toast.error(e);

  const navigate = useNavigate();
  const [pageData, setPageData] = useState([]);
  const auth = useAuth();
  const pathname = useParams();

  const [loading, setLoading] = useState(true);

  const getData = async () => {
    await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/commonEnum`, {
      headers: {
        Authorization: `Bearer ${auth.user}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setPageData(res.data));
  };

  const [formData, setFormData] = useState([]);

  const editFormDetail = async () => {
    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/job/${pathname.str}`,
      {
        headers: {
          Authorization: `Bearer ${auth.user}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setFormData(res.data);
      });
  };

  useEffect(() => {
    getData();
    editFormDetail();
  }, []);

  useEffect(() => {
    if (formData.length !== 0) {
      setFormValue({
        licenseType: formData?.licenseType,
        shiftTitle: formData?.shiftTitle,
        specialty: formData?.specialty[0],
        certification: formData?.certification[0],
        yearofExperience: formData?.yearofExperience,
        startDate: formData?.startDate,
        endDate: formData?.endDate,
        startTime: formData?.startTime,
        endTime: formData?.endTime,
        break: formData?.break,
        customer: formData?.customer,
        street: formData?.address?.street,
        city: formData?.address?.city,
        state: formData?.address?.state,
        zip: formData?.address?.zip,
        country: formData?.address?.country,
        unit: formData?.address?.unit,
        floor: formData?.address?.floor,
        baseRate: formData?.baseRate,
        notes: formData?.notes,
        maxBidValue: formData?.maxBidValue,
        bid: formValue?.isEnableBid,
      });
      setLoading(false);
    }
  }, [formData]);

  const [bid, setBid] = useState(false);

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

  const [formValue, setFormValue] = useState({
    // Final Fields
    licenseType: "",
    shiftTitle: "",
    specialty: "",
    certification: "",
    yearofExperience: "",
    expirationTime: "",
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
    maxBidValue: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = JSON.stringify({
      jobType: formData.jobType,
      licenseType: formValue.licenseType,
      shiftTitle: formValue.shiftTitle,
      specialty: [formValue.specialty],
      certification: [formValue.certification],
      yearofExperience: formValue.yearofExperience,
      expirationTime: formData.expirationTime,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      startTime: new Date(formData.startTime),
      endTime: new Date(formData.endTime),
      customer: formValue.customer,
      address: {
        street: formValue.street,
        city: formValue.city,
        zip: formValue.zip,
        state: formValue.state,
        country: formValue.country,
        unit: formValue.unit,
        floor: formValue.floor,
      },
      baseRate: formValue.baseRate,
      isEnableBid: bid,
      maxBidValue: formValue.maxBidValue,
      notes: formValue.notes,
    });

    const token = auth.user;

    var config = {
      method: "PUT",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/job/${formData._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
          errorMsg(res.data.message);
        } else {
          alert(res.data.message);
          successMsg(res.data.message);
        }
      })
      .then(() => navigate("/unfulfilled-jobs"));
  };

  return loading ? (
    <Typography>Loading...</Typography>
  ) : (
    <form onSubmit={handleSubmit}>
      <Box className="w-[95%]">
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          limit={3}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Heading title="Edit Job" />
        </Box>
        <Box className="grid grid-cols-2 gap-x-20 gap-y-5 mt-5 ">
          <FormControl>
            <InputLabel id="demo-simple-select-required-label">
              License Type *
            </InputLabel>
            <Select
              value={formValue?.licenseType}
              onChange={(item) => {
                setFormValue({ ...formValue, licenseType: item.target.value });
              }}
              width="100%"
              label="License Type"
              required={true}
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
            >
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
              value={formValue.expirationTime}
              onChange={(item) => {
                setFormValue({
                  ...formValue,
                  expirationTime: item.target.value,
                });
              }}
              width="100%"
              label="Expiration"
              required={true}
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
            >
              {pageData.ExpirationInHour.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <TextField
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
          /> */}
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
              {pageData.breaks.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            id="outlined-required"
            label="Customer Name"
            placeholder="Enter Customer Name"
            value={formValue.customer}
            onChange={(item) => {
              setFormValue({ ...formValue, customer: item.target.value });
            }}
          />
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
          <Box className="flex  items-center ">
            <Typography>Disable Bid ?</Typography>
            <PinkSwitch
              {...label}
              defaultChecked={bid}
              value={bid}
              onChange={(e) => setBid(e.target.checked)}
              label="Bid"
            />
            <Typography>Enable Bid ?</Typography>
          </Box>

          {bid && (
            <TextField
              type="number"
              required
              id="outlined-required"
              label="Bid Value"
              placeholder="Bid Value"
              value={formValue.maxBidValue}
              onChange={(item) => {
                setFormValue({ ...formValue, maxBidValue: item.target.value });
              }}
            />
          )}
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
          Update Job
        </Button>
      </Box>
    </form>
  );
};
export default EditJob;
