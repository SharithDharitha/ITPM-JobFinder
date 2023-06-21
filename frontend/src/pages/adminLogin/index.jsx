import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/admin/login";
      const { data: res } = await axios.post(url, data);
      alert("Login Completed");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("uID", res.data.admin._id);
      localStorage.setItem("name", res.data.admin.name);
      localStorage.setItem("email", res.data.admin.email);
      localStorage.setItem("permissionLevel", res.data.admin.permissionLevel);
      navigate("/admin");
    
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        alert("Login Failed Please Enter Your Details Again");
        setError(error.response.data.message);
      }
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
      <section className="vh-100" style={{ backgroundColor: "#1ABC9C" }}>
        <div className="container py-4 h-100">
          <div className="row d-flex justify-content-center align-items-center h-80">
            <div className="col-10 col-md-8 col-lg-5 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-4 text-center">
                  <div className="mb-md-4 mt-md-3 pb-4">
                    <h2 className="fw-bold mb-2 text-uppercase">Admin Login</h2>
                    <p className="text-white-50 mb-4">
                      Please enter your login and password!
                    </p>
                    <label className="form-label" htmlFor="typeEmailX">
                      Email
                    </label>
                    <div className="form-outline form-white mb-3">
                      <input
                        type="email"
                        name="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        onChange={handleChange}
                        value={data.email}
                      />
                    </div>
                    <label className="form-label" htmlFor="typePasswordX">
                      Password
                    </label>
                    <div className="form-outline form-white mb-3">
                      <input
                        type="password"
                        name="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        onChange={handleChange}
                        value={data.password}
                      />
                    </div>
                    <p className="small mb-4">
                      <a className="text-white-50" href="#!">
                        Forgot password?
                      </a>
                    </p>
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                  <div>
                    <p className="mb-0 -mt-4">
                      Don't have an account?{" "}
                      <a href="#!" className="text-white-50 fw-bold">
                        Sign Up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </form>
    </div>
    
  );
};
export default AdminLogin;
