import {
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import { useAuth } from "../../../context/auth";

const style = {
  borderRadius: "10px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const SuperAdminProfile = () => {
  const auth = useAuth();
  const [pageData, setPageData] = useState([]);

  const [loading, setLoading] = useState(true);

  const getData = async () => {
    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/adminManagerSingleProfile`,
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return loading ? (
    "Loading..."
  ) : (
    <>
      <Modal
        sx={{ borderRadius: "15px" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{
              marginBottom: 5,
              color: "#13b493",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Super Admin Profile
          </Typography>
          <Box className="grid grid-cols-2 gap-10">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
            />
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField id="outlined-basic" label="Number" variant="outlined" />
          </Box>
          <Button
            sx={{
              marginTop: 5,
              backgroundColor: "#13b493",
              color: "white",
              "&:hover": {
                color: "#13b493",
              },
            }}
          >
            Save
          </Button>
        </Box>
      </Modal>
      <Box className="p-10 flex flex-col gap-5">
        <Box className="flex items-center gap-3">
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: "bold",
            }}
            className=" text-teal-500 font-semibold"
          >
            Super Admin Profile
          </Typography>
          <Button onClick={handleOpen}>
            <CreateIcon className="text-teal-500 border border-teal-500 p-[2px] text-2xl rounded-md" />
          </Button>
        </Box>
        <Typography className="text-teal-500">
          First Name: <span className="text-black">{pageData.firstName} </span>
        </Typography>
        <Typography className="text-teal-500">
          Last Name: <span className="text-black">{pageData.lastName}</span>
        </Typography>
        <Typography className="text-teal-500">
          Email: <span className="text-black">{pageData.email}</span>
        </Typography>
        <Typography className="text-teal-500">
          Number: <span className="text-black">{pageData.phoneNumber}</span>
        </Typography>
      </Box>
    </>
  );
};

export default SuperAdminProfile;
