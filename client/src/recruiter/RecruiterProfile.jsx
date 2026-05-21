import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  FaCamera,
  FaBriefcase,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaLinkedin,
  FaBuilding,
  FaUserTie,
  FaIndustry,
  FaTools,
  FaSave,
  FaSpinner,
} from "react-icons/fa";

import { motion } from "framer-motion";

function RecruiterProfile() {

  // =========================
  // STATES
  // =========================

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [profilePreview, setProfilePreview] =
    useState("");

  const [logoPreview, setLogoPreview] =
    useState("");

  const [profileImage, setProfileImage] =
    useState(null);

  const [companyLogo, setCompanyLogo] =
    useState(null);

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      industry: "",
      location: "",
      website: "",
      linkedin: "",
      experience: "",
      skills: "",
      companyDescription: "",
    });

  // =========================
  // LOAD PROFILE
  // =========================

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.get(
          "http://localhost:5002/api/recruiter/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const user =
        response.data.user;

      setFormData({
        fullName:
          user.fullName || "",

        email:
          user.email || "",

        phone:
          user.phone || "",

        companyName:
          user.recruiterProfile
            ?.companyName || "",

        industry:
          user.recruiterProfile
            ?.industry || "",

        location:
          user.recruiterProfile
            ?.location || "",

        website:
          user.recruiterProfile
            ?.website || "",

        linkedin:
          user.recruiterProfile
            ?.linkedin || "",

        experience:
          user.recruiterProfile
            ?.experience || "",

        skills:
          user.recruiterProfile
            ?.skills || "",

        companyDescription:
          user.recruiterProfile
            ?.companyDescription || "",
      });

      // PROFILE IMAGE

      if (user.profileImage) {

        setProfilePreview(
          `http://localhost:5002/uploads/${user.profileImage}?${Date.now()}`
        );

      }

      // COMPANY LOGO

      if (
        user.recruiterProfile
          ?.companyLogo
      ) {

        setLogoPreview(
          `http://localhost:5002/uploads/${user.recruiterProfile.companyLogo}?${Date.now()}`
        );

      }

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Failed to load profile"
      );

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  // =========================
  // PROFILE IMAGE
  // =========================

  const handleProfileImage = (
    e
  ) => {

    const file =
      e.target.files[0];

    if (file) {

      setProfileImage(file);

      setProfilePreview(
        URL.createObjectURL(file)
      );

    }

  };

  // =========================
  // COMPANY LOGO
  // =========================

  const handleCompanyLogo = (
    e
  ) => {

    const file =
      e.target.files[0];

    if (file) {

      setCompanyLogo(file);

      setLogoPreview(
        URL.createObjectURL(file)
      );

    }

  };

  // =========================
  // SAVE PROFILE
  // =========================

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      setSaving(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const data =
        new FormData();

      // TEXT DATA

      Object.keys(formData).forEach(
        (key) => {

          data.append(
            key,
            formData[key]
          );

        }
      );

      // PROFILE IMAGE

      if (profileImage) {

        data.append(
          "profileImage",
          profileImage
        );

      }

      // COMPANY LOGO

      if (companyLogo) {

        data.append(
          "companyLogo",
          companyLogo
        );

      }

      const response =
        await axios.put(
          "http://localhost:5002/api/recruiter/profile",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      toast.success(
        response.data.message
      );

      // UPDATE LOCAL STORAGE

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

      setProfilePreview(
  `http://localhost:5002/uploads/${response.data.user.profileImage}?${Date.now()}`
);

if (
  response.data.user.recruiterProfile?.companyLogo
) {
  setLogoPreview(
    `http://localhost:5002/uploads/${response.data.user.recruiterProfile.companyLogo}?${Date.now()}`
  );
}

      // UPDATE NAVBAR

     window.dispatchEvent(
  new Event("profileUpdated")
);

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Profile update failed"
      );

    } finally {

      setSaving(false);

    }

  };

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="min-h-screen bg-[#050816] flex justify-center items-center">

        <FaSpinner className="text-5xl text-cyan-400 animate-spin" />

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#050816] text-white px-4 md:px-10 py-32 overflow-hidden relative">

      {/* BG EFFECTS */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full"></div>

      {/* HEADER */}

      <motion.div
        initial={{
          opacity: 0,
          y: -30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="text-center mb-14"
      >

        <h1 className="text-5xl font-extrabold mb-4">

          Recruiter

          <span className="text-cyan-400">

            {" "}
            Profile

          </span>

        </h1>

        <p className="text-gray-400 text-lg">

          Manage your company hiring profile

        </p>

      </motion.div>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* LEFT CARD */}

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl"
        >

          {/* PROFILE IMAGE */}

          <div className="flex flex-col items-center mb-10">

            <div className="relative group">

              <img
                src={
                  profilePreview ||
                  "https://i.pravatar.cc/300"
                }
                alt="profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-cyan-400 shadow-2xl"
              />

              <label className="absolute bottom-2 right-2 bg-cyan-500 hover:bg-cyan-600 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-xl transition-all duration-300">

                <FaCamera />

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={
                    handleProfileImage
                  }
                />

              </label>

            </div>

            <h2 className="text-2xl font-bold mt-5">

              {formData.fullName ||
                "Recruiter Name"}

            </h2>

            <p className="text-cyan-400 mt-1">

              Hiring Manager

            </p>

          </div>

          {/* COMPANY LOGO */}

          <div className="bg-white/5 rounded-3xl p-6 border border-white/10">

            <h3 className="text-xl font-bold mb-5">

              Company Logo

            </h3>

            <div className="flex flex-col items-center">

              <img
                src={
                  logoPreview ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="company-logo"
                className="w-28 h-28 rounded-2xl object-cover border border-white/10"
              />

              <label className="mt-5 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 cursor-pointer hover:scale-105 transition-all duration-300 font-semibold shadow-xl">

                Upload Logo

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={
                    handleCompanyLogo
                  }
                />

              </label>

            </div>

          </div>

        </motion.div>

        {/* RIGHT FORM */}

        <motion.form
          onSubmit={handleSubmit}
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="lg:col-span-2 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl"
        >

          <div className="grid md:grid-cols-2 gap-6">

            <InputField
              icon={<FaUserTie />}
              label="Full Name"
              name="fullName"
              value={
                formData.fullName
              }
              onChange={
                handleChange
              }
              placeholder="Enter recruiter name"
            />

            <InputField
              icon={<FaEnvelope />}
              label="Email"
              name="email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              placeholder="Enter email"
            />

            <InputField
              icon={<FaPhone />}
              label="Phone"
              name="phone"
              value={
                formData.phone
              }
              onChange={
                handleChange
              }
              placeholder="Enter phone"
            />

            <InputField
              icon={<FaBuilding />}
              label="Company Name"
              name="companyName"
              value={
                formData.companyName
              }
              onChange={
                handleChange
              }
              placeholder="Enter company name"
            />

            <InputField
              icon={<FaIndustry />}
              label="Industry"
              name="industry"
              value={
                formData.industry
              }
              onChange={
                handleChange
              }
              placeholder="Software / IT"
            />

            <InputField
              icon={
                <FaMapMarkerAlt />
              }
              label="Location"
              name="location"
              value={
                formData.location
              }
              onChange={
                handleChange
              }
              placeholder="Delhi, India"
            />

            <InputField
              icon={<FaGlobe />}
              label="Website"
              name="website"
              value={
                formData.website
              }
              onChange={
                handleChange
              }
              placeholder="www.company.com"
            />

            <InputField
              icon={<FaLinkedin />}
              label="LinkedIn"
              name="linkedin"
              value={
                formData.linkedin
              }
              onChange={
                handleChange
              }
              placeholder="LinkedIn profile"
            />

            <InputField
              icon={<FaBriefcase />}
              label="Experience"
              name="experience"
              value={
                formData.experience
              }
              onChange={
                handleChange
              }
              placeholder="5 Years"
            />

          </div>

          {/* SKILLS */}

          <div className="mt-6">

            <label className="text-gray-300 mb-2 block">

              Skills

            </label>

            <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-4 focus-within:border-cyan-400 transition-all duration-300">

              <FaTools className="text-cyan-400 mt-1" />

              <textarea
                rows="3"
                name="skills"
                value={
                  formData.skills
                }
                onChange={
                  handleChange
                }
                placeholder="Hiring, HR, Recruitment"
                className="bg-transparent outline-none w-full resize-none"
              />

            </div>

          </div>

          {/* DESCRIPTION */}

          <div className="mt-6">

            <label className="text-gray-300 mb-2 block">

              Company Description

            </label>

            <textarea
              rows="6"
              name="companyDescription"
              value={
                formData.companyDescription
              }
              onChange={
                handleChange
              }
              placeholder="Write about your company..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-cyan-400 transition-all duration-300 resize-none"
            />

          </div>

          {/* BUTTON */}

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.96,
            }}
            type="submit"
            disabled={saving}
            className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-lg shadow-2xl flex items-center justify-center gap-3 disabled:opacity-60"
          >

            {saving ? (
              <>

                <FaSpinner className="animate-spin" />

                Saving...

              </>
            ) : (
              <>

                <FaSave />

                Save Recruiter Profile

              </>
            )}

          </motion.button>

        </motion.form>

      </div>

    </div>
  );
}

// =========================
// REUSABLE INPUT
// =========================

function InputField({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
}) {

  return (

    <div>

      <label className="text-gray-300 mb-2 block">

        {label}

      </label>

      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-4 focus-within:border-cyan-400 transition-all duration-300">

        <span className="text-cyan-400">

          {icon}

        </span>

        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-transparent outline-none w-full"
        />

      </div>

    </div>

  );

}

export default RecruiterProfile;