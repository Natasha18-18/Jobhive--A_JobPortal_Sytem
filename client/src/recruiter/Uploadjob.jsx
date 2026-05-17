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

    <div className="min-h-screen bg-[#050816] text-white pt-32 pb-20 px-6 relative overflow-hidden">

      {/* BG EFFECTS */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full"></div>

      <div className="max-w-5xl mx-auto relative z-10">

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
          className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-2xl"
        >

          {/* HEADER */}

          <div className="mb-10">

            <h1 className="text-4xl md:text-5xl font-black">

              Upload

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                {" "}
                Job

              </span>

            </h1>

            <p className="text-gray-400 mt-4 text-lg">

              Create a professional job listing
              and hire top candidates.

            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            {/* TITLE */}

            <div>

              <label className="block mb-2 font-semibold">

                Job Title

              </label>

              <div className="relative">

                <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" />

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Frontend Developer"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400"
                />

              </div>

            </div>

            {/* COMPANY */}

            <div>

              <label className="block mb-2 font-semibold">

                Company Name

              </label>

              <div className="relative">

                <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" />

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Google"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400"
                />

              </div>

            </div>

            {/* LOCATION */}

            <div>

              <label className="block mb-2 font-semibold">

                Location

              </label>

              <div className="relative">

                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" />

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Delhi"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400"
                />

              </div>

            </div>

            {/* SALARY */}

            <div>

              <label className="block mb-2 font-semibold">

                Salary

              </label>

              <div className="relative">

                <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" />

                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="50000"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400"
                />

              </div>

            </div>

            {/* TYPE */}

            <div>

              <label className="block mb-2 font-semibold">

                Job Type

              </label>

              <div className="relative">

                <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" />

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400"
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

              <label className="block mb-2 font-semibold">

                Experience

              </label>

              <div className="relative">

                <FaUserTie className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" />

                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="2 Years"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400"
                />

              </div>

            </div>

            {/* SKILLS */}

            <div className="md:col-span-2">

              <label className="block mb-2 font-semibold">

                Skills

              </label>

              <div className="relative">

                <FaCode className="absolute left-4 top-6 text-cyan-400" />

                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400"
                />

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="md:col-span-2">

              <label className="block mb-2 font-semibold">

                Description

              </label>

              <div className="relative">

                <FaAlignLeft className="absolute left-4 top-6 text-cyan-400" />

                <textarea
                  rows="7"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write complete job description..."
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400 resize-none"
                />

              </div>

            </div>

            {/* BUTTON */}

            <div className="md:col-span-2 mt-4">

              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-lg shadow-2xl"
              >

                {loading
                  ? "Uploading Job..."
                  : "Upload Job"}

              </motion.button>

            </div>

          </form>

        </motion.div>

      </div>

    </div>
  );
}

export default UploadJob;