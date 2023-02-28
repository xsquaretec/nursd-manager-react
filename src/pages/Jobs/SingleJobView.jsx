import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";

const SingleJobView = () => {
  const pathname = useParams();
  const [pageData, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = useAuth();

  const getData = async () => {
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
        setPageData(res.data);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, [pathname, auth]);

  return (
    <div className="max-w-[1000px]">
      <p className="text-teal-500 font-semibold text-[30px] mb-10 mt-5">
        Job Details
      </p>
      <div className="grid grid-cols-2 gap-10">
        <div className="">
          <p className="font-semibold text-lg mb-2">Job ID</p>
          <p className="border-b pb-3 mb-3">{pageData?.jobID}</p>

          <p className="font-semibold text-lg mb-2">Shift Details</p>
          <p className="border-b pb-3 mb-3">{pageData?.shiftTitle}</p>

          <p className="font-semibold text-lg mb-2">Expiration</p>
          <p className="border-b pb-3 mb-3">
            {moment(pageData?.expirationDate).fromNow()}
          </p>

          <p className="font-semibold text-lg mb-2">Shift Date</p>
          <p className="border-b pb-3 mb-3">
            {moment(pageData?.startDate).format("MMM Do YYYY")}
          </p>

          <p className="font-semibold text-lg mb-2">Shift Time</p>
          <p className="border-b pb-3 mb-3">
            {moment(pageData?.startTime).format("LT") +
              " - " +
              moment(pageData?.endTime).format("LT")}
          </p>
        </div>
        <div className="">
          <p className="font-semibold text-lg mb-2">Address</p>
          <p className="border-b pb-3 mb-3">
            {pageData?.address?.street +
              " " +
              pageData?.address?.city +
              " " +
              pageData?.address?.zip +
              " " +
              pageData?.address?.state +
              ", " +
              pageData?.address?.country}
          </p>

          <p className="font-semibold text-lg mb-2">Unit / Floor</p>
          <p className="border-b pb-3 mb-3">
            {pageData?.address?.unit + " - " + pageData?.address?.floor}
          </p>

          <p className="font-semibold text-lg mb-2">Specialty</p>
          <p className="border-b pb-3 mb-3">
            {pageData?.specialty?.map((item) => {
              return item + ", ";
            })}
          </p>

          <p className="font-semibold text-lg mb-2">Break</p>
          <p className="border-b pb-3 mb-3">{pageData?.break + " Mins"}</p>

          <div className="grid grid-cols-2">
            <div className="">
              <p className="font-semibold text-lg mb-2">Current Rate</p>
              <p className="border-b pb-3 mb-3 text-green-600">
                $ {pageData?.baseRate + " / hr"}
              </p>
            </div>
            <div className="">
              <p className="font-semibold text-lg mb-2">Current Rate</p>
              <p className="border-b pb-3 mb-3 text-red-600">
                $ {pageData?.maxBidValue + " / hr"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJobView;
