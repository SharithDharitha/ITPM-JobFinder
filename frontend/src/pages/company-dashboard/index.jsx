import React from "react";
import { Link } from "react-router-dom";

const CompanyDashboard = () => {
  const name = localStorage.getItem("name");
  return (
    <>
      <h1 className="text-center mt-4">Company Dashboard</h1>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">Profile</h5>
                <p className="card-text">User details and information</p>
                <img
                  src="../pro.svg" // Replace with the actual image source
                  className="rounded-circle mx-auto d-block"
                  alt="Profile Image"
                  style={{ width: "150px", height: "150px" }} // Adjust the dimensions as needed
                />
                <p>Hello {name}</p>
                <Link to="/company/edit/:id" className="btn btn-primary my-2">
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-6">
                <div className="card clickable-card mb-4 custom-card">
                  <img
                    src="../job1.svg"
                    className="card-img-top"
                    alt="Job Add Image"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Job Add</h5>
                    <p className="card-text">
                      Description or additional details
                    </p>
                    <Link to="/job/add" className="btn btn-primary">
                      Click to
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card clickable-card mb-4 custom-card">
                  <img
                    src="../reg2.svg"
                    className="card-img-top"
                    alt="Job Add Image"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">View All Job</h5>
                    <p className="card-text">
                      Description or additional details
                    </p>
                    <Link to="/job/view" className="btn btn-primary">
                      Click to
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card clickable-card mb-4 custom-card">
                  <img
                    src="../report.svg"
                    className="card-img-top"
                    alt="Job Add Image"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Static Report</h5>
                    <p className="card-text">
                      Description or additional details
                    </p>
                    <Link to="/company/report" className="btn btn-primary">
                      Click to
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card clickable-card mb-4 custom-card">
                  <img
                    src="../reg2.svg"
                    className="card-img-top"
                    alt="Job Add Image"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Inquaries</h5>
                    <p className="card-text">Description or additional details</p>
                    <Link to="/inquiry/company" className="btn btn-primary">Click to</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDashboard;
