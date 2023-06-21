const router = require("express").Router();
let Application=require("../models/Application")


//Insert Application
http: router.route("/").post((req, res) => {
  const jobTitle= req.body.jobTitle;
  const jobId = req.body.jobId;
  const companyId = req.body.companyId;
  const companyName=req.body.companyName;
  const applicantId = req.body.applicantId;
  const applicantName =req.body.applicantName;
  const applicantEmail = req.body.applicantEmail;
  const phone = req.body.phone;
  const cv = req.body.cv;


  const newApplication = new Application({
    jobTitle,
    jobId,
    companyId,
    companyName,
    applicantId,
    applicantName,
    applicantEmail,
    phone,
    cv,
  });

  newApplication
    .save()
    .then(() => {
      res.json("Application Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//get All Applications

http: router.route("/").get((req, res) => {
    Application.find()
    .then((Application) => {
      res.json(Application);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get one Application

router.route("/:id").get(async (req, res) => {
    let ApplicationId = req.params.id;
    const application = await Application.findById(ApplicationId)
      .then((Application) => {
        res.status(200).send({ status: "Application fetched", Application });
      })
      .catch((err) => {
        console.log(err.message);
        res
          .status(500)
          .send({ status: "Error with getting Application", error: err.message });
      });
  });
  

//update Application

http: router
  .route("/:id")
  .put(async (req, res) => {
    let ApplicationId = req.params.id;
    const { jobTitle,
            jobId,
            companyId,
            companyName,
            applicantId,
            applicantName,
            applicantEmail,
            phone,
            cv } = req.body;

    const updateApplication = {
        jobTitle,
        jobId,
        companyId,
        companyName,
        applicantId,
        applicantName,
        applicantEmail,
        phone,
        cv,
    };
    const update = await Application.findByIdAndUpdate(ApplicationId, updateApplication)
      .then(() => {
        res.status(200).send({ status: "Application updated" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ status: "Error with updating data", error: err.message });
      });
  });

//Delete Application

http: router.route("/:id").delete(async (req, res) => {
  let ApplicationId = req.params.id;

  await Application.findByIdAndDelete(ApplicationId)
    .then(() => {
      res.status(200).send({ status: "Application Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete Application", error: err.message });
    });
});


module.exports = router;
