import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ApplyJob = () =>{
    const [jobs, setJobs] = useState([]);

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
    return(
      <div className="container">
      <h1 className="text-center mt-4">Job List</h1>
      <div className="row row-cols-1 row-cols-md-1 g-4">
        {jobs.map((job) => (
          <div className="col" key={job._id}>
            <div className="card">
              <div className="row g-0 mx-5">
                <div className="col-md-4">
                  <img
                    src={job.image}
                    className="card-img-top card-img-small mx-5 my-3"
                    alt="Job Image"
                    style={{ maxWidth: '250px', maxHeight: '250px' }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body mx-5">
                    <h2 className="card-title">{job.jobTitle}</h2>
                    <p className="card-text">Company: {job.companyName}</p>
                    <p className="card-text">Type: {job.jobType}</p>
                    <p className="card-text">Duration: {job.jobDuration}</p>
                    <p className="card-text">Description: {job.description}</p>
                    {/* Additional fields */}
                    <p className="card-text">Company Address: {job.companyAddress}</p>
                    {/* Apply Now button */}
                    <Link to={`/application/add/${job._id}`}>
                    <button
                      className="btn btn-primary"
                     
                    >
                      Apply Now
                    </button>
                    </Link>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    )
}
export default ApplyJob