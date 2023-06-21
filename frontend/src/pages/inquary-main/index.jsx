import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const InquaryMain= () => {
    const[company,setCompany]=useState([]);

useEffect(() => {
    // Fetch the list of jobs from the backend API
    axios.get('http://localhost:5000/company')
      .then((response) => {
        const data = response.data;
        setCompany(data);
      })
      .catch((error) => {
        console.log('Error occurred:', error);
        // Handle any errors that occurred during the request or perform any desired actions
      });
  }, []);


    return ( 
        <>
         
        <div className="row row-cols-1 row-cols-md-3 g-4">
        {company.map((company,key) => (
        <div className="col">
          <div className="card h-50 w-50 mx-5 my-5">
            <img src="/Inquary.svg" className="card-img-top" alt="Hollywood Sign on The Hill" />
            <div className="card-body">
              <h5 className="card-title">{company.name}</h5>
              <h5 className="card-title">{company.address}</h5>
              <Link to={`/inquary/add/${company._id}`}>
              <button className="btn btn-primary">
                  Make Inquary
              </button>
              </Link>
            </div>
          </div>
        </div>
        ))}
      </div>
        
        </>
     );
}
 
export default InquaryMain
;