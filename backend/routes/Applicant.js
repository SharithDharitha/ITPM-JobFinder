const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Applicant } = require("../models/Applicant.model");
const { ApplicantToken } = require("../models/Applicant.token");


// Applicant Register
// http://localhost:5000/applicant/register

http: router.post("/register", (req, res) => {
  Applicant.find({ email: req.body.email })
    .exec()
    .then((applicant) => {
      if (applicant.length >= 1) {
        return res.status(401).json({
          status: false,
          message: "Email exists",
          data: undefined,
        });
      } else {
        bcrypt.hash(req.body.password, 2, (err, hash) => {
          if (err) {
            return res.status(500).json({
              status: false,
              message: "Error, cannot encrypt password",
              data: undefined,
            });
          } else {
            const applicant = new Applicant({ ...req.body, password: hash });
            applicant.save((err, doc) => {
              if (err)
                return res.json({
                  status: false,
                  message: err,
                  data: undefined,
                });

              return res.status(200).json({
                status: true,
                message: "Applicant Register Successfully",
                data: doc,
              });
            });
          }
        });
      }
    });
});

// Applicant Login
// http://localhost:5000/applicant/login

http: router.post("/login", (req, res) => {
  Applicant.findOne({ email: req.body.email })
    .exec()
    .then((applicant) => {
      if (!applicant) {
        return res.status(401).json({
          message: "Applicant not found",
          status: false,
          data: undefined,
        });
      }

      bcrypt.compare(
        req.body.password,
        applicant.password,
        async (err, result) => {
          if (err) {
            return res.status(401).json({
              status: false,
              message: "Server Error, authentication failed",
              data: undefined,
            });
          }

          if (result) {
            const token = jwt.sign(
              {
                email: applicant.email,
                applicantId: applicant._id,
              },

              process.env.JWT_KEY,
              {
                expiresIn: "2h",
              }
            );

            await ApplicantToken.findOneAndUpdate(
              { _applicantId: Applicant._id, tokenType: "login" },
              { token: token },
              { new: true, upsert: true }
            );
            return res.status(200).json({
              status: true,
              message: "Applicant Login Successfully",

              data: {
                token,
                applicant,
              },
            });
          }
          return res.status(401).json({
            status: true,
            message: "Wrong Password",
            data: undefined,
          });
        }
      );
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: "Server Error, authentication failed....",
        data: undefined,
      });
    });
});

// Get One Applicant Details

// http://localhost:5000/applicant/id

http: router.route("/:id").get(async (req, res) => {
  let userID = req.params.id;
  await Applicant.findById(userID)
    .then((Applicant) => {
      res.status(200).send({ status: "Applicant Data Fetch", Applicant });
    })
    .catch(() => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get Applicant", error: err.message });
    });
});

// Get All Applicant Details

// http://localhost:5000/applicant/

http: router.route("/").get((req, res) => {
  Applicant.find()
    .then((applicant) => {
      res.json(applicant);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Update Applicant Details

// http://localhost:5000/applicant/id

http: router.route("/:id").put(async (req, res) => {
  let userID = req.params.id;

  //destructure
  const { name, email, phone, gender } = req.body;

  const updateApplicant = {
    name,
    email,
    phone,
    gender,
  };

  await Applicant.findByIdAndUpdate(userID, updateApplicant)
    .then(() => {
      res.status(200).send({ status: "Applicant Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data!", error: err.message });
    });
});

// Delete Applicant Details

// http://localhost:5000/applicant/id

http: router.route("/:id").delete(async (req, res) => {
  let userID = req.params.id;

  await Applicant.findByIdAndDelete(userID)

    .then(() => {
      res.status(200).send({ status: "Applicant successfully Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting Applicant", error: err.message });
    });
});

module.exports = router;
