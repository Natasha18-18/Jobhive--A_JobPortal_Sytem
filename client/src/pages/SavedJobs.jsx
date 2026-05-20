import { useEffect, useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import {
  FaBookmark,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaTrash,
} from "react-icons/fa";

function SavedJobs() {

  const [savedJobs, setSavedJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH SAVED JOBS
  // =========================

  useEffect(() => {

    fetchSavedJobs();

  }, []);

  const fetchSavedJobs =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          setLoading(false);

          return;

        }

        const res =
          await axios.get(
            "http://localhost:5002/api/saved/all",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        if (res.data.success) {

          // SAVE FULL OBJECTS
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
    async (jobId) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(
          `http://localhost:5002/api/saved/remove/${jobId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setSavedJobs((prev) =>

          prev.filter(
            (job) =>
              job.jobId !==
              jobId
          )

        );

      } catch (err) {

        console.log(err);

      }

    };

  return (

    <section className="min-h-screen bg-[#050816] text-white px-6 pt-28 pb-20">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-12">

          <h1 className="text-5xl font-black">

            Saved{" "}

            <span className="text-cyan-400">

              Jobs

            </span>

          </h1>

          <p className="text-gray-400 mt-3">

            All your bookmarked opportunities in one place

          </p>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="flex justify-center mt-24">

            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

          </div>

        ) : savedJobs.length === 0 ? (

          <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-3xl p-16 text-center">

            <FaBookmark className="text-6xl text-cyan-400 mb-6" />

            <h2 className="text-3xl font-bold">

              No Saved Jobs Yet

            </h2>

            <p className="text-gray-400 mt-3 max-w-md">

              Save jobs you like so you can apply later without losing them.

            </p>

            <Link
              to="/jobs"
              className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold hover:scale-105 transition"
            >

              Browse Jobs

            </Link>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-8">

            {savedJobs.map(
              (job, index) => (

                <motion.div
                  key={job.jobId}
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
                      index * 0.05,
                  }}
                  className="relative bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-cyan-400/40 transition"
                >

                  {/* DELETE BUTTON */}

                  <button
                    onClick={() =>
                      removeSavedJob(
                        job.jobId
                      )
                    }
                    className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center"
                  >

                    <FaTrash />

                  </button>

                  {/* BADGES */}

                  <div className="flex items-center gap-3 mb-5">

                    <span className="px-4 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-sm">

                      Saved Job

                    </span>

                    <span className="px-4 py-1 rounded-full bg-yellow-500/10 text-yellow-300 text-sm">

                      Active

                    </span>

                  </div>

                  {/* TITLE */}

                  <h2 className="text-2xl font-bold">

                    {job.title}

                  </h2>

                  <p className="text-cyan-400 font-medium mt-1">

                    {job.company}

                  </p>

                  {/* DETAILS */}

                  <div className="mt-6 space-y-4 text-gray-300">

                    <div className="flex items-center gap-3">

                      <FaMapMarkerAlt className="text-cyan-400" />

                      {job.location || "Remote"}

                    </div>

                    <div className="flex items-center gap-3">

                      <FaMoneyBillWave className="text-green-400" />

                      {job.salary || "Negotiable"}

                    </div>

                    <div className="flex items-center gap-3">

                      <FaClock className="text-yellow-400" />

                      {job.type || "Full-Time"}

                    </div>

                  </div>

                  {/* DESCRIPTION */}

                  <p className="text-gray-400 mt-5 line-clamp-3">

                    {
                      job.description ||
                      "No description available."
                    }

                  </p>

                  {/* ACTIONS */}

                  <div className="flex gap-4 mt-8">

                    {
                      job.external ? (

                        <a
                          href={job.redirect_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-center font-semibold hover:scale-105 transition"
                        >

                          Apply Now

                        </a>

                      ) : (

                        <Link
                          to={`/jobs/${job.jobId}`}
                          className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-center font-semibold hover:scale-105 transition"
                        >

                          View Job

                        </Link>

                      )
                    }

                    <button
                      onClick={() =>
                        removeSavedJob(
                          job.jobId
                        )
                      }
                      className="px-6 py-4 rounded-2xl border border-red-400/30 text-red-400 hover:bg-red-400/10 transition"
                    >

                      Remove

                    </button>

                  </div>

                </motion.div>

              )
            )}

          </div>

        )}

      </div>

    </section>

  );

}

export default SavedJobs;