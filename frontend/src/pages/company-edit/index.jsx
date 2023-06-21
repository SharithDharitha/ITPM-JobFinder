import React, { useState , useEffect } from "react";
import { useParams , useNavigate } from "react-router";
import axios from "axios";

const CompanyEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const id=localStorage.getItem("uID");

  useEffect(() => {
    axios

      .get(`http://localhost:5000/company/${id}`)
      .then((res) => [

        setName(res.data.Company.name),
        setEmail(res.data.Company.email),
        setPhone(res.data.Company.phone),
        setAddress(res.data.Company.address),
        setPassword(res.data.Company.password),


        console.log(res.data),
      ])
      .catch((error) => console.log(error));
  }, []);

  function sendData(e) {
    e.preventDefault();

    const newCompany = {
      name,
      email,
      phone,
      address,
      password,
    };

    axios
      .put(`http://localhost:5000/company/${id}`, newCompany)
      .then(() => {
        alert("Company Edited Successfully...");
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setPassword("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <>
      <section className="vh-75" style={{ backgroundColor: "#2779e2" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-9">
              <h1 className="text-white mb-4">Company Details Edit</h1>
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body">
                  <form onSubmit={sendData}>
                    <div className="row align-items-center pt-3 pb-2">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Company Name</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <input
                          type="text"
                          name="name"
                          value={name}
                          className="form-control form-control-lg"
                          placeholder="Company Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <hr className="mx-n3" />
                    <div className="row align-items-center py-2">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Email Address</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <input
                          type="email"
                          name="email"
                          value={email}
                          className="form-control form-control-lg"
                          placeholder="example@example.com"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <hr className="mx-n3" />
                    <div className="row align-items-center py-2">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Contact Number</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <input
                          type="number"
                          name="phone"
                          value={phone}
                          className="form-control form-control-lg"
                          placeholder="Contact Number"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <hr className="mx-n3" />
                    <div className="row align-items-center py-2">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Company Address</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <input
                          type="text"
                          name="address"
                          value={address}
                          className="form-control form-control-lg"
                          placeholder="Company Address"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <hr className="mx-n3" />
                    <div className="row align-items-center py-2">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Password</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <input
                          type="password"
                          name="password"
                          className="form-control form-control-lg"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <hr className="mx-n3" />
                    <div className="px-5 py-3">
                      <button type="submit" className="btn btn-primary btn-lg">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyEdit;
