import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminJobManagement = () => {
  const [job, setJob] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/job/")
      .then((res) => setJob(res.data))
      .catch((error) => console.log(error));
  });

  const deleteJob = (id) => {
    axios
      .delete(`http://localhost:5000/job/${id}`)
      .then((res) => alert("Job Deleted"));

    setJob(job.filter((elem) => elem.id !== id));
  };

  return (
    <>
      <h1 className="text-center mt-4">Admin Job Management</h1>

      <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col">Company Name</th>
            <th scope="col">Address</th>
            <th scope="col">Title</th>
            <th scope="col">Type</th>
            <th scope="col">Duration</th>
            <th scope="col">Description</th>
            <th scope="col">Delete</th>
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

              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteJob(elem._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminJobManagement;
