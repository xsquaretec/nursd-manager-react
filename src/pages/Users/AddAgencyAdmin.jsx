import { Box, Button, useTheme } from "@mui/material";
import React, { useState } from "react";
import Heading from "../../components/Heading";
import { tokens } from "../../theme/theme";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useForm } from "react-hook-form";

const AddAgencyAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = async (res) => {
    const data = {
      firstName: res.firstName,
      lastName: res.lastName,
      email: res.email,
      phoneNumber: res.phoneNumber,
      password: res.password,
      address: {
        street: res.street,
        city: res.city,
        zip: res.zip,
        state: res.state,
        country: res.country,
      },
      organizationDetails: {
        organizationName: res.organizationName,
        organizationID: res.organizationID,
        organizationDirectorName: res.organizationDirectorName,
      },
      role: "admin",
    };

    await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/adminProfile`, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        reset();
      });
  };

  return (
    <>
      <Heading title="Add Agency" />

      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-10">
            <div className="">
              <p className="font-bold mb-3">Personal Details</p>

              <div className="flex flex-col gap-5 w-full">
                <input
                  type="text"
                  placeholder="First Name"
                  style={{
                    borderWidth: "2px",
                    borderColor: errors["firstName"]
                      ? "red"
                      : colors.primary[500],
                  }}
                  className={`w-full rounded-md p-2 focus:outline-none `}
                  {...register("firstName", {
                    required: true,
                  })}
                  defaultValue={getValues("firstName")}
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  style={{
                    borderWidth: "2px",
                    borderColor: errors["lastName"]
                      ? "red"
                      : colors.primary[500],
                  }}
                  className={`w-full rounded-md p-2 focus:outline-none `}
                  {...register("lastName", {
                    required: true,
                  })}
                  defaultValue={getValues("lastName")}
                />

                <input
                  type="email"
                  placeholder="Email"
                  style={{
                    borderWidth: "2px",
                    borderColor: errors["email"] ? "red" : colors.primary[500],
                  }}
                  className={`w-full rounded-md p-2 focus:outline-none `}
                  {...register("email", {
                    required: true,
                  })}
                  defaultValue={getValues("email")}
                />

                <input
                  type="number"
                  placeholder="Phone Number"
                  style={{
                    borderWidth: "2px",
                    borderColor: errors["phoneNumber"]
                      ? "red"
                      : colors.primary[500],
                  }}
                  className={`w-full rounded-md p-2 focus:outline-none `}
                  {...register("phoneNumber", {
                    required: true,
                  })}
                  defaultValue={getValues("phoneNumber")}
                />

                <input
                  type="password"
                  placeholder="Password"
                  style={{
                    borderWidth: "2px",
                    borderColor: errors["password"]
                      ? "red"
                      : colors.primary[500],
                  }}
                  className={`w-full rounded-md p-2 focus:outline-none `}
                  {...register("password", { required: true })}
                  defaultValue={getValues("password")}
                />
              </div>
            </div>

            <div className="">
              <p className="font-bold mb-3">Address Details</p>

              <div className="flex flex-col gap-5 w-full">
                <input
                  type="text"
                  placeholder="street"
                  style={{
                    borderWidth: "2px",
                    borderColor: errors["firstName"]
                      ? "red"
                      : colors.primary[500],
                  }}
                  className={`w-full rounded-md p-2 focus:outline-none `}
                  {...register("street")}
                  defaultValue={getValues("street")}
                />
                <input
                  type="text"
                  placeholder="city"
                  style={{
                    borderWidth: "2px",
                    borderColor: errors["firstName"]
                      ? "red"
                      : colors.primary[500],
                  }}
                  className={`w-full rounded-md p-2 focus:outline-none `}
                  {...register("city")}
                  defaultValue={getValues("city")}
                />
                <input
                  type="number"
                  placeholder="zip"
                  style={{
                    borderWidth: "2px",
                    borderColor: errors["firstName"]
                      ? "red"
                      : colors.primary[500],
                  }}
                  className={`w-full rounded-md p-2 focus:outline-none `}
                  {...register("zip")}
                  defaultValue={getValues("zip")}
                />
                <input
                  type="text"
                  placeholder="state"
                  style={{
                    borderWidth: "2px",
                    borderColor: errors["firstName"]
                      ? "red"
                      : colors.primary[500],
                  }}
                  className={`w-full rounded-md p-2 focus:outline-none `}
                  {...register("state")}
                  defaultValue={getValues("state")}
                />
                <input
                  type="text"
                  placeholder="country"
                  style={{
                    borderWidth: "2px",
                    borderColor: errors["firstName"]
                      ? "red"
                      : colors.primary[500],
                  }}
                  className={`w-full rounded-md p-2 focus:outline-none `}
                  {...register("country")}
                  defaultValue={getValues("country")}
                />
              </div>
            </div>

            <div className="">
              <p className="font-bold mb-3">Organization Details</p>

              <div className="flex flex-col gap-5 w-full">
                <input
                  type="text"
                  placeholder="Organization Name"
                  style={{
                    borderWidth: "2px",
                    borderColor: errors["firstName"]
                      ? "red"
                      : colors.primary[500],
                  }}
                  className={`w-full rounded-md p-2 focus:outline-none `}
                  {...register("organizationName")}
                  defaultValue={getValues("organizationName")}
                />
                <input
                  type="text"
                  placeholder="Organization ID"
                  style={{
                    borderWidth: "2px",
                    borderColor: errors["firstName"]
                      ? "red"
                      : colors.primary[500],
                  }}
                  className={`w-full rounded-md p-2 focus:outline-none `}
                  {...register("organizationID")}
                  defaultValue={getValues("organizationID")}
                />
                <input
                  type="text"
                  placeholder="Organization Director Name"
                  style={{
                    borderWidth: "2px",
                    borderColor: errors["firstName"]
                      ? "red"
                      : colors.primary[500],
                  }}
                  className={`w-full rounded-md p-2 focus:outline-none `}
                  {...register("organizationDirectorName")}
                  defaultValue={getValues("organizationDirectorName")}
                />
              </div>
            </div>
          </div>
          {/* {errors && (
            <p className="mt-5 text-red-500">All Fields Are Required...</p>
          )} */}

          <Button
            type="submit"
            variant="outlined"
            sx={{ mt: 2, fontWeight: "700" }}
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddAgencyAdmin;
