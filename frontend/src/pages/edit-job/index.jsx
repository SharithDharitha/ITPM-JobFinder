import React, { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditJob() {

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

    const { id } = useParams();

    useEffect(() => {
      axios
  
        .get(`http://localhost:5000/job/${id}`)
        .then((res) => [

          setCompanyId(res.data.Job.companyId),
          setCompanyName(res.data.Job.companyName),
          setCompanyAddress(res.data.Job.companyAddress),
          setJobTitle(res.data.Job.jobTitle),
          setJobType(res.data.Job.jobType),
          setJobDuration(res.data.Job.jobDuration),
          setDescription(res.data.Job.description),
          setUrl(res.data.Job.image),

  
          console.log(res.data),
        ])
        .catch((error) => console.log(error));
    }, []);
  
  const navigate = useNavigate();
  //const id=localStorage.getItem("uID");


const handleSubmit = (e) => {

    e.preventDefault();

    const newJob = {
        
        companyId:companyId,
        companyName:e.target.companyName.value,
        companyAddress:e.target.companyAddress.value,
        jobTitle:e.target.jobTitle.value,
        jobType:e.target.jobType.value,
        jobDuration:e.target.jobDuration.value,
        description:e.target.description.value,
        image:url,
    };
    axios
    .put(`http://localhost:5000/job/${id}`, newJob)
    .then(() => {
      alert("Job Updated");      
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
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Edit Job Details</p>

                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                        <label >Company Name </label>

                          <input type="text" id="companyName" className="form-control  my-2" placeholder="Company Name" value={companyName} readOnly="true"
                          onChange={(e) => {
                            setCompanyName(e.target.value);
                          }}  />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                        <label >Company Address </label>

                          <input type="text" id="companyAddress" className="form-control my-2" placeholder="Company Address" value={companyAddress} readOnly="true"
                          onChange={(e) => {
                            setCompanyAddress(e.target.value);
                          }}/>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                        <label >Job Title </label>

                          <input type="text" id="jobTitle" className="form-control my-2" placeholder="Job Title" value={jobTitle}
                          onChange={(e) => {
                            setJobTitle(e.target.value);
                          }} />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                        <label >Job Type </label>

                          <input type="text" id="jobType" className="form-control my-2" placeholder="Job Type" value={jobType}
                          onChange={(e) => {
                            setJobType(e.target.value);
                          }}  />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                        <label >Job Duration </label>

                          <input type="text" id="jobDuration" className="form-control my-2" placeholder="Job Duration" value={jobDuration}
                          onChange={(e) => {
                            setJobDuration(e.target.value);
                          }}/>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                        <label >Description </label>

                          <input type="text" id="description" className="form-control my-2" placeholder="Description" value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }} />
                        </div>
                      </div>
                     
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 mt-4">
                        <button type="submit" className="btn btn-primary btn-lg">Update</button>
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
