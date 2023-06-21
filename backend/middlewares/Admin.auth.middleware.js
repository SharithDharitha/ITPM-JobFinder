const { AdminToken } = require("../models/AdminToken.model");
const jwt = require("jsonwebtoken");

let AdminAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);

  AdminToken.findOne(
    { AdminID: decoded.AdminID, token, tokenType: "login" },
    (err, adminToken) => {
      if (err) throw err;
      if (!adminToken) {
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

module.exports = { AdminAuth };
