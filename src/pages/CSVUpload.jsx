import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CSVUpload = () => {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const param = useParams();

  console.log(array);

  return (
    <div
      className="flex flex-col justify-center items-center h-[100%]"
      style={{ textAlign: "center" }}
    >
      <h1 className="text-xl font-bold my-3">CSV IMPORT</h1>

      <form>
        {array.length > 0 ? (
          <>
            <p className="font-bold text-lg text-[#228571]">
              Total Data : {array.length}{" "}
            </p>
          </>
        ) : (
          <>
            <label htmlFor="csvFileInput" className="">
              <div className="border border-black w-fit p-5 px-10 rounded-md">
                <CloudUploadIcon sx={{ fontSize: 50 }} />
                <h5 className="text-center text-lg">
                  Upload your CSV File Here
                </h5>
              </div>
            </label>

            <input
              type={"file"}
              id={"csvFileInput"}
              accept={".csv"}
              style={{ display: "none" }}
              onChange={handleOnChange}
            />
          </>
        )}

        <div className="flex gap-5 items-center justify-center">
          {array.length > 0 ? (
            <button
              type="reset"
              className="text-sm font-bold bg-[#71d2be] p-3 rounded-md mt-5"
            >
              Submit
            </button>
          ) : (
            <button
              className="text-sm font-bold bg-[#71d2be] p-3 rounded-md mt-5"
              onClick={(e) => {
                handleOnSubmit(e);
              }}
            >
              IMPORT CSV
            </button>
          )}
          <button
            type="reset"
            className="text-sm font-bold bg-[#71d2be] p-3 rounded-md mt-5"
            onClick={() => {
              setArray([]);
            }}
          >
            RESET
          </button>
        </div>
      </form>

    <div className="h-[200px]" />
    </div>
  );
};

export default CSVUpload;
