import React, { useState ,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddInquary = () => {

    const[title,setTitle]=useState("");
    const[message,setMessage]=useState("");

    const {id} =  useParams();
    const user=localStorage.getItem("uID");
    const email=localStorage.getItem("email");
    const name=localStorage.getItem("name");

    const navigate=useNavigate();

    console.log("inquary"+id , user ,email,  name);

    const handleSubmit = (e) => {

        e.preventDefault();
    
        const newInquary = {
            
            applicantName:name,
            email:email,
            title:e.target.title.value,
            message:e.target.message.value,
            applicantId:user,
            companyId:id,

        };
        axios
        .post("http://localhost:5000/inquiry/", newInquary)
        .then(() => {
          alert("Inquary Sent..");
          
        navigate("/user")
    
        })
        .catch((err) => {
          alert(err);
        });
    };


    return ( 
        <>
         <section className="vh-100" style={{backgroundColor: '#2779e2'}}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-9">
              <h1 className="text-white mb-4">Add Inquery</h1>
              <div className="card" style={{borderRadius: '15px'}}>
                <form className="card-body" onSubmit={handleSubmit}>
                  <div className="row align-items-center pt-4 pb-3">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Full name</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input type="text" className="form-control form-control-lg" value={name} />
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <div className="row align-items-center py-3">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Email address</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input type="email" className="form-control form-control-lg" placeholder="example@example.com" value={email} />
                    </div>
                  </div>
                  <div className="row align-items-center py-3">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Title</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input type="text" className="form-control form-control-lg" placeholder="example@example.com" id="title"  />
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <div className="row align-items-center py-3">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Message</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <textarea className="form-control" rows={3} placeholder="Message sent to the employer" defaultValue={""} id="message" />
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <hr className="mx-n3" />
                  <div className="px-5 py-4">
                    <button type="submit" className="btn btn-primary btn-lg">Send</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
     );
}
 
export default AddInquary;