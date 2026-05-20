import User from "../models/User.js";

export const updateCandidateProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {

        return res.status(404).json({
          success: false,
          message: "User not found",
        });

      }

      user.fullName =
        req.body.fullName ||
        user.fullName;

      user.phone =
        req.body.phone ||
        user.phone;

      user.headline =
        req.body.headline ||
        user.headline;

      user.bio =
        req.body.bio ||
        user.bio;

      user.location =
        req.body.location ||
        user.location;

      user.experience =
        req.body.experience ||
        user.experience;

      user.portfolio =
        req.body.portfolio ||
        user.portfolio;

      user.linkedin =
        req.body.linkedin ||
        user.linkedin;

      user.github =
        req.body.github ||
        user.github;

      user.resume =
        req.body.resume ||
        user.resume;

      user.skills =
        req.body.skills ||
        user.skills;

      if (req.body.profileImage) {

        user.profileImage =
          req.body.profileImage;

      }

      await user.save();

      res.status(200).json({
        success: true,
        message:
          "Profile updated successfully",
        user,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };