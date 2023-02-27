import {
  Avatar,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Notification = () => {
  const [ticket, setTicket] = useState([]);
  const auth = useAuth();

  const getData = async () => {
    const token = auth.user;

    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/manager/contact_us?skip=1&limit=3`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => setTicket(res.data));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-10 mt-10 ">
        {/* Notification */}

        {/* <div className="border border-teal-500 rounded-md ">
          <p className="text-xl p-3 mb-2 font-bold border-teal-500 border-b-2 rounded-b-md bg-[#6dfdde5d]">
            Notification
          </p>
          <p className="font-bold ml-3 text-2xl my-3 text-teal-500 underline">
            Last Week Posted
          </p>
          <div className="flex items-start">
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                  mb: 10,
                },
              }}
            >
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="flex  gap-5 ">
                  <Typography className="text-teal-500 font-bold text-lg">
                    11 Feb
                  </Typography>
                  <Typography className="">Posted Job</Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="flex  gap-5 ">
                  <Typography className="text-teal-500 font-bold text-lg">
                    12 Feb
                  </Typography>
                  <Typography className="">Accepted Job</Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot sx={{ color: "black" }} />
                </TimelineSeparator>
                <TimelineContent className="flex  gap-5 ">
                  <Typography className="text-teal-500 font-bold text-lg">
                    13 Feb
                  </Typography>
                  <Typography className="">Open Job Job</Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
        </div> */}

        {/* Recent Activity */}

        {/* <div className="mr-8">
          <div className="border border-teal-500 rounded-md">
            <p className="text-xl p-3 mb-2 font-bold border-teal-500 border-b-2 rounded-b-md bg-[#6dfdde5d]">
              Recent Activities
            </p>
            <div className="flex gap-5 p-5">
              <Avatar
                alt="cindy"
                src="https://mui.com/static/images/avatar/3.jpg"
              />
              <div className="flex flex-col">
                <p className="font-bold">
                  Kieth Jensen requested to Withdrawal
                </p>
                <p className="text-green-500">Active</p>
              </div>
            </div>
            <div className="flex gap-5 p-5">
              <Avatar
                alt="cindy"
                src="https://mui.com/static/images/avatar/2.jpg"
              />
              <div className="flex flex-col">
                <p className="font-bold">Timothy Moreno placed a Order</p>
                <p className="text-red-500">InActive</p>
              </div>
            </div>
            <div className="flex gap-5 p-5">
              <Avatar
                alt="cindy"
                src="https://mui.com/static/images/avatar/1.jpg"
              />
              <div className="flex flex-col">
                <p className="font-bold">Harry Simpson placed a Order</p>
                <p className="text-gray-500">9 hours ago</p>
              </div>
            </div>
            <div className="flex gap-5 p-5">
              <Avatar
                alt="cindy"
                src="https://mui.com/static/images/avatar/3.jpg"
              />
              <div className="flex flex-col">
                <p className="font-bold">Stephenie Marshall got a huge bonus</p>
                <p className="text-green-500">Active</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Support Requests */}

        <div className="mb-10">
          <div className="border border-teal-500 mb-10 rounded-md">
            <div className="flex  items-center justify-between p-3 mb-2 font-bold border-teal-500 border-b-2 rounded-b-md bg-[#6dfdde5d] ">
              <p className="text-xl">Support Requests</p>
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Ticket
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  autoWidth
                  label="Select Job"
                >
                  <MenuItem value={"nurse"}>Nurse</MenuItem>
                  <MenuItem value={"manager"}>Manager</MenuItem>
                </Select>
              </FormControl>
            </div>

            {ticket.map((item, index) => (
              <div className="flex gap-5 p-5 justify-between">
                <div className="flex  gap-5">
                  <Avatar
                    alt="cindy"
                    src="data:image/jpeg;base64,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"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{item.name}</p>
                    <p className="text-gray-500">
                      {item.email} | {item.phoneNumber}
                    </p>
                    <p className="text-gray-500">{item.message}</p>
                  </div>
                </div>
                <div className="flex justify-center text-center">
                  <p className="text-gray-500">
                    {moment(item.updatedAt).fromNow()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New user */}

        <div className="mr-8">
          <div className="border border-teal-500 mb-10 rounded-md">
            <div className="flex  items-center justify-between p-3 mb-2 font-bold border-teal-500 border-b-2 rounded-b-md bg-[#6dfdde5d] ">
              <p className="text-xl">New Users </p>
              <Link
                href="/all-agency-admin"
                style={{ textDecoration: "none" }}
                className="cursor-pointer"
              >
                <p className="mr-5">View All</p>
              </Link>
            </div>
            <div className="flex gap-5 p-5 justify-between">
              <div className="flex  gap-5">
                <Avatar
                  alt="cindy"
                  src="data:image/jpeg;base64,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"
                />
                <div className="flex flex-col">
                  <p className="font-bold">Vincent Lopez</p>
                  <p className="text-gray-500">
                    Thanks for contact us with your issues...
                  </p>
                  <p className="text-gray-500">6 min ago</p>
                </div>
              </div>
            </div>
            <div className="flex gap-5 p-5 justify-between">
              <div className="flex  gap-5">
                <Avatar
                  alt="cindy"
                  src="data:image/jpeg;base64,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"
                />
                <div className="flex flex-col">
                  <p className="font-bold">Vincent Lopez</p>
                  <p className="text-gray-500">
                    Thanks for contact us with your issues...
                  </p>
                  <p className="text-gray-500">6 min ago</p>
                </div>
              </div>
            </div>
            <div className="flex gap-5 p-5 justify-between">
              <div className="flex  gap-5">
                <Avatar
                  alt="cindy"
                  src="data:image/jpeg;base64,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"
                />
                <div className="flex flex-col">
                  <p className="font-bold">Vincent Lopez</p>
                  <p className="text-gray-500">
                    Thanks for contact us with your issues...
                  </p>
                  <p className="text-gray-500">6 min ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
