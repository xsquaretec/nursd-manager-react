import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const CustomerSupport = () => {
  const [pageData, setPageData] = useState([]);

  const getData = async () => {
    await fetch(
      `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/customerSupport/63e0f1d09e9f089ce94dd8ee`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
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

  const [loading, setLoading] = useState(true);

  return loading ? (
    "Loading..."
  ) : (
    <div>
      <Heading title="Customer Support" />

      <div className="flex items-center">
        <img
          src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?w=826&t=st=1675686830~exp=1675687430~hmac=dd83a860de8ed8b0b77ee8fc0cab5fc84797a49608420a2aaa030a5dc7b03bfd"
          alt=""
          className="w-1/4"
        />
        <div>
          <p className="text-xl font-bold">
            <span className="font-normal">
              <EmailIcon color="primary" />
            </span>{" "}
            {pageData.email}
          </p>
          <p className="text-xl font-bold">
            <span className="font-normal">
              <PhoneIcon color="primary" />
            </span>{" "}
            {pageData.phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
