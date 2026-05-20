import { useState, useEffect } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaFilePdf,
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
  FaTrash,
  FaVideo,
  FaEye,
  FaMapMarkerAlt,
  FaGlobe,
  FaLinkedin,
  FaGraduationCap,
  FaTools,
  FaBuilding,
} from "react-icons/fa";

function ApplicantDetails() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [applicant, setApplicant] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [status, setStatus] =
    useState("Pending");

  const [actionLoading, setActionLoading] =
    useState(false);

  // =========================
  // FETCH APPLICANT
  // =========================

  useEffect(() => {

    fetchApplicant();

  }, [id]);

  const fetchApplicant =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            `http://localhost:5002/api/application/single/${id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setApplicant(
          res.data.application
        );

        setStatus(
          res.data.application
            .status
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load applicant"
        );

      } finally {

        setLoading(false);

      }

    };

  // =========================
  // UPDATE STATUS
  // =========================

  const updateStatus =
    async (newStatus) => {

      if (
        status === "Accepted" ||
        status === "Rejected" ||
        status === "Deleted"
      ) {

        return toast.error(
          `Application already ${status}`
        );

      }

      try {

        setActionLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.put(
            `http://localhost:5002/api/application/status/${id}`,
            {
              status: newStatus,
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setStatus(newStatus);

        toast.success(
          res.data.message
        );

      } catch (error) {

        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Status update failed"
        );

      } finally {

        setActionLoading(false);

      }

    };

  // =========================
  // DELETE APPLICATION
  // =========================

  const deleteApplication =
    async () => {

      if (
        status === "Accepted" ||
        status === "Rejected" ||
        status === "Deleted"
      ) {

        return toast.error(
          `Application already ${status}`
        );

      }

      try {

        setActionLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.delete(
            `http://localhost:5002/api/application/delete/${id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setStatus("Deleted");

        toast.success(
          res.data.message
        );

      } catch (error) {

        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Delete failed"
        );

      } finally {

        setActionLoading(false);

      }

    };

  // =========================
  // INTERVIEW INVITE
  // =========================

  const sendInterviewInvite =
    async () => {

      try {

        setActionLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.post(
            `http://localhost:5002/api/application/interview/${id}`,
            {},
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        toast.success(
          res.data.message
        );

      } catch (error) {

        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Interview invite failed"
        );

      } finally {

        setActionLoading(false);

      }

    };

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white text-3xl font-bold">
        Loading...
      </div>
    );

  }

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-32 relative overflow-hidden">

      {/* BG EFFECT */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* BACK BUTTON */}

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() =>
            navigate(-1)
          }
          className="mb-8 flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 border border-white/10 hover:border-cyan-400/40 transition"
        >

          <FaArrowLeft />

          Back

        </motion.button>

        {/* MAIN CARD */}

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
          className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl"
        >

          <div className="flex flex-col lg:flex-row gap-10">

            {/* LEFT */}

            <div className="lg:w-1/3">

              <div className="bg-[#0b1120] rounded-3xl p-6 border border-white/10">

                <img
                  src={
                    applicant
                      ?.applicant
                      ?.profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="profile"
                  className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-cyan-400 shadow-2xl"
                />

                <div className="text-center mt-6">

                  <h1 className="text-3xl font-bold">

                    {
                      applicant
                        ?.applicant
                        ?.fullName
                    }

                  </h1>

                  <p className="text-cyan-400 mt-2 font-medium">

                    Candidate

                  </p>

                </div>

                {/* STATUS */}

                <div className="mt-6 flex justify-center">

                  <span
                    className={`px-5 py-2 rounded-full text-sm font-semibold ${
                      status ===
                      "Accepted"
                        ? "bg-green-500/20 text-green-400"
                        : status ===
                          "Rejected"
                        ? "bg-red-500/20 text-red-400"
                        : status ===
                          "Deleted"
                        ? "bg-gray-500/20 text-gray-300"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >

                    {status}

                  </span>

                </div>

                {/* QUICK ACTION */}

                <div className="mt-8">

                  <Link
                    to={`/candidate/profile/${applicant?.applicant?._id}`}
                    className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition"
                  >

                    <FaEye />

                    View Full Profile

                  </Link>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="lg:w-2/3">

              {/* INFO GRID */}

              <div className="grid md:grid-cols-2 gap-5">

                {/* EMAIL */}

                <div className="bg-[#0b1120] rounded-3xl p-5 border border-white/10 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center">

                    <FaEnvelope className="text-cyan-400 text-xl" />

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">
                      Email
                    </p>

                    <h3 className="font-semibold break-all">

                      {
                        applicant
                          ?.applicant
                          ?.email
                      }

                    </h3>

                  </div>

                </div>

                {/* PHONE */}

                <div className="bg-[#0b1120] rounded-3xl p-5 border border-white/10 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">

                    <FaPhone className="text-blue-400 text-xl" />

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">
                      Phone
                    </p>

                    <h3 className="font-semibold">

                      {
                        applicant
                          ?.applicant
                          ?.phone ||
                        "N/A"
                      }

                    </h3>

                  </div>

                </div>

                {/* JOB */}

                <div className="bg-[#0b1120] rounded-3xl p-5 border border-white/10 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">

                    <FaBriefcase className="text-green-400 text-xl" />

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">
                      Applied Job
                    </p>

                    <h3 className="font-semibold">

                      {
                        applicant
                          ?.job
                          ?.title
                      }

                    </h3>

                  </div>

                </div>

                {/* DATE */}

                <div className="bg-[#0b1120] rounded-3xl p-5 border border-white/10 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center">

                    <FaUserTie className="text-purple-400 text-xl" />

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">
                      Applied Date
                    </p>

                    <h3 className="font-semibold">

                      {new Date(
                        applicant?.createdAt
                      ).toLocaleDateString()}

                    </h3>

                  </div>

                </div>

                {/* LOCATION */}

                <div className="bg-[#0b1120] rounded-3xl p-5 border border-white/10 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center">

                    <FaMapMarkerAlt className="text-pink-400 text-xl" />

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">
                      Location
                    </p>

                    <h3 className="font-semibold">

                      {
                        applicant
                          ?.applicant
                          ?.location ||
                        "N/A"
                      }

                    </h3>

                  </div>

                </div>

                {/* EXPERIENCE */}

                <div className="bg-[#0b1120] rounded-3xl p-5 border border-white/10 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center">

                    <FaGraduationCap className="text-orange-400 text-xl" />

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">
                      Experience
                    </p>

                    <h3 className="font-semibold">

                      {
                        applicant
                          ?.applicant
                          ?.experience ||
                        "N/A"
                      }

                    </h3>

                  </div>

                </div>

              </div>

              {/* SKILLS */}

              {applicant?.applicant
                ?.skills && (

                <div className="mt-8 bg-[#0b1120] rounded-3xl p-6 border border-white/10">

                  <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">

                    <FaTools className="text-cyan-400" />

                    Skills

                  </h2>

                  <div className="flex flex-wrap gap-3">

                    {applicant?.applicant?.skills
                      ?.split(",")
                      ?.map(
                        (
                          skill,
                          index
                        ) => (
                          <span
                            key={index}
                            className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
                          >
                            {skill}
                          </span>
                        )
                      )}

                  </div>

                </div>
              )}

              {/* SOCIAL LINKS */}

              <div className="flex flex-wrap gap-4 mt-8">

                {applicant?.applicant
                  ?.portfolio && (

                  <a
                    href={
                      applicant
                        ?.applicant
                        ?.portfolio
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-3 hover:border-cyan-400/40 transition"
                  >

                    <FaGlobe />

                    Portfolio

                  </a>
                )}

                {applicant?.applicant
                  ?.linkedin && (

                  <a
                    href={
                      applicant
                        ?.applicant
                        ?.linkedin
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-300 flex items-center gap-3"
                  >

                    <FaLinkedin />

                    LinkedIn

                  </a>
                )}

              </div>

              {/* ACTIONS */}

              <div className="flex flex-wrap gap-5 mt-10">

                {/* RESUME */}

                {applicant?.applicant
                  ?.resume && (

                  <>
                    <a
                      href={
                        applicant
                          ?.applicant
                          ?.resume
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold flex items-center gap-3 shadow-xl"
                    >

                      <FaFilePdf />

                      View Resume

                    </a>

                    <a
                      href={
                        applicant
                          ?.applicant
                          ?.resume
                      }
                      download
                      className="px-7 py-4 rounded-2xl bg-white/10 border border-white/10 font-semibold flex items-center gap-3"
                    >

                      <FaDownload />

                      Download CV

                    </a>
                  </>
                )}

                {/* ACCEPT */}

                <button
                  disabled={
                    actionLoading ||
                    status !== "Pending"
                  }
                  onClick={() =>
                    updateStatus(
                      "Accepted"
                    )
                  }
                  className="px-7 py-4 rounded-2xl bg-green-500 text-white font-semibold flex items-center gap-3 disabled:opacity-50"
                >

                  <FaCheckCircle />

                  Accept

                </button>

                {/* REJECT */}

                <button
                  disabled={
                    actionLoading ||
                    status !== "Pending"
                  }
                  onClick={() =>
                    updateStatus(
                      "Rejected"
                    )
                  }
                  className="px-7 py-4 rounded-2xl bg-red-500 text-white font-semibold flex items-center gap-3 disabled:opacity-50"
                >

                  <FaTimesCircle />

                  Reject

                </button>

                {/* DELETE */}

                <button
                  disabled={
                    actionLoading ||
                    status !== "Pending"
                  }
                  onClick={
                    deleteApplication
                  }
                  className="px-7 py-4 rounded-2xl bg-gray-700 text-white font-semibold flex items-center gap-3 disabled:opacity-50"
                >

                  <FaTrash />

                  Delete

                </button>

                {/* INTERVIEW */}

                {status ===
                  "Accepted" && (

                  <button
                    disabled={
                      actionLoading
                    }
                    onClick={
                      sendInterviewInvite
                    }
                    className="px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold flex items-center gap-3"
                  >

                    <FaVideo />

                    Conduct Interview

                  </button>
                )}

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default ApplicantDetails;