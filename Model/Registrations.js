const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  Applicant_name: String,
  Job_Id: Number,
  student_id: Number,
  Branch: String,
  CGPA: Number,
  Year_Of_Graduation: Number,
  Contact_No: Number,
  Email_id: String,
  Home_Address: String,
  Job_Status: String,
  Job_Application_Date: String,
});
const registrationmodel = mongoose.model("Registration", RegistrationSchema);
module.exports = registrationmodel;
