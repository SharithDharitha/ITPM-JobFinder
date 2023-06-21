const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Company } = require("../models/Company.model");
const { CompanyToken } = require("../models/Company.token");

// Company Register
// http://localhost:5000/company/register

http: router.post("/register", (req, res) => {
  Company.find({ email: req.body.email })
    .exec()
    .then((company) => {
      if (company.length >= 1) {
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
            const company = new Company({ ...req.body, password: hash });
            company.save((err, doc) => {
              if (err)
                return res.json({
                  status: false,
                  message: err,
                  data: undefined,
                });

              return res.status(200).json({
                status: true,
                message: "Company Register Successfully",
                data: doc,
              });
            });
          }
        });
      }
    });
});

// Company Login
// http://localhost:5000/company/login

http: router.post("/login", (req, res) => {
  Company.findOne({ email: req.body.email })
    .exec()
    .then((company) => {
      if (!company) {
        return res.status(401).json({
          message: "Company not found",
          status: false,
          data: undefined,
        });
      }

      bcrypt.compare(
        req.body.password,
        company.password,
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
                email: company.email,
                companyId: company._id,
              },

              process.env.JWT_KEY,
              {
                expiresIn: "2h",
              }
            );

            await CompanyToken.findOneAndUpdate(
              { _companyId: Company._id, tokenType: "login" },
              { token: token },
              { new: true, upsert: true }
            );
            return res.status(200).json({
              status: true,
              message: "Company Login Successfully",

              data: {
                token,
                company,
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

// Get one Company Details
// http://localhost:5000/company/

http: router.route("/:id").get(async (req, res) => {
  let userID = req.params.id;
  await Company.findById(userID)
    .then((Company) => {
      res.status(200).send({ status: "Company Data Fetch", Company });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get Company", error: err.message });
    });
});

// Get All Company Details
// http://localhost:5000/company/

http: router.route("/").get((req, res) => {
  Company.find()
    .then((company) => {
      res.json(company);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Update Company Details
// http://localhost:5000/company/id

http: router.route("/:id").put(async (req, res) => {
  let userID = req.params.id;

  //destructure
  const { name, email, phone, address } = req.body;

  const updateCompany = {
    name,
    email,
    phone,
    address,
  };

  await Company.findByIdAndUpdate(userID, updateCompany)
    .then(() => {
      res.status(200).send({ status: "Company Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data!", error: err.message });
    });
});

// Delete Company Details
// http://localhost:5000/company/id

http: router.route("/:id").delete(async (req, res) => {
  let userID = req.params.id;

  await Company.findByIdAndDelete(userID)

    .then(() => {
      res.status(200).send({ status: "Company successfully Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting Company", error: err.message });
    });
});

module.exports = router;
