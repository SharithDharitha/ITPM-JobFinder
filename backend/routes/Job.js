const router = require("express").Router();
//let Job=require("../models/Job")
let Job=require("../models/Job")


//Insert Job
http: router.route("/").post((req, res) => {
  const  companyId= req.body.companyId;
  const companyName = req.body.companyName;
  const companyAddress = req.body.companyAddress;
  const jobTitle=req.body.jobTitle;
  const jobType = req.body.jobType;
  const jobDuration =req.body.jobDuration;
  const description = req.body.description;
  const image = req.body.image;

  console.log(companyId);
  console.log(companyName);

  const newJob = new Job({
    companyId,
    companyName,
    companyAddress,
    jobTitle,
    jobType,
    jobDuration,
    description,
    image,
  });

  newJob
    .save()
    .then(() => {
      res.json("Job Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//get All jobs

http: router.route("/").get((req, res) => {
  Job.find()
    .then((Job) => {
      res.json(Job);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get one Job

router.route("/:id").get(async (req, res) => {
    let jobId = req.params.id;
    const job = await Job.findById(jobId)
      .then((Job) => {
        res.status(200).send({ status: "job fetched", Job });
      })
      .catch(() => {
        console.log(err.message);
        res
          .status(500)
          .send({ status: "Error with getting job", error: err.message });
      });
  });
  

//update job

http: router
  .route("/:id")
  .put(async (req, res) => {
    let jobId = req.params.id;
    const { companyId,
            companyName,
            companyAddress,
            jobTitle,
            jobType,
            jobDuration,
            description,
            image } = req.body;

    const updateJob = {
        companyId,
        companyName,
        companyAddress,
        jobTitle,
        jobType,
        jobDuration,
        description,
        image
    };
    const update = await Job.findByIdAndUpdate(jobId, updateJob)
      .then(() => {
        res.status(200).send({ status: "Job updated" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ status: "Error with updating data", error: err.message });
      });
  });

//Delete job

http: router.route("/:id").delete(async (req, res) => {
  let jobId = req.params.id;

  await Job.findByIdAndDelete(jobId)
    .then(() => {
      res.status(200).send({ status: "job Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete job", error: err.message });
    });
});


module.exports = router;
