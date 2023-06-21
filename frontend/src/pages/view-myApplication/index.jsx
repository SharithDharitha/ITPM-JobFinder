import { useState,useEffect } from "react";
import axios from "axios";

const MyApplication = () =>{

    const[applications,setApplications]=useState([]);
    const id=localStorage.getItem("uID");

    useEffect(() => {
        // Fetch the list of jobs from the backend API
        axios.get('http://localhost:5000/application')
          .then((response) => {
            const data = response.data;
            setApplications(data);
          })
          .catch((error) => {
            console.log('Error occurred:', error);
            // Handle any errors that occurred during the request or perform any desired actions
          });
      }, []);
    

    
      const handleDelete = (id) => {
        // Handle the delete action for a job with the given jobId
        // Make a DELETE request to the backend API endpoint to delete the job
        axios.delete(`http://localhost:5000/application/${id}`)
          .then((response) => {
            const data = response.data;
            // Handle the response from the backend
            console.log('Application deleted:', data);
            // Refresh the job list after deletion
            setApplications(applications.filter((application) => application._id !== id));
          })
          .catch((error) => {
            console.log('Error occurred:', error);
            // Handle any errors that occurred during the request or perform any desired actions
          });
      };

    return(
        <div>
            <h3>My Applications</h3>
            <section className="intro my-5">
        <div className="bg-image h-100" style={{backgroundColor: '#f5f7fa'}}>
          <div className="mask d-flex align-items-center h-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body p-0">
                      <div className="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style={{position: 'relative', height: '700px'}}>
                        <table className="table table-striped mb-0">
                          <thead style={{backgroundColor: '#336688'}}>
                            <tr>
                              <th scope="col">JobTitle</th>
                              <th scope="col">Company Name</th>
                              <th scope="col">Applicant Name</th>
                              <th scope="col">Applicant Email</th>
                              <th scope="col">Applicant Phone</th>
                              <th scope="col">delete</th>
                            </tr>
                          </thead>
                          
                          <tbody>
                            {applications.filter((elem) => elem.applicantId === id)
						.map((app, key) => (
                            <tr>
                              <td>{app.jobTitle}</td>
                              <td>{app.companyName}</td>
                              <td>{app.applicantName}</td>
                              <td>{app.applicantEmail}</td>
                              <td>{app.phone}</td>
                              <td> <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(app._id)}
                >
                  Delete
                </button></td>
                            </tr>
                           )) }
                          </tbody>

                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
    )
}
export default MyApplication