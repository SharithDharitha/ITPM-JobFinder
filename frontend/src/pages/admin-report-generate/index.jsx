import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

const AdminReportGenerate = () => {
  const [job, setJob] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:5000/job/")
      .then((res) => setJob(res.data))
      .catch((error) => console.log(error));
  });

  let jobCount = 0;
  let jobTotal = 0;

  job.map(
    (elem) => (
    ("Total Vacancy " + elem.jobTitle),
      (jobCount = jobCount + 1),
      (jobTotal = jobTotal + parseInt(elem.jobTitle))
    )
  );

  let count = 0;
  let total = 0;
  job.map(
    (elem) => (
     ("Total Vacancy " + elem.companyName),
      (count = count + 1),
      (total = total + parseInt(elem.companyName))
    )
  );

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  return (
    <>
      <h1 className="text-center mt-4" >Report Generate</h1>

      <table className="table mt-4" ref={componentRef}>
        <thead>
          <tr>
            <th scope="col">Company Name</th>
            <th scope="col">Address</th>
            <th scope="col">Title</th>
            <th scope="col">Type</th>
            <th scope="col">Duration</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {job.map((elem) => (
            <tr>
              <th scope="row">{elem.companyName}</th>
              <td>{elem.companyAddress}</td>
              <td>{elem.jobTitle}</td>
              <td>{elem.jobType}</td>
              <td>{elem.jobDuration}</td>
              <td>{elem.description}</td>
            </tr>
          ))}
        </tbody>
        <ul>
          <li className="fw-bold mt-4">
            Total Number of Company Requested Vacancy : {count}{" "}
          </li>
          <li className="fw-bold">
            Total Number of Available Jobs : {jobCount}{" "}
          </li>
        </ul>
      </table>

      <div className="col-md-12 p-4">
        {" "}
        <button
          onClick={handlePrint}
          className="btn btn-success btn-lg btn text-center">
          Download
        </button>
      </div>

    </>
  );
};

export default AdminReportGenerate;
