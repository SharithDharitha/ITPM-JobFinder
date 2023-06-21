import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const ViewAllJob = () => {
  const [jobs, setJobs] = useState([]);
  const id=localStorage.getItem("uID")

  useEffect(() => {
    // Fetch the list of jobs from the backend API
    axios.get('http://localhost:5000/job')
      .then((response) => {
        const data = response.data;
        setJobs(data);
      })
      .catch((error) => {
        console.log('Error occurred:', error);
        // Handle any errors that occurred during the request or perform any desired actions
      });
  }, []);

  const handleEdit = (jobId) => {
    // Handle the edit action for a job with the given jobId
    // You can redirect to a form page to edit the job details
    console.log('Edit job with ID:', jobId);
  };

  const handleDelete = (jobId) => {
    // Handle the delete action for a job with the given jobId
    // Make a DELETE request to the backend API endpoint to delete the job
    axios.delete(`http://localhost:5000/job/${jobId}`)
      .then((response) => {
        const data = response.data;
        // Handle the response from the backend
        console.log('Job deleted:', data);
        // Refresh the job list after deletion
        setJobs(jobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        console.log('Error occurred:', error);
        // Handle any errors that occurred during the request or perform any desired actions
      });
  };

  return (
    <div className="container">
    <h1 className="mt-4">Job List</h1>
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {jobs.filter((elem) => elem.companyId == id)
      .map((job) => (
        <div className="col" key={job._id}>
          <div className="card card-small">
            {job.image && (
              <img
              src={job.image}
              className="card-img-top card-img-small mx-auto d-block mt-3"
              alt="Job Image"
              style={{ maxWidth: '250px', maxHeight: '250px' }}
            />
            )}
            <div className="card-body">
              <h2 className="card-title">{job.jobTitle}</h2>
              <p className="card-text">Company: {job.companyName}</p>
              <p className="card-text">Type: {job.jobType}</p>
              <p className="card-text">Duration: {job.jobDuration}</p>
              <p className="card-text">Description: {job.description}</p>
              <div className="d-flex justify-content-between">
                <Link to={`/job/edit/${job._id}`}
                  className="btn btn-primary"
                >
                  Edit
                </Link>
                
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default ViewAllJob;
