import React, { useEffect, useState } from "react";
import axios from "axios";

const CompanyInquary = () => {
  const [inquiry, setInquiry] = useState([]);

  const userId = localStorage.getItem("uID");

  useEffect(() => {
    axios
      .get("http://localhost:5000/inquiry/")
      .then((res) => setInquiry(res.data))
      .catch((error) => console.log(error));
  });

  const deleteInquiry = (id) => {
    axios
      .delete(`http://localhost:5000/inquiry/${id}`)
      .then((res) => alert("Inquiry Deleted"));

    setInquiry(inquiry.filter((elem) => elem.id !== id));
  };

  return (
    <>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">User Name</th>
            <th scope="col">Title</th>
            <th scope="col">Message</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {inquiry
            .filter((elem) => elem.companyId == userId)
            .map((elem) => (
              <tr>
                <th scope="row">{elem.applicantName}</th>
                <td>{elem.title}</td>
                <td>{elem.message}</td>

                <td>
                  <button type="button" className="btn btn-primary">
                    Edit
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger" onClick={()=> deleteInquiry(elem._id)}>
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

export default CompanyInquary;
