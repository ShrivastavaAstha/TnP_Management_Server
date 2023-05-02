const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema({
  Job_Id: Number,
  Company_Name: String,
  Job_Role: String,
  Job_location: String,
  Salary: String,
  No_Of_vacancy: Number,
  Branch_Eligibility: String,
  Minimum_CGPA_required: Number,
  Deadline_Date_For_Registration: String,
});
const jobmodel = mongoose.model("Jobs", JobSchema);
module.exports = jobmodel;
