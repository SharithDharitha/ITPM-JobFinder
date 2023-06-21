const router = require("express").Router();
let Inquiry = require("../models/Inquiry.model");

//Insert Inquiry
// http://localhost:5000/inquiry/

http: router.route("/").post((req, res) => {
  const applicantName = req.body.applicantName;
  const email = req.body.email;
  const title = req.body.title;
  const message = req.body.message;
  const applicantId = req.body.applicantId;
  const companyId = req.body.companyId;

  const NewInquiry = new Inquiry({
    applicantName,
    email,
    title,
    message,
    applicantId,
    companyId,
  });

  NewInquiry.save()
    .then(() => {
      res.json("Inquiry Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//get All Inquiries
// http://localhost:5000/inquiry/

http: router.route("/").get((req, res) => {
  Inquiry.find({})
    .then((inquiry) => {
      res.json(inquiry);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get one Inquiry
// http://localhost:5000/inquiry/id

router.route("/:id").get(async (req, res) => {
  let InquiryId = req.params.id;
  await Inquiry.findById(InquiryId)
    .then((Inquiry) => {
      res.status(200).send({ status: "Inquiry fetched", Inquiry });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with getting Inquiry", error: err.message });
    });
});

//Update Inquiry
// http://localhost:5000/inquiry/id

http: router.route("/:id").put(async (req, res) => {
  let userID = req.params.id;

  //destructure
  const { applicantName, email, title, message, applicantId, companyId } =
    req.body;

  const updateInquiry = {
    applicantName,
    email,
    title,
    message,
    applicantId,
    companyId,
  };

  await Inquiry.findByIdAndUpdate(userID, updateInquiry)
    .then(() => {
      res.status(200).send({ status: "Inquiry Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data!", error: err.message });
    });
});

//Delete Inquiry
// http://localhost:5000/inquiry/id

http: router.route("/:id").delete(async (req, res) => {
    let userID = req.params.id;
  
    await Inquiry.findByIdAndDelete(userID)
  
      .then(() => {
        res.status(200).send({ status: "Inquiry successfully Deleted" });
      })
      .catch((err) => {
        console.log(err.message);
        res
          .status(500)
          .send({ status: "Error with deleting Inquiry", error: err.message });
      });
  });

module.exports = router;
