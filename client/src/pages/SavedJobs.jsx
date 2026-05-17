import { useEffect, useState } from "react";

import axios from "axios";

import {
  FaBookmark,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaTrash,
} from "react-icons/fa";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

function SavedJobs() {

  const [savedJobs, setSavedJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // =========================
  // FETCH SAVED JOBS
  // =========================

  useEffect(() => {

    fetchSavedJobs();

  }, []);

  const fetchSavedJobs = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5002/api/saved-jobs/${user?._id}`
      );

      if (res.data.success) {

        setSavedJobs(
          res.data.jobs
        );

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // REMOVE SAVED JOB
  // =========================

  const removeSavedJob =
    async (id) => {

      try {

        await axios.delete(
          `http://localhost:5002/api/saved-jobs/${id}`
        );

        setSavedJobs((prev) =>
          prev.filter(
            (job) => job._id !== id
          )
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-28">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">

          <h1 className="text-5xl font-black">

            Saved
            <span className="text-cyan-400">
              {" "}Jobs
            </span>

          </h1>

          <p className="text-gray-400 mt-3">

            Your bookmarked opportunities

          </p>

        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">

            Loading saved jobs...

          </div>
        ) : savedJobs.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-14 text-center">

            <FaBookmark className="text-6xl text-cyan-400 mx-auto mb-6" />

            <h2 className="text-3xl font-bold mb-3">

              No Saved Jobs

            </h2>

            <p className="text-gray-400 mb-8">

              Start saving jobs to access them later

            </p>

            <Link
              to="/jobs"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold"
            >

              Browse Jobs

            </Link>

          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">

            {savedJobs.map(
              (job, index) => (

                <motion.div
                  key={job._id}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.1,
                  }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-cyan-400/40 transition-all duration-300"
                >

                  {/* TOP */}
                  <div className="flex items-start justify-between mb-6">

                    <div>

                      <h2 className="text-2xl font-bold mb-2">

                        {job.title}

                      </h2>

                      <p className="text-cyan-400 font-medium">

                        {job.company}

                      </p>

                    </div>

                    <button
                      onClick={() =>
                        removeSavedJob(
                          job._id
                        )
                      }
                      className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition flex items-center justify-center"
                    >

                      <FaTrash />

                    </button>

                  </div>

                  {/* DETAILS */}
                  <div className="space-y-4 mb-8">

                    <div className="flex items-center gap-3 text-gray-300">

                      <FaMapMarkerAlt className="text-cyan-400" />

                      {job.location}

                    </div>

                    <div className="flex items-center gap-3 text-gray-300">

                      <FaMoneyBillWave className="text-green-400" />

                      ₹ {job.salary}

                    </div>

                    <div className="flex items-center gap-3 text-gray-300">

                      <FaClock className="text-yellow-400" />

                      {job.jobType}

                    </div>

                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-gray-400 line-clamp-3 mb-8">

                    {job.description}

                  </p>

                  {/* ACTIONS */}
                  <div className="flex gap-4">

                    <Link
                      to={`/jobs/${job.jobId}`}
                      className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-center font-semibold hover:scale-[1.02] transition"
                    >

                      View Job

                    </Link>

                    <Link
                      to="/apply-job"
                      state={{
                        job,
                      }}
                      className="flex-1 py-4 rounded-2xl border border-cyan-400/30 text-cyan-400 text-center font-semibold hover:bg-cyan-400/10 transition"
                    >

                      Apply

                    </Link>

                  </div>

                </motion.div>
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default SavedJobs;