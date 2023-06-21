import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddJob() {

    const PRESET_NAME = "yurlcdot";
	const CLOUD_NAME = "dbiy5qnsa";
    const[companyId,setCompanyId]=useState("");
    const[companyName,setCompanyName]=useState("");
    const[companyAddress,setCompanyAddress]=useState("");
    const[jobTitle,setJobTitle]=useState("");
    const[jobType,setJobType]=useState("");
    const[jobDuration,setJobDuration]=useState("");
    const[description,setDescription]=useState("");
    const[image,setImage]=useState("");
	const [url, setUrl] = useState("");

   const id1=localStorage.getItem("uID");
   const name1=localStorage.getItem("name");
   const address1=localStorage.getItem("address");

  
  const navigate = useNavigate();
  //const id=localStorage.getItem("uID");

  const submitImage = (e) => {
    const image=e.target.files[0]
    setImage(image)
    console.log(CLOUD_NAME);
    console.log(PRESET_NAME);
    const data1 = new FormData();
    data1.append("file", image);
    data1.append("upload_preset", PRESET_NAME);
    data1.append("cloud_name", CLOUD_NAME);

    axios
        .post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, data1)
        .then((res) => {
            const url1 = res.data.secure_url;
            console.log(url1);
            setUrl(url1);
        })
        .catch((err) => {
            console.log(err);
        });
};

const handleSubmit = (e) => {

    e.preventDefault();

    const newJob = {
        
        companyId:id1,
        companyName:e.target.companyName.value,
        companyAddress:e.target.companyAddress.value,
        jobTitle:e.target.jobTitle.value,
        jobType:e.target.jobType.value,
        jobDuration:e.target.jobDuration.value,
        description:e.target.description.value,
        image:url,
    };
    axios
    .post("http://localhost:5000/job/", newJob)
    .then(() => {
      alert("Job Added");
      navigate("/job/view")

      setCompanyId(""),
      setCompanyName(""),
      setCompanyAddress(""),
      setJobTitle(""),
      setJobType(""),
      setJobDuration(""),
      setDescription(""),
      setImage("")
      
    //navigate("")

    })
    .catch((err) => {
      alert(err);
    });
};

  return (
    <div>
    <section className="vh-100" style={{backgroundColor: '#eee'}}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{borderRadius: '25px'}}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Post Your Job..</p>

                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" id="companyName" className="form-control" value={name1} readOnly="true" />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" id="companyAddress" className="form-control" value={address1} readOnly="true" />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" id="jobTitle" className="form-control" placeholder="Job Title" />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" id="jobType" className="form-control" placeholder="Job Type"  />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" id="jobDuration" className="form-control" placeholder="Job Duration"/>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" id="description" className="form-control" placeholder="Description" />
                        </div>
                      </div>
                     
                      <div className="form-check">
                      <label htmlFor="formFileDisabled" className="form-label">Upload Image</label>
                        <input className="form-control" type="file" id="image" onChange={submitImage} />
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 mt-4">
                        <button type="submit" className="btn btn-primary btn-lg">POST</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="/job.svg" className="img-fluid" alt="Sample image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
}
