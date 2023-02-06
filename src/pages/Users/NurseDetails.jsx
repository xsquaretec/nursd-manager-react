import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "../../components/Heading";

const NurseDetails = () => {
  const pathname = useParams();
  const [pageData, setPageData] = useState([]);

  const getData = async () => {
    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/user/${pathname.str}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => setPageData(res.data));
  };

  useEffect(() => {
    getData();
  }, [pathname]);

  return (
    <div>
      <Heading
        title={`${pageData.firstName + " " + pageData.lastName} Details`}
      />

      <img
        src={pageData.profileImage}
        alt=""
        className="w-40 h-40 object-cover rounded-full mb-10"
      />

      <p>First Name : {pageData.firstName}</p>
      <p>Last Name : {pageData.lastName}</p>
      <p>Email : {pageData.email}</p>
      <p>Phone Number : {pageData.phoneNumber}</p>
      <p>Gender : {pageData.gender}</p>
      <p>DOB : {pageData.dateOfBirth}</p>
      <p>Available : {pageData.isAvailable}</p>
      <p>Verify : {pageData.isAccountVerified}</p>
      <p>Verify from Manager : {pageData.isVerifiedFromManager}</p>
    </div>
  );
};

export default NurseDetails;
