const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models/Admin.model");
const { AdminToken } = require("../models/Admin.token");

// Admin Register
// http://localhost:5000/admin/register

http: router.post("/register", (req, res) => {
  Admin.find({ email: req.body.email })
    .exec()
    .then((admin) => {
      if (admin.length >= 1) {
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
            const admin = new Admin({ ...req.body, password: hash });
            admin.save((err, doc) => {
              if (err)
                return res.json({
                  status: false,
                  message: err,
                  data: undefined,
                });

              return res.status(200).json({
                status: true,
                message: "Admin Register Successfully",
                data: doc,
              });
            });
          }
        });
      }
    });
});

// Admin Login
// http://localhost:5000/admin/login

http: router.post("/login", (req, res) => {
  Admin.findOne({ email: req.body.email })
    .exec()
    .then((admin) => {
      if (!admin) {
        return res.status(401).json({
          message: "Admin not found",
          status: false,
          data: undefined,
        });
      }

      bcrypt.compare(req.body.password, admin.password, async (err, result) => {
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
              email: admin.email,
              adminId: admin._id,
            },

            process.env.JWT_KEY,
            {
              expiresIn: "2h",
            }
          );

          await AdminToken.findOneAndUpdate(
            { _adminId: Admin._id, tokenType: "login" },
            { token: token },
            { new: true, upsert: true }
          );
          return res.status(200).json({
            status: true,
            message: "Applicant Login Successfully",

            data: {
              token,
              admin,
            },
          });
        }
        return res.status(401).json({
          status: true,
          message: "Wrong Password",
          data: undefined,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: "Server Error, authentication failed....",
        data: undefined,
      });
    });
});

// Get one Admin Details
// http://localhost:5000/admin/:id

http: router.route("/:id").get(async (req, res) => {
  let userID = req.params.id;
  await Admin.findById(userID)
    .then((Admin) => {
      res.status(200).send({ status: "Admin Data Fetch", Admin });
    })
    .catch(() => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get Admin", error: err.message });
    });
});

// Get All Admins
// http://localhost:5000/admin/

http: router.route("/").get((req, res) => {
  Admin.find()
    .then((admin) => {
      res.json(admin);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Update Admin Details
// http://localhost:5000/admin/:id

http: router.route("/:id").put(async (req, res) => {
  let userID = req.params.id;

  //destructure
  const { name, email, password } = req.body;

  const updateAdmin = {
    name,
    email,
    password,
  };

  await Admin.findByIdAndUpdate(userID, updateAdmin)
    .then(() => {
      res.status(200).send({ status: "Admin Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data!", error: err.message });
    });
});

// Delete Admin
// http://localhost:5000/admin/:id

http: router.route("/:id").delete(async (req, res) => {
  let userID = req.params.id;

  await Admin.findByIdAndDelete(userID)

    .then(() => {
      res.status(200).send({ status: "Admin successfully Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting Admin", error: err.message });
    });
});

module.exports = router;
