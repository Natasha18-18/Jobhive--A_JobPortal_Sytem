import { useState, useEffect } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaFilePdf,
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
} from "react-icons/fa";

function ApplicantDetails() {

  const navigate = useNavigate();

  const { id } = useParams();

  // =========================
  // STATES
  // =========================

  const [applicant, setApplicant] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [status, setStatus] =
    useState("Pending");

  // =========================
  // FETCH APPLICANT
  // =========================

  useEffect(() => {

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

    fetchApplicant();

  }, [id]);

  // =========================
  // UPDATE STATUS
  // =========================

  const updateStatus =
    async (newStatus) => {

      try {

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

        toast.success(
          res.data.message
        );

        setStatus(newStatus);

      } catch (error) {

        console.log(error);

        toast.error(
          "Status update failed"
        );

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

      {/* BG EFFECTS */}
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
            duration: 0.6,
          }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl"
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

                  <p className="text-cyan-400 mt-2">

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
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >

                    {status}

                  </span>

                </div>

              </div>

            </div>

            {/* RIGHT */}
            <div className="lg:w-2/3 space-y-8">

              {/* INFO GRID */}
              <div className="grid md:grid-cols-2 gap-5">

                {/* EMAIL */}
                <div className="bg-[#0b1120] rounded-3xl p-5 border border-white/10 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xl">

                    <FaEnvelope />

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">
                      Email
                    </p>

                    <h3 className="font-semibold">

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

                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl">

                    <FaPhone />

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

                {/* APPLIED DATE */}
                <div className="bg-[#0b1120] rounded-3xl p-5 border border-white/10 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl">

                    <FaUserTie />

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">
                      Applied Date
                    </p>

                    <h3 className="font-semibold">

                      {new Date(
                        applicant.createdAt
                      ).toLocaleDateString()}

                    </h3>

                  </div>

                </div>

                {/* JOB */}
                <div className="bg-[#0b1120] rounded-3xl p-5 border border-white/10 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 text-green-400 flex items-center justify-center text-xl">

                    <FaBriefcase />

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

              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-5">

                {/* RESUME */}
                {applicant
                  ?.applicant
                  ?.resume && (
                  <>
                    <motion.a
                      whileHover={{
                        scale: 1.05,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
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

                    </motion.a>

                    <motion.a
                      whileHover={{
                        scale: 1.05,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                      href={
                        applicant
                          ?.applicant
                          ?.resume
                      }
                      download
                      className="px-7 py-4 rounded-2xl bg-white/10 border border-white/10 font-semibold flex items-center gap-3 hover:border-cyan-400/40 transition"
                    >

                      <FaDownload />

                      Download CV

                    </motion.a>
                  </>
                )}

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
                      "Accepted"
                    )
                  }
                  className="px-7 py-4 rounded-2xl bg-green-500 text-white font-semibold flex items-center gap-3 shadow-xl"
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
                      "Rejected"
                    )
                  }
                  className="px-7 py-4 rounded-2xl bg-red-500 text-white font-semibold flex items-center gap-3 shadow-xl"
                >

                  <FaTimesCircle />

                  Reject

                </motion.button>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default ApplicantDetails;