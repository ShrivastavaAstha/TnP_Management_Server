const express = require("express");
const app = express();
const { connectDatabase } = require("./connection/connect");
const REGISTRATION_MODEL = require("./Model/Registrations");
const Job_MODEL = require("./Model/Job");
app.use(express.json());

//A Company can't post more than two job posts:
app.post("/api/jobinfo", async (req, res) => {
  try {
    const { Company_Name } = req.body;
    const count = await Job_MODEL.countDocuments({ Company_Name });
    if (count >= 2) {
      return res.status(400).json({ message: "Already Posted Two" });
    }
    const jobobj = {
      Job_Id: req.body.job_id,
      Company_Name: req.body.Company_Name,
      Job_Role: req.body.job_role,
      Job_location: req.body.job_location,
      Salary: req.body.salary,
      No_Of_vacancy: req.body.no_of_vacancy,
      Branch_Eligibility: req.body.branch_eligibility,
      Minimum_CGPA_required: req.body.Minimum_CGPA_required,
      Deadline_Date_For_Registration: req.body.deadline_date_for_registration,
    };
    console.log(jobobj);
    await new Job_MODEL(jobobj).save();
    return res
      .status(400)
      .json({ success: true, message: "Database Connected" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});

//Tnp can Change job details:
app.put("/updateinjobdetails/:id", async (req, res) => {
  try {
    const data = await Job_MODEL.findByIdAndUpdate(req.params.id, {
      No_Of_vacancy: 8,
    });
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});
//Tnp can delete any job posting:
app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedoc = await Job_MODEL.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});
//Student can also see job postings according to their branch and cgpa:
app.get("/api/filteredjobs", async (req, res) => {
  try {
    const sortedstudent = await Job_MODEL.find(
      { Branch_Eligibility: "ME", Minimum_CGPA_required: 6.5 },
      {}
    );
    return res.json({ success: true, data: sortedstudent });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});
//A student can't register in the same job twice:
app.post("/api/studentdata", async (req, res) => {
  try {
    const { Job_Id, Email_Id } = req.body;
    const count = await REGISTRATION_MODEL.countDocuments({ Job_Id, Email_Id });
    if (count > 0) {
      return res.status(400).json({ message: "Applied" });
    }
    const stuobj = {
      Applicant_name: req.body.Student_name,
      Job_Id: req.body.Job_Id,
      Branch: req.body.Branch,
      CGPA: req.body.CGPA,
      Year_Of_Graduation: req.body.Passout_Year,
      Contact_No: req.body.Student_contact_no,
      Email_id: req.body.Email_Id,
      Home_Address: req.body.Address,
      Job_Status: req.body.Job_status,
      Job_Application_Date: req.body.Job_application_date,
    };
    console.log(stuobj);
    await new REGISTRATION_MODEL(stuobj).save();
    return res
      .status(400)
      .json({ success: true, message: "Database Connected" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});

//TnP can change the job status of the students:
app.put("/updatebytnp/:id", async (req, res) => {
  try {
    const data = await REGISTRATION_MODEL.findByIdAndUpdate(req.params.id, {
      Job_Status: "Hired",
    });
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});

//Students can also change their details:
app.put("/updatebystudent/:id", async (req, res) => {
  try {
    const data = await REGISTRATION_MODEL.findByIdAndUpdate(req.params.id, {
      Contact_No: 8840327865,
    });
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});

//Tnp can see all students registered to any job:
app.get("/api/getregisteredstu", async (req, res) => {
  try {
    const studentdata = await REGISTRATION_MODEL.find();
    return res.json({ success: true, data: studentdata });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});
//Tnp can see all the students hired/shortlisted/rejected:
app.get("/api/hiredone", async (req, res) => {
  try {
    const sortedstudent = await REGISTRATION_MODEL.findOne({
      Job_Status: "Hired",
    });
    return res.json({ success: true, data: sortedstudent });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});
app.get("/api/shortlistedone", async (req, res) => {
  try {
    const sortedstudent = await REGISTRATION_MODEL.findOne({
      Job_Status: "Shortlisted",
    });
    return res.json({ success: true, data: sortedstudent });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});
app.get("/api/rejectedone", async (req, res) => {
  try {
    const sortedstudent = await REGISTRATION_MODEL.findOne({
      Job_Status: "Rejected",
    });
    return res.json({ success: true, data: sortedstudent });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});
//Tnp can see all the hired students for a company:
app.get("/api/hiredincompany", async (req, res) => {
  try {
    const sortedstudent = await REGISTRATION_MODEL.findOne({
      Job_Status: "Hired",
      Job_Id: 1001,
    });
    return res.json({ success: true, data: sortedstudent });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});
//Students must be able to view all the job postings applied:
app.get("/api/appliedcompanies", async (req, res) => {
  try {
    const sortedstudent = await Job_MODEL.findOne({ Job_Id: 1001 });
    return res.json({ success: true, data: sortedstudent });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});
//Student can delete their registration:
app.delete("/deletebystudent/:id", async (req, res) => {
  try {
    const deletedoc = await REGISTRATION_MODEL.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});
connectDatabase();
app.listen(8000, () => {
  console.log("Server is running at Port 8000");
});
