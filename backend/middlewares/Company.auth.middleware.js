const {CompanyToken} = require('../models/Company.token');
const jwt = require("jsonwebtoken");

let CompanyAuth = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
  
    CompanyToken.findOne(
      { CompanyID: decoded.CompanyID, token, tokenType: "login" },
      (err, companyToken) => {
        if (err) throw err;
        if (!companyToken) {
          return res.json({
            isAuth: false,
          });
        }
        req.token = token;
        req.CompanyID = decoded.CompanyID;
        next();
      }
    );
  };
  
  module.exports = { CompanyAuth };