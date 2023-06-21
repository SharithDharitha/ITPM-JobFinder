import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserEditProfile = () => {
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const id = localStorage.getItem("uID");

  const changeOnClick = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      phone,
    };

    setName("");
    setEmail("");
    setPhone("");

    axios
      .put(`http://localhost:5000/applicant/${id}`, user)
      .then((res) => { alert("User Updated");
     
        navigate("/user");
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    axios

      .get(`http://localhost:5000/applicant/${id}`)
      .then((res) => [
        setName(res.data.Applicant.name),
        setEmail(res.data.Applicant.email),
        setPhone(res.data.Applicant.phone),
      ])
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1 className="text-center mt-4">User Edit Profile</h1>

      <div>
        <section className="mt-2" style={{ backgroundColor: "white" }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div
                  className="card text-black"
                  style={{ borderRadius: "25px" }}
                >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Update Here
                        </p>
                        <p className="text-center h4 fw-bold mb-5 mx-1 mx-md-4 mt-2 "></p>
                        <p className="text-center h6 fw-bold mb-5 mx-1 mx-md-4 mt-4"></p>

                        <form className="mx-1 mx-md-4" onSubmit={changeOnClick}>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw" />
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                value={name}
                                id="applicantName"
                                className="form-control"
                                placeholder="Applicant Name"
                                onChange={(e)=> {
                                    setName(e.target.value);
                                }}   
                              />
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="email"
                                id="applicantEmail"
                                className="form-control"
                                placeholder="Applicant Email"
                                value={email}
                                onChange={(e)=>{
                                    setEmail(e.target.value);
                                }}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw" />
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="number"
                                id="phone"
                                className="form-control"
                                placeholder="Applicant Mobile Number"
                                value={phone}
                                onChange={(e)=>{
                                    setPhone(e.target.value);
                                }}
                              />
                            </div>
                          </div>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 mt-4">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="/application.svg"
                          className="img-fluid"
                          alt="Sample image"
                        />
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

export default UserEditProfile;
