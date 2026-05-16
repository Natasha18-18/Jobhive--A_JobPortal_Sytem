import Candidate from "../models/Candidate.js";
import User from "../models/User.js";

// =========================
// GET PROFILE
// =========================

export const getCandidateProfile =
  async (req, res) => {

    try {

      const candidate =
        await Candidate.findOne({
          userId: req.params.id,
        });

      if (!candidate) {

        return res.status(404).json({
          success: false,
          message: "Candidate not found",
        });

      }

      res.status(200).json({
        success: true,
        data: candidate,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };

// =========================
// UPDATE PROFILE
// =========================

export const updateCandidateProfile =
  async (req, res) => {

    try {

      const {
        fullName,
        email,
        phone,
      } = req.body;

      // FIND USER
      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {

        return res.status(404).json({
          success: false,
          message: "User not found",
        });

      }

      // =========================
      // UPDATE USER TABLE
      // =========================

      user.fullName = fullName;
      user.email = email;
      user.phone = phone;

      await user.save();

      // =========================
      // UPDATE CANDIDATE TABLE
      // =========================

      const candidate =
        await Candidate.findOneAndUpdate(
          {
            userId: req.params.id,
          },
          {
            fullName,
            email,
            phone,
          },
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        message:
          "Profile Updated Successfully",
        data: candidate,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };