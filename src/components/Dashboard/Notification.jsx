import { Avatar, Typography } from "@mui/material";
import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Image } from "@mui/icons-material";

const Notification = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-10 mt-10 ">
        <div className="border border-teal-500 mb-10 rounded-md">
          <p className="text-xl p-3 mb-2 font-bold border-teal-500 border-b-2">
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
        </div>
        <div className="mr-8">
          <div className="border border-teal-500 mb-10 rounded-md">
            <p className="text-xl p-3 mb-2 font-bold border-teal-500 border-b-2">
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
                <p className="font-bold">
                Timothy Moreno placed a Order
                </p>
                <p className="text-red-500">InActive</p>
              </div>
            </div>
            <div className="flex gap-5 p-5">
              <Avatar
                alt="cindy"
                src="https://mui.com/static/images/avatar/1.jpg"
              />
              <div className="flex flex-col">
                <p className="font-bold">
                Harry Simpson placed a Order
                </p>
                <p className="text-gray-500">9 hours ago</p>
              </div>
            </div>
            <div className="flex gap-5 p-5">
              <Avatar
                alt="cindy"
                src="https://mui.com/static/images/avatar/3.jpg"
              />
              <div className="flex flex-col">
                <p className="font-bold">
                Stephenie Marshall got a huge bonus
                </p>
                <p className="text-green-500">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
