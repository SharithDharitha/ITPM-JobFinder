import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminCompanyManagement = () => {
    const [company, setCompany] = useState([]);

    useEffect(() => {
        axios
          .get("http://localhost:5000/company/")
          .then((res) => setCompany(res.data))
          .catch((error) => console.log(error));
      });

      const deleteCompany = (id) => {
        axios
          .delete(`http://localhost:5000/company/${id}`)
          .then((res) => alert("Company Deleted"));
    
        setCompany(company.filter((elem) => elem.id !== id));
      };


  return (
    <>
      <h1 className="text-center mt-4">Admin Company Management</h1>

      <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col">Company Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Address</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
            {company.map((elem)=> (
          <tr>
            <th scope="row">{elem.name}</th>
            <td>{elem.email}</td>
            <td>{elem.phone}</td>
            <td>{elem.address}</td>

            <td>
              <button type="button" className="btn btn-danger" onClick={()=> deleteCompany(elem._id)}>
                Delete
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminCompanyManagement;
