import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

const UserReportGenerate = () => {
  const [applications, setApplications] = useState([]);
  const id = localStorage.getItem("uID");

  useEffect(() => {
    // Fetch the list of jobs from the backend API
    axios
      .get("http://localhost:5000/application")
      .then((response) => {
        const data = response.data;
        setApplications(data);
      })
      .catch((error) => {
        console.log("Error occurred:", error);
        // Handle any errors that occurred during the request or perform any desired actions
      });
  }, []);

  let count = 0;
  let total = 0;

  applications
    .filter((elem) => elem.applicantId == id)
    .map(
      (elem) => (
        "Total Applied Vacancy " + elem.jobTitle,
        (count = count + 1),
        (total = total + parseInt(elem.jobTitle))
      )
    );

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <h1 className="text-center mt-4">Report Generate</h1>

      <div>
        <section className="intro my-5">
          <div
            className="bg-image h-100"
            style={{ backgroundColor: "#f5f7fa" }}
          >
            <div className="mask d-flex align-items-center h-100">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body p-0">
                        <div
                          className="table-responsive table-scroll"
                          data-mdb-perfect-scrollbar="true"
                          style={{ position: "relative", height: "700px" }}
                        >
                          <table
                            className="table table-striped mb-0"
                            ref={componentRef}
                          >
                            <thead style={{ backgroundColor: "#336688" }}>
                              <tr>
                                <th scope="col">JobTitle</th>
                                <th scope="col">Company Name</th>
                                <th scope="col">Applicant Name</th>
                                <th scope="col">Applicant Email</th>
                                <th scope="col">Applicant Phone</th>
                              
                              </tr>
                            </thead>

                            <tbody>
                              {applications
                                .filter((elem) => elem.applicantId === id)
                                .map((app, key) => (
                                  <tr>
                                    <td>{app.jobTitle}</td>
                                    <td>{app.companyName}</td>
                                    <td>{app.applicantName}</td>
                                    <td>{app.applicantEmail}</td>
                                    <td>{app.phone}</td>
                                   
                                  </tr>
                                ))}
                            </tbody>

                            <ul>
                              <li className="fw-bold mt-4">
                                Total Number of Applied Job Vacancy : {count}{" "}
                              </li>
                            </ul>
                          </table>
                          <div className="col-md-12 p-4">
                            {" "}
                            <button
                              onClick={handlePrint}
                              className="btn btn-success btn-lg btn text-center"
                            >
                              Download
                            </button>
                          </div>
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
    </>
  );
};

export default UserReportGenerate;
