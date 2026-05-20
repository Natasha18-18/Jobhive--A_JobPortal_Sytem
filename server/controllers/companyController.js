import User from "../models/User.js";
import Job from "../models/jobModel.js";
import Company from "../models/companyModel.js";

// ==========================================
// GET ALL COMPANIES
// ==========================================
export const getCompanies = async (req, res) => {
  try {

    // RECRUITER COMPANIES
    const recruiters = await User.find({
      role: "recruiter",
    }).select(`
      fullName
      profileImage
      recruiterProfile
    `);

    const recruiterCompanies = await Promise.all(
      recruiters.map(async (recruiter) => {

        const totalJobs = await Job.countDocuments({
          recruiter: recruiter._id,
        });

        return {
          _id: recruiter._id,
          type: "recruiter",

          fullName: recruiter.fullName,
          profileImage: recruiter.profileImage,
          recruiterProfile: recruiter.recruiterProfile,

          totalJobs,
        };
      })
    );

    // STATIC COMPANIES
    const companies = await Company.find();

    const staticCompanies = companies.map((company) => ({
      ...company._doc,
      type: "company",
    }));

    // MERGE
    const allCompanies = [
      ...recruiterCompanies,
      ...staticCompanies,
    ];

    res.status(200).json({
      success: true,
      companies: allCompanies,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ==========================================
// GET SINGLE COMPANY
// ==========================================
export const getSingleCompany = async (req, res) => {

  try {

    const { id } = req.params;

    // =====================================
    // FIRST CHECK RECRUITER COMPANY
    // =====================================
    let company = await User.findById(id).select(`
      fullName
      email
      profileImage
      recruiterProfile
    `);

    // =====================================
    // IF NOT FOUND -> CHECK STATIC COMPANY
    // =====================================
    if (!company) {

      company = await Company.findById(id);

      if (!company) {
        return res.status(404).json({
          success: false,
          message: "Company not found",
        });
      }

      return res.status(200).json({
        success: true,
        company,
        jobs: [],
      });
    }

    // =====================================
    // RECRUITER JOBS
    // =====================================
    const jobs = await Job.find({
      recruiter: company._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      company,
      jobs,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};