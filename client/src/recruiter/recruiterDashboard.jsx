import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

import {
  FaBriefcase,
  FaUsers,
  FaPlusCircle,
  FaEye,
  FaChartLine,
  FaUserTie,
  FaArrowRight,
  FaSpinner,
  FaMapMarkerAlt,
} from "react-icons/fa";

function RecruiterDashboard() {
  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH DASHBOARD
  // =========================

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard =
    async () => {
      try {
        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            "http://localhost:5002/api/dashboard/recruiter",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setDashboard(
          response.data.dashboard
        );
      } catch (error) {
        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">
        <FaSpinner className="animate-spin text-5xl text-cyan-400" />
      </div>
    );
  }

  // =========================
  // DATA
  // =========================

  const recruiter =
    dashboard?.recruiter;

  const stats = [
    {
      title: "Total Jobs",
      value:
        dashboard?.stats
          ?.totalJobs || 0,
      icon: <FaBriefcase />,
      color:
        "from-cyan-500 to-blue-600",
    },

    {
      title: "Applications",
      value:
        dashboard?.stats
          ?.totalApplications || 0,
      icon: <FaUsers />,
      color:
        "from-purple-500 to-pink-500",
    },

    {
      title: "Hired",
      value:
        dashboard?.stats
          ?.acceptedApplications || 0,
      icon: <FaEye />,
      color:
        "from-orange-500 to-red-500",
    },

    {
      title: "Hiring Rate",
      value: `${dashboard?.stats?.hiringRate || 0}%`,
      icon: <FaChartLine />,
      color:
        "from-green-500 to-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white pt-32 pb-16 px-6 overflow-hidden relative">
      {/* BG EFFECTS */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              Welcome Back,
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {" "}
                {recruiter?.fullName ||
                  "Recruiter"}
              </span>
            </h1>

            <p className="text-gray-400 mt-3 text-lg max-w-2xl">
              Manage your jobs,
              applications, and hiring
              pipeline from one
              powerful dashboard.
            </p>
          </div>

          {/* ACTION BUTTON */}

          <Link to="/recruiter/upload-job">
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl font-bold text-lg"
            >
              <FaPlusCircle />

              Post New Job
            </motion.button>
          </Link>
        </motion.div>

        {/* ========================= */}
        {/* STATS */}
        {/* ========================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-14">
          {stats.map(
            (item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="relative overflow-hidden bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-7 shadow-2xl"
              >
                <div
                  className={`absolute inset-0 opacity-10 bg-gradient-to-r ${item.color}`}
                ></div>

                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">
                      {item.title}
                    </p>

                    <h2 className="text-4xl font-black mt-3">
                      {item.value}
                    </h2>
                  </div>

                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-3xl shadow-xl`}
                  >
                    {item.icon}
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* ========================= */}
        {/* QUICK ACTIONS */}
        {/* ========================= */}

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* POST JOB */}

          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-3xl mb-6">
              <FaPlusCircle />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Upload New Job
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Create detailed job
              posts and attract top
              talent instantly.
            </p>

            <Link
              to="/recruiter/upload-job"
              className="inline-flex items-center gap-2 mt-6 text-cyan-400 font-semibold hover:gap-3 transition-all"
            >
              Create Job

              <FaArrowRight />
            </Link>
          </motion.div>

          {/* MY JOBS */}

          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl mb-6">
              <FaBriefcase />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Manage Jobs
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Edit, delete, or update
              your active and closed
              job listings.
            </p>

            <Link
              to="/recruiter/my-jobs"
              className="inline-flex items-center gap-2 mt-6 text-cyan-400 font-semibold hover:gap-3 transition-all"
            >
              View Jobs

              <FaArrowRight />
            </Link>
          </motion.div>

          {/* PROFILE */}

          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-3xl mb-6">
              <FaUserTie />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Recruiter Profile
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Keep your recruiter
              profile updated and
              professional.
            </p>

            <Link
              to="/recruiter/profile"
              className="inline-flex items-center gap-2 mt-6 text-cyan-400 font-semibold hover:gap-3 transition-all"
            >
              Edit Profile

              <FaArrowRight />
            </Link>
          </motion.div>
        </div>

        {/* ========================= */}
        {/* RECENT JOBS */}
        {/* ========================= */}

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
            delay: 0.3,
          }}
          className="mt-16 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-2xl overflow-hidden shadow-2xl"
        >
          {/* HEADER */}

          <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
            <div>
              <h2 className="text-3xl font-black">
                Recent Job Posts
              </h2>

              <p className="text-gray-400 mt-1">
                Latest recruiter
                activity overview.
              </p>
            </div>
          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="text-left border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-8 py-5">
                    Job Title
                  </th>

                  <th className="px-8 py-5">
                    Location
                  </th>

                  <th className="px-8 py-5">
                    Applicants
                  </th>

                  <th className="px-8 py-5">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {dashboard?.recentJobs
                  ?.length > 0 ? (
                  dashboard?.recentJobs?.map(
                    (
                      job,
                      index
                    ) => (
                      <motion.tr
                        key={job._id}
                        whileHover={{
                          backgroundColor:
                            "rgba(255,255,255,0.03)",
                        }}
                        className="border-b border-white/5 transition"
                      >
                        <td className="px-8 py-6 font-semibold">
                          {job.title}
                        </td>

                        <td className="px-8 py-6 text-gray-400">
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt />

                            {job.location ||
                              "Remote"}
                          </div>
                        </td>

                        <td className="px-8 py-6">
                          {
                            job.applicants
                          }
                        </td>

                        <td className="px-8 py-6">
                          <span
                            className={`px-4 py-2 rounded-full text-xs font-bold ${
                              job.status ===
                              "Active"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {job.status}
                          </span>
                        </td>
                      </motion.tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-10 text-gray-400"
                    >
                      No jobs posted yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;