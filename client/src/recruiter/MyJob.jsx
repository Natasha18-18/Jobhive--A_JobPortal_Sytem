import { useState, useEffect } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUsers,
  FaTrash,
  FaSearch,
  FaFilter,
  FaPlusCircle,
  FaEdit,
  FaEye,
} from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import toast from "react-hot-toast";

function MyJobs() {

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const navigate =
    useNavigate();

  // =========================
  // FETCH JOBS
  // =========================

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.get(
          "http://localhost:5002/api/jobs/my-jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      if (
        response.data.success
      ) {

        setJobs(
          response.data.jobs || []
        );

      }

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Failed to load jobs"
      );

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // DELETE JOB
  // =========================

  const handleDelete = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this job?"
      );

    if (!confirmDelete)
      return;

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.delete(
          `http://localhost:5002/api/jobs/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      toast.success(
        response.data.message
      );

      fetchJobs();

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Delete failed"
      );

    }

  };

  // =========================
  // FILTER JOBS
  // =========================

  const filteredJobs =
    jobs.filter((job) => {

      const matchesSearch =
        job?.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =
        filter === "All"
          ? true
          : job.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );

    });

  return (

    <div className="min-h-screen bg-[#050816] text-white pt-32 pb-16 px-6 relative overflow-hidden">

      {/* BG EFFECT */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

          <div>

            <h1 className="text-5xl font-black">

              My{" "}

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                Jobs

              </span>

            </h1>

            <p className="text-gray-400 mt-3 text-lg">

              Manage your uploaded jobs easily.

            </p>

          </div>

          {/* UPLOAD BUTTON */}

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

              Upload New Job

            </motion.button>

          </Link>

        </div>

        {/* SEARCH + FILTER */}

        <div className="mt-10 flex flex-col lg:flex-row gap-5">

          {/* SEARCH */}

          <div className="flex-1 relative">

            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400 backdrop-blur-xl"
            />

          </div>

          {/* FILTER */}

          <div className="relative">

            <FaFilter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value
                )
              }
              className="pl-14 pr-10 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400 backdrop-blur-xl"
            >

              <option className="bg-[#0b1120]">
                All
              </option>

              <option className="bg-[#0b1120]">
                Active
              </option>

              <option className="bg-[#0b1120]">
                Closed
              </option>

            </select>

          </div>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="flex justify-center items-center mt-24">

            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

          </div>

        ) : (

          <>
            {/* JOBS GRID */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">

              <AnimatePresence>

                {filteredJobs.map(
                  (
                    job,
                    index
                  ) => (

                    <motion.div
                      key={job._id}
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                      }}
                      transition={{
                        delay:
                          index * 0.1,
                      }}
                      whileHover={{
                        y: -8,
                      }}
                      className="relative overflow-hidden bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl"
                    >

                      {/* ICON */}

                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-3xl shadow-xl mb-5">

                        <FaBriefcase />

                      </div>

                      {/* TITLE */}

                      <h2 className="text-2xl font-black leading-tight">

                        {job.title}

                      </h2>

                      <p className="text-gray-400 mt-2">

                        {job.company}

                      </p>

                      {/* STATUS */}

                      <div className="mt-4">

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold ${
                            job.status ===
                            "Active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >

                          {job.status}

                        </span>

                      </div>

                      {/* DETAILS */}

                      <div className="mt-8 space-y-4 relative z-10">

                        <div className="flex items-center gap-3 text-gray-300">

                          <FaMapMarkerAlt className="text-cyan-400" />

                          {job.location}

                        </div>

                        <div className="flex items-center gap-3 text-gray-300">

                          <FaMoneyBillWave className="text-cyan-400" />

                          ₹ {job.salary}

                        </div>

                        <div className="flex items-center gap-3 text-gray-300">

                          <FaUsers className="text-cyan-400" />

                          {job?.applicants
                            ?.length || 0}{" "}
                          Applicants

                        </div>

                      </div>

                      {/* BUTTONS */}

                      <div className="mt-8 flex flex-wrap gap-4 relative z-10">

                        {/* VIEW */}

                        {/* <motion.button
                          whileHover={{
                            scale: 1.05,
                          }}
                          whileTap={{
                            scale: 0.95,
                          }}
                          onClick={() =>
                            navigate(
                              `/jobs/${job._id}`
                            )
                          }
                          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold shadow-xl"
                        >

                          <FaEye />

                          View

                        </motion.button> */}

                        {/* EDIT */}

                        <motion.button
                          whileHover={{
                            scale: 1.05,
                          }}
                          whileTap={{
                            scale: 0.95,
                          }}
                          onClick={() =>
                            navigate(
                              `/recruiter/edit-job/${job._id}`
                            )
                          }
                          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 border border-white/10 hover:border-cyan-400 transition font-semibold"
                        >

                          <FaEdit />

                          Edit

                        </motion.button>

                        {/* APPLICANTS */}

                        <motion.button
                          whileHover={{
                            scale: 1.05,
                          }}
                          whileTap={{
                            scale: 0.95,
                          }}
                          onClick={() =>
                            navigate(
                              `/recruiter/applicants/${job._id}`
                            )
                          }
                          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition font-semibold"
                        >

                          <FaUsers />

                          Applicants

                        </motion.button>

                        {/* DELETE */}

                        <motion.button
                          whileHover={{
                            scale: 1.05,
                          }}
                          whileTap={{
                            scale: 0.95,
                          }}
                          onClick={() =>
                            handleDelete(
                              job._id
                            )
                          }
                          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition font-semibold"
                        >

                          <FaTrash />

                          Delete

                        </motion.button>

                      </div>

                    </motion.div>
                  )
                )}

              </AnimatePresence>

            </div>

            {/* EMPTY STATE */}

            {filteredJobs.length ===
              0 && (

              <div className="text-center mt-24">

                <div className="w-28 h-28 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-5xl text-cyan-400 mx-auto">

                  <FaBriefcase />

                </div>

                <h2 className="text-3xl font-black mt-8">

                  No Jobs Found

                </h2>

                <p className="text-gray-400 mt-3 text-lg">

                  Upload your first job now.

                </p>

              </div>

            )}

          </>
        )}

      </div>

    </div>
  );
}

export default MyJobs;