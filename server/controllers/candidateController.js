import Candidate from "../models/candidateModel.js";
import User from "../models/User.js";

export const createCandidateProfile = async (
  req,
  res
) => {
  try {

    console.log(req.body);

    const {
      userId,
      fullName,
      email,
      phone,
      role,
      bio,
      headline,
      location,
      experience,
      education,
      portfolio,
      linkedin,
      github,
    } = req.body;

    // REQUIRED
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // FILES
    let profileImage = "";
    let resume = "";

    if (req.files?.profileImage) {
      profileImage =
        req.files.profileImage[0].filename;
    }

    if (req.files?.resume) {
      resume =
        req.files.resume[0].filename;
    }

    // SKILLS
    let skills = [];

    if (req.body.skills) {
      skills = JSON.parse(
        req.body.skills
      );
    }

    // UPDATE USER
    const updatedUser =
      await User.findByIdAndUpdate(
        userId,
        {
          fullName,
          email,
          phone,
          role,
          bio,
          headline,
          location,
          experience,
          education,
          portfolio,
          linkedin,
          github,
          skills,

          ...(profileImage && {
            profileImage,
          }),

          ...(resume && {
            resume,
          }),
        },
        {
          returnDocument: "after",
        }
      ).select("-password");

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      data: updatedUser,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};