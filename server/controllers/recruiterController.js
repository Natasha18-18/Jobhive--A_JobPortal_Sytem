import User from "../models/User.js";

// ==============================
// GET RECRUITER PROFILE
// ==============================

export const getRecruiterProfile =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        ).select("-password");

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to load profile",
      });
    }
  };

// ==============================
// UPDATE RECRUITER PROFILE
// ==============================

export const updateRecruiterProfile =
  async (req, res) => {
    try {
      const {
        fullName,
        email,
        phone,
        companyName,
        industry,
        location,
        website,
        linkedin,
        experience,
        skills,
        companyDescription,
      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }
// PROFILE IMAGE
if (req.files?.profileImage) {
  user.profileImage =
    req.files.profileImage[0]
      .filename;
}

// COMPANY LOGO
if (req.files?.companyLogo) {
  user.recruiterProfile.companyLogo =
    req.files.companyLogo[0]
      .filename;
}

user.fullName = fullName;
user.email = email;
user.phone = phone;

user.recruiterProfile.companyName =
  companyName;

user.recruiterProfile.industry =
  industry;

user.recruiterProfile.location =
  location;

user.recruiterProfile.website =
  website;

user.recruiterProfile.linkedin =
  linkedin;

user.recruiterProfile.experience =
  experience;

user.recruiterProfile.skills =
  skills;

user.recruiterProfile.companyDescription =
  companyDescription;

      await user.save();

      res.status(200).json({
        success: true,
        message:
          "Recruiter profile updated",
        user,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Profile update failed",
      });
    }
  };