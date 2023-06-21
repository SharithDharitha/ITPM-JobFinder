import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

const AdminUserManagement = ()=> {
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios
          .get("http://localhost:5000/applicant/")
          .then((res) => setUser(res.data))
          .catch((error) => console.log(error));
      });

      const deleteUser = (id) => {
        axios
          .delete(`http://localhost:5000/applicant/${id}`)
          .then((res) => alert("User Deleted"));
    
        setUser(user.filter((elem) => elem.id !== id));
      };

      let count = 0;
      let total = 0;
      user.map(
        (elem) => (
         ("Total Vacancy " + elem.email),
          (count = count + 1),
          (total = total + parseInt(elem.email))
        )
      );

      const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

    return (
        <>
        
        <h1 className="text-center mt-4">Admin User Management</h1>

        <table className="table mt-4" ref={componentRef}>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Gender</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
            {user.map((elem)=> (
          <tr>
            <th scope="row">{elem.name}</th>
            <td>{elem.email}</td>
            <td>{elem.phone}</td>
            <td>{elem.gender}</td>

            <td>
              <button type="button" className="btn btn-danger" onClick={()=> deleteUser(elem._id)}>
                Delete
              </button>
            </td>
          </tr>
          ))}
        </tbody>

        <ul>
          <li className="fw-bold mt-4">
            Total Number Users Registered to the System : {count}{" "}
          </li>
         
        </ul>


      </table>

      <div className="col-md-12 p-4">
        {" "}
        <button
          onClick={handlePrint}
          className="btn btn-success btn-lg btn text-center">
          Download
        </button>
      </div>
        
        
        </>
    );


};

export default AdminUserManagement;