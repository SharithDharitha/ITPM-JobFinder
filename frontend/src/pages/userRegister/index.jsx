import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const UserRegister = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');
  const [password, setPassword] = useState('');

  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send registration data to the backend API
    const formData = {
      name: fullName,
      email: email,
      phone: phone,
      gender: gender,
      password: password,
    };

    axios
    .post('http://localhost:5000/applicant/register', formData)
    .then((response) => {
      const data = response.data;
      // Handle the response from the backend
      if (data.status) {
        // Registration success
        console.log('Registration successful:', data.message);
        alert("registration Successful..")
        navigate("/user/login")
        // Redirect the user to a success page or perform any desired actions
      } else {
        // Registration failed
        console.log('Registration failed:', data.message);
        // Display an error message to the user or perform any desired actions
      }
    })
    .catch((error) => {
      console.log('Error occurred:', error);
      // Handle any errors that occurred during the request or perform any desired actions
    });
};
  

  return (
    <section className="vh-75" style={{ backgroundColor: '#2779e2' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-9">
            <h1 className="text-white mb-4">User Register</h1>
            <div className="card" style={{ borderRadius: '15px' }}>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row align-items-center pt-3 pb-2">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Full name</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <div className="row align-items-center py-2">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Email address</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="example@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <div className="row align-items-center py-2">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <div className="row align-items-center py-2">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Gender</h6>
                    </div>
                    <div className="col-md-9 pe-5 d-flex">
                      <div className="form-check me-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="genderMale"
                          value="Male"
                          checked={gender === 'Male'}
                          onChange={() => setGender('Male')}
                        />
                        <label className="form-check-label" htmlFor="genderMale">
                          Male
                        </label>
                      </div>
                      <div className="form-check me-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="genderFemale"
                          value="Female"
                          checked={gender === 'Female'}
                          onChange={() => setGender('Female')}
                        />
                        <label className="form-check-label" htmlFor="genderFemale">
                          Female
                        </label>
                      </div>
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
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <div className="px-5 py-3">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserRegister;
