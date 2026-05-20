import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import toast from "react-hot-toast";

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
  FaVideo,
  FaPhone,
  FaFilePdf,
  FaArrowLeft,
  FaBriefcase,
} from "react-icons/fa";

function Applicants() {

  const navigate = useNavigate();

  const { id } = useParams();

  // =========================
  // STATES
  // =========================

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState("");

  // =========================
  // FETCH APPLICANTS
  // =========================

  useEffect(() => {

    fetchApplicants();

  }, [id]);

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
    currentStatus,
    newStatus
  ) => {

    if (
      currentStatus === "Accepted" ||
      currentStatus === "Rejected" ||
      currentStatus === "Deleted"
    ) {

      return toast.error(
        `Application already ${currentStatus}`
      );

    }

    try {

      setActionLoading(applicationId);

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.put(
          `http://localhost:5002/api/application/status/${applicationId}`,
          {
            status: newStatus,
          },
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
                status: newStatus,
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

    } finally {

      setActionLoading("");

    }

  };

  // =========================
  // DELETE APPLICATION
  // =========================

  const deleteApplication =
    async (
      applicationId,
      currentStatus
    ) => {

      if (
        currentStatus === "Accepted" ||
        currentStatus === "Rejected" ||
        currentStatus === "Deleted"
      ) {

        return toast.error(
          `Application already ${currentStatus}`
        );

      }

      const confirmDelete =
        window.confirm(
          "Delete this application?"
        );

      if (!confirmDelete) return;

      try {

        setActionLoading(applicationId);

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
          prev.map((app) =>
            app._id === applicationId
              ? {
                  ...app,
                  status: "Deleted",
                }
              : app
          )
        );

      } catch (error) {

        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Delete failed"
        );

      } finally {

        setActionLoading("");

      }

    };

  // =========================
  // STATUS STYLE
  // =========================

  const getStatusStyle = (
    status
  ) => {

    switch (status) {

      case "Accepted":
        return "bg-green-500/15 text-green-400 border border-green-500/20";

      case "Rejected":
        return "bg-red-500/15 text-red-400 border border-red-500/20";

      case "Deleted":
        return "bg-gray-500/15 text-gray-300 border border-gray-500/20";

      default:
        return "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20";

    }

  };

  return (

    <div className="min-h-screen bg-[#050816] text-white pt-28 pb-20 px-5 md:px-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >

          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium mb-5">

              <FaBriefcase />

              Recruitment Dashboard

            </div>

            <h1 className="text-4xl md:text-5xl font-black leading-tight">

              Manage Job

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                {" "}
                Applicants

              </span>

            </h1>

            <p className="text-gray-400 mt-3 text-lg">

              Review applications, resumes and hiring status.

            </p>

          </div>

          <button
            onClick={() =>
              navigate(-1)
            }
            className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/30 hover:bg-white/10 transition duration-300 w-fit"
          >

            <FaArrowLeft />

            Back

          </button>

        </motion.div>

        {/* LOADING */}

        {loading ? (

          <div className="flex justify-center items-center h-[400px]">

            <FaSpinner className="animate-spin text-5xl text-cyan-400" />

          </div>

        ) : (

          <>
            {/* EMPTY */}

            {applications.length ===
            0 ? (

              <div className="mt-24 bg-white/5 border border-white/10 rounded-[30px] p-14 text-center">

                <div className="w-24 h-24 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-4xl text-cyan-400 mx-auto">

                  <FaUser />

                </div>

                <h2 className="text-3xl font-black mt-8">

                  No Applicants Yet

                </h2>

                <p className="text-gray-400 mt-3 text-lg">

                  Applications submitted for this job will appear here.

                </p>

              </div>

            ) : (

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-14">

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
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.95,
                        }}
                        transition={{
                          delay:
                            index * 0.08,
                        }}
                        whileHover={{
                          y: -4,
                        }}
                        className="relative bg-[#0b1120]/90 border border-white/10 rounded-[30px] p-8 overflow-hidden backdrop-blur-xl"
                      >

                        <div className="absolute top-0 right-0 w-52 h-52 bg-cyan-500/10 blur-3xl rounded-full"></div>

                        <div className="relative z-10">

                          {/* TOP */}

                          <div className="flex items-start justify-between gap-5 flex-wrap">

                            <div className="flex-1">

                              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl text-cyan-400 mb-5">

                                <FaUser />

                              </div>

                              <h2 className="text-2xl font-black">

                                {
                                  application
                                    ?.applicant
                                    ?.fullName
                                }

                              </h2>

                              <div className="space-y-3 mt-5">

                                <div className="flex items-center gap-3 text-gray-300">

                                  <FaEnvelope className="text-cyan-400" />

                                  <span className="break-all">

                                    {
                                      application
                                        ?.applicant
                                        ?.email
                                    }

                                  </span>

                                </div>

                                <div className="flex items-center gap-3 text-gray-300">

                                  <FaPhone className="text-cyan-400" />

                                  <span>

                                    {
                                      application
                                        ?.applicant
                                        ?.phone ||
                                      "N/A"
                                    }

                                  </span>

                                </div>

                              </div>

                            </div>

                            <span
                              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap ${getStatusStyle(
                                application.status
                              )}`}
                            >

                              {
                                application.status
                              }

                            </span>

                          </div>

                          {/* ACTIONS */}

                          <div className="flex flex-wrap gap-4 mt-10">

                            {/* VIEW PROFILE */}

                            <motion.button
                              whileHover={{
                                scale: 1.03,
                              }}
                              whileTap={{
                                scale: 0.97,
                              }}
                              onClick={() =>
                                navigate(
                                  `/candidate/profile/${application?.applicant?._id}`
                                )
                              }
                              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition font-semibold"
                            >

                              <FaUser />

                              View Details

                            </motion.button>

                            {/* RESUME */}

                            {application
                              ?.applicant
                              ?.resume && (

                              <a
                                href={
                                  application
                                    ?.applicant
                                    ?.resume
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition font-semibold"
                              >

                                <FaFilePdf />

                                Resume

                              </a>
                            )}

                            {/* ACCEPT */}

                            <motion.button
                              whileHover={{
                                scale: 1.03,
                              }}
                              whileTap={{
                                scale: 0.97,
                              }}
                              disabled={
                                actionLoading ===
                                  application._id ||
                                application.status !==
                                  "Pending"
                              }
                              onClick={() =>
                                updateStatus(
                                  application._id,
                                  application.status,
                                  "Accepted"
                                )
                              }
                              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition font-semibold disabled:opacity-50"
                            >

                              <FaCheckCircle />

                              Accept

                            </motion.button>

                            {/* REJECT */}

                            <motion.button
                              whileHover={{
                                scale: 1.03,
                              }}
                              whileTap={{
                                scale: 0.97,
                              }}
                              disabled={
                                actionLoading ===
                                  application._id ||
                                application.status !==
                                  "Pending"
                              }
                              onClick={() =>
                                updateStatus(
                                  application._id,
                                  application.status,
                                  "Rejected"
                                )
                              }
                              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition font-semibold disabled:opacity-50"
                            >

                              <FaTimesCircle />

                              Reject

                            </motion.button>

                            {/* DELETE */}

                            <motion.button
                              whileHover={{
                                scale: 1.03,
                              }}
                              whileTap={{
                                scale: 0.97,
                              }}
                              disabled={
                                actionLoading ===
                                  application._id ||
                                application.status !==
                                  "Pending"
                              }
                              onClick={() =>
                                deleteApplication(
                                  application._id,
                                  application.status
                                )
                              }
                              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gray-500/10 border border-gray-500/20 text-gray-300 hover:bg-gray-500/20 transition font-semibold disabled:opacity-50"
                            >

                              <FaTrash />

                              Delete

                            </motion.button>

                            {/* INTERVIEW */}

                            {application.status ===
                              "Accepted" && (

                              <motion.button
                                whileHover={{
                                  scale: 1.03,
                                }}
                                whileTap={{
                                  scale: 0.97,
                                }}
                                onClick={() =>
                                  navigate(
                                    `/recruiter/interview/${application._id}`
                                  )
                                }
                                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20"
                              >

                                <FaVideo />

                                Conduct Interview

                              </motion.button>
                            )}

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