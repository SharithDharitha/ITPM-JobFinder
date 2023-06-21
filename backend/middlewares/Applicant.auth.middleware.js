const { ApplicantToken } = require("../models/Applicant.token");
const jwt = require("jsonwebtoken");

let ApplicantAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);

  ApplicantToken.findOne(
    { ApplicantID: decoded.ApplicantID, token, tokenType: "login" },
    (err, applicantToken) => {
      if (err) throw err;
      if (!applicantToken) {
        return res.json({
          isAuth: false,
        });
      }
      req.token = token;
      req.ApplicantID = decoded.ApplicantID;
      next();
    }
  );
};

module.exports = { ApplicantAuth };
