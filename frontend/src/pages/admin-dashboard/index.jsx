import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  return (
    <>
      <h1 className="text-center mt-4">Admin Dashboard</h1>
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
                <Link to="/profile" className="btn btn-primary">
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
                    <h5 className="card-title">Company Management</h5>
                    <p className="card-text">
                      Description or additional details
                    </p>
                    <Link to="/admin/company/management" className="btn btn-primary">
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
                    <h5 className="card-title">User Management</h5>
                    <p className="card-text">
                      Description or additional details
                    </p>
                    <Link to="/admin/user/management" className="btn btn-primary">
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
                    <h5 className="card-title">Job Management</h5>
                    <p className="card-text">
                      Description or additional details
                    </p>
                    <Link to="/admin/job/management" className="btn btn-primary">
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
                    <Link to="/admin/report" className="btn btn-primary">
                      Click to
                    </Link>
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

export default AdminDashboard;
