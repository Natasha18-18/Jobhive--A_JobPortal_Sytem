import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaAlignLeft,
  FaBuilding,
  FaCode,
  FaUserTie,
  FaArrowLeft,
  FaRocket,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function UploadJob() {

  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      company: "",
      location: "",
      salary: "",
      type: "Full Time",
      experience: "",
      description: "",
      skills: "",
    });

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
  // SUBMIT
  // =========================

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.post(
          "http://localhost:5002/api/jobs/create",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      toast.success(
        response.data.message
      );

      navigate(
        "/recruiter/my-jobs"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Job upload failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-[#050816] text-white pt-28 pb-20 px-4 md:px-6 relative overflow-hidden">

      {/* BG EFFECTS */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* TOP BAR */}

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-10">

          {/* LEFT */}

          <div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="text-4xl md:text-6xl font-black leading-tight"
            >

              Create New{" "}

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                Job

              </span>

            </motion.h1>

            <p className="text-gray-400 mt-3 text-lg">

              Publish professional job opportunities
              and hire talented candidates faster.

            </p>

          </div>

          {/* BACK BUTTON */}

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() =>
              navigate(
                "/recruiter/dashboard"
              )
            }
            className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400 transition-all duration-300 backdrop-blur-xl font-semibold"
          >

            <FaArrowLeft />

            Back to Dashboard

          </motion.button>

        </div>

        {/* CARD */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] p-6 md:p-12 shadow-[0_0_60px_rgba(0,255,255,0.08)]"
        >

          {/* FORM HEADER */}

          <div className="flex items-center gap-4 mb-10">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-3xl shadow-2xl">

              <FaRocket />

            </div>

            <div>

              <h2 className="text-3xl font-black">

                Job Information

              </h2>

              <p className="text-gray-400 mt-1">

                Fill all required fields carefully.

              </p>

            </div>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-7"
          >

            {/* TITLE */}

            <div>

              <label className="block mb-3 font-semibold text-gray-200">

                Job Title

              </label>

              <div className="relative">

                <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Frontend Developer"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />

              </div>

            </div>

            {/* COMPANY */}

            <div>

              <label className="block mb-3 font-semibold text-gray-200">

                Company Name

              </label>

              <div className="relative">

                <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Google"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />

              </div>

            </div>

            {/* LOCATION */}

            <div>

              <label className="block mb-3 font-semibold text-gray-200">

                Location

              </label>

              <div className="relative">

                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Delhi"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />

              </div>

            </div>

            {/* SALARY */}

            <div>

              <label className="block mb-3 font-semibold text-gray-200">

                Salary

              </label>

              <div className="relative">

                <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />

                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="50000"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />

              </div>

            </div>

            {/* TYPE */}

            <div>

              <label className="block mb-3 font-semibold text-gray-200">

                Job Type

              </label>

              <div className="relative">

                <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                >

                  <option className="bg-[#0b1120]">
                    Full Time
                  </option>

                  <option className="bg-[#0b1120]">
                    Part Time
                  </option>

                  <option className="bg-[#0b1120]">
                    Internship
                  </option>

                  <option className="bg-[#0b1120]">
                    Remote
                  </option>

                </select>

              </div>

            </div>

            {/* EXPERIENCE */}

            <div>

              <label className="block mb-3 font-semibold text-gray-200">

                Experience

              </label>

              <div className="relative">

                <FaUserTie className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />

                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="2 Years"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />

              </div>

            </div>

            {/* SKILLS */}

            <div className="md:col-span-2">

              <label className="block mb-3 font-semibold text-gray-200">

                Required Skills

              </label>

              <div className="relative">

                <FaCode className="absolute left-4 top-5 text-cyan-400 text-lg" />

                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="md:col-span-2">

              <label className="block mb-3 font-semibold text-gray-200">

                Job Description

              </label>

              <div className="relative">

                <FaAlignLeft className="absolute left-4 top-5 text-cyan-400 text-lg" />

                <textarea
                  rows="8"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write detailed job description, responsibilities, requirements, and benefits..."
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-none transition-all"
                />

              </div>

            </div>

            {/* BUTTONS */}

            <div className="md:col-span-2 flex flex-col md:flex-row gap-5 mt-4">

              {/* CANCEL */}

              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                type="button"
                onClick={() =>
                  navigate(
                    "/recruiter/dashboard"
                  )
                }
                className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-red-400 transition-all font-bold text-lg"
              >

                Cancel

              </motion.button>

              {/* SUBMIT */}

              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-lg shadow-2xl disabled:opacity-70"
              >

                {loading
                  ? "Uploading Job..."
                  : "Publish Job"}

              </motion.button>

            </div>

          </form>

        </motion.div>

      </div>

    </div>
  );
}

export default UploadJob;