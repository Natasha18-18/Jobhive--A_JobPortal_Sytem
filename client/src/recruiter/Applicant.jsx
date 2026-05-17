import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import { useParams } from "react-router-dom";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FaUser,
  FaEnvelope,
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
  FaSpinner,
} from "react-icons/fa";

function Applicants() {

  // =========================
  // PARAMS
  // =========================

  const { id } = useParams();

  // =========================
  // STATES
  // =========================

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH APPLICANTS
  // =========================

  useEffect(() => {

    fetchApplicants();

  }, []);

  const fetchApplicants = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.get(
          `http://localhost:5002/api/application/applicants/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setApplications(
        response.data.applications
      );

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Failed to load applicants"
      );

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // UPDATE STATUS
  // =========================

  const updateStatus = async (
    applicationId,
    status
  ) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.put(
          `http://localhost:5002/api/application/status/${applicationId}`,
          { status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      toast.success(
        response.data.message
      );

      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId
            ? {
                ...app,
                status,
              }
            : app
        )
      );

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Status update failed"
      );

    }

  };

  // =========================
  // DELETE APPLICATION
  // =========================

  const deleteApplication =
    async (applicationId) => {

      const confirmDelete =
        window.confirm(
          "Delete this application?"
        );

      if (!confirmDelete) return;

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.delete(
            `http://localhost:5002/api/application/delete/${applicationId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        toast.success(
          response.data.message
        );

        setApplications((prev) =>
          prev.filter(
            (app) =>
              app._id !==
              applicationId
          )
        );

      } catch (error) {

        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Delete failed"
        );

      }

    };

  return (

    <div className="min-h-screen bg-[#050816] text-white pt-32 pb-20 px-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <h1 className="text-5xl font-black">

            Job

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              {" "}
              Applicants

            </span>

          </h1>

          <p className="text-gray-400 mt-3 text-lg">

            Manage candidates who applied.

          </p>

        </motion.div>

        {/* LOADING */}

        {loading ? (

          <div className="flex justify-center mt-24">

            <FaSpinner className="animate-spin text-5xl text-cyan-400" />

          </div>

        ) : (

          <>
            {/* EMPTY */}

            {applications.length ===
            0 ? (

              <div className="text-center mt-24">

                <div className="w-28 h-28 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-5xl text-cyan-400 mx-auto">

                  <FaUser />

                </div>

                <h2 className="text-3xl font-black mt-8">

                  No Applicants Yet

                </h2>

                <p className="text-gray-400 mt-3 text-lg">

                  Applications will appear here.

                </p>

              </div>

            ) : (

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14">

                <AnimatePresence>

                  {applications.map(
                    (
                      application,
                      index
                    ) => (

                      <motion.div
                        key={
                          application._id
                        }
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
                        className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
                      >

                        {/* GLOW */}

                        <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full"></div>

                        {/* USER */}

                        <div className="relative z-10">

                          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-3xl shadow-2xl">

                            <FaUser />

                          </div>

                          <h2 className="text-2xl font-black mt-6">

                            {
                              application
                                ?.applicant
                                ?.fullName
                            }

                          </h2>

                          <div className="flex items-center gap-3 text-gray-400 mt-3">

                            <FaEnvelope />

                            {
                              application
                                ?.applicant
                                ?.email
                            }

                          </div>

                          {/* STATUS */}

                          <div className="mt-6">

                            <span
                              className={`px-5 py-2 rounded-full text-sm font-bold ${
                                application.status ===
                                "Accepted"
                                  ? "bg-green-500/20 text-green-400"
                                  : application.status ===
                                    "Rejected"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >

                              {
                                application.status
                              }

                            </span>

                          </div>

                          {/* BUTTONS */}

                          <div className="flex flex-wrap gap-4 mt-8">

                            {/* ACCEPT */}

                            <motion.button
                              whileHover={{
                                scale: 1.05,
                              }}
                              whileTap={{
                                scale: 0.95,
                              }}
                              onClick={() =>
                                updateStatus(
                                  application._id,
                                  "Accepted"
                                )
                              }
                              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition font-semibold"
                            >

                              <FaCheckCircle />

                              Accept

                            </motion.button>

                            {/* REJECT */}

                            <motion.button
                              whileHover={{
                                scale: 1.05,
                              }}
                              whileTap={{
                                scale: 0.95,
                              }}
                              onClick={() =>
                                updateStatus(
                                  application._id,
                                  "Rejected"
                                )
                              }
                              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition font-semibold"
                            >

                              <FaTimesCircle />

                              Reject

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
                                deleteApplication(
                                  application._id
                                )
                              }
                              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 border border-white/10 hover:border-red-500 transition font-semibold"
                            >

                              <FaTrash />

                              Delete

                            </motion.button>

                          </div>

                        </div>

                      </motion.div>
                    )
                  )}

                </AnimatePresence>

              </div>

            )}

          </>
        )}

      </div>

    </div>
  );
}

export default Applicants;