import React, { useState ,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddApplication() {

    const PRESET_NAME = "yurlcdot";
	const CLOUD_NAME = "dbiy5qnsa";
    const[jobTitle,setJobTitle]=useState("");
    const[jobId,setJobId]=useState("");
    const[companyId,setCompanyId]=useState("");
    const[companyName,setCompanyName]=useState("");
    const[applicantId,setApplicantId]=useState("");
    const[applicantName,setApplicantName]=useState("");
    const[applicantEmail,setApplicantEmail]=useState("");
    const[phone,setPhone]=useState("");
    const[image,setImage]=useState("");
   

	const [url, setUrl] = useState("");

  const { id } = useParams();

  const id1=localStorage.getItem("uID");
  const name1=localStorage.getItem("name")

  useEffect(() => {
    axios

      .get(`http://localhost:5000/job/${id}`)
      .then((res) => [

        setJobTitle(res.data.Job.jobTitle),
        setCompanyId(res.data.Job.companyId),
        setCompanyName(res.data.Job.companyName),

        console.log(res.data),
      ])
      .catch((error) => console.log(error));
  }, []);
  
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

    const newApplication = {
        
        jobTitle:jobTitle,
        jobId:id,
        companyId:companyId,
        companyName:companyName,
        applicantId:id1,
        applicantName:name1,
        applicantEmail:e.target.applicantEmail.value,
        phone:e.target.phone.value,
        cv:url,
    };
    axios
    .post("http://localhost:5000/application/", newApplication)
    .then(() => {
      alert("Application Submitted Successfully");


      setJobTitle(""),
      setJobId(""),
      setCompanyId(""),
      setCompanyName(""),
      setApplicantId(""),
      setApplicantName(""),
      setApplicantEmail(""),
      setPhone(""),
      setImage("")
      
    navigate("/application/myapplications")

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
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Apply Here..</p>
                      <p className="text-center h4 fw-bold mb-5 mx-1 mx-md-4 mt-2 ">{jobTitle}</p>
                      <p className="text-center h6 fw-bold mb-5 mx-1 mx-md-4 mt-4">{companyName}</p>


                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="applicantName" className="form-control" placeholder="Applicant Name" value={name1} readOnly="true"  />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="applicantEmail" className="form-control" placeholder="Applicant Email"/>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input type="number" id="phone" className="form-control" placeholder="Applicant Mobile Number" />
                          </div>
                        </div>
                       
                        <div className="form-check">
                        <label htmlFor="formFileDisabled" className="form-label">Upload CV Image</label>
                          <input className="form-control" type="file" id="image" onChange={submitImage} />
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 mt-4">
                          <button type="submit" className="btn btn-primary btn-lg">Apply</button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src="/application.svg" className="img-fluid" alt="Sample image" />
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
