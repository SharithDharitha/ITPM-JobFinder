const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

mongoose.set("strictQuery", false);
const PORT = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB Database Connected");
});

app.listen(PORT, () => {
  console.log(`Server is running on port number : ${PORT}`);
});

// Job Routes
const JobRouter = require("./routes/Job");
app.use("/job", JobRouter);

// Applicant Routes
const applicantRouter = require("./routes/Applicant.js");
app.use("/applicant", applicantRouter);

// Company Routes
const companyRouter = require("./routes/Company.js");
app.use("/company", companyRouter);

// Application Routes
const ApplicationRouter = require("./routes/Application");
app.use("/application", ApplicationRouter);

// Admin Routes
const AdminRouter = require("./routes/Admin");
app.use("/admin", AdminRouter);

// Inquiry Routes
const InquiryRouter = require("./routes/Inquiry");
app.use("/inquiry", InquiryRouter);
