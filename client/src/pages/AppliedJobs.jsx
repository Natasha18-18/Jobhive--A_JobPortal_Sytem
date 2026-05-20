import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";

import { motion } from "framer-motion";

function AppliedJobs() {

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ONLY ONE CARD OPEN
  const [openStatus, setOpenStatus] =
    useState(null);

  useEffect(() => {

    fetchApplications();

  }, []);

  const fetchApplications =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "http://localhost:5002/api/application/my",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        if (res.data.success) {

          setApplications(
            res.data.applications
          );

        }

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);

      }

    };

  const getStatusColor = (
    status
  ) => {

    const lower =
      status?.toLowerCase();

    if (
      lower === "accepted"
    ) {

      return "text-green-400 bg-green-500/10 border-green-500/20";

    }

    if (
      lower === "rejected"
    ) {

      return "text-red-400 bg-red-500/10 border-red-500/20";

    }

    return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";

  };

  return (

    <section className="min-h-screen bg-[#050816] text-white pt-28 pb-20 px-5">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-5xl font-black">

            Applied Jobs

          </h1>

          <p className="text-gray-400 mt-3">

            Track all your job applications

          </p>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="flex justify-center mt-20">

            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

          </div>

        ) : applications.length === 0 ? (

          /* EMPTY */
          <div className="text-center mt-24">

            <h2 className="text-4xl font-black">

              No Applications Yet

            </h2>

            <p className="text-gray-400 mt-4">

              Start applying for jobs

            </p>

          </div>

        ) : (

          /* APPLICATIONS */
          <div className="grid md:grid-cols-2 gap-8 items-start">

            {applications.map(
              (item, index) => (

                <motion.div
                  key={item._id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.05,
                  }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-xl h-fit"
                >

                  {/* TOP */}
                  <div className="flex items-center justify-between">

                    <div>

                      <h2 className="text-3xl font-black">

                        {
                          item.job?.title
                        }

                      </h2>

                      <p className="text-cyan-400 mt-2 font-semibold">

                        {
                          item.job?.company
                        }

                      </p>

                    </div>

                    <div
                      className={`px-4 py-2 rounded-full border text-sm font-semibold capitalize ${getStatusColor(
                        item.status
                      )}`}
                    >

                      {item.status}

                    </div>

                  </div>

                  {/* INFO */}
                  <div className="mt-8 space-y-5 text-gray-300">

                    <div className="flex items-center gap-4">

                      <FaMapMarkerAlt className="text-cyan-400" />

                      <span>

                        {
                          item.job
                            ?.location
                        }

                      </span>

                    </div>

                    <div className="flex items-center gap-4">

                      <FaBriefcase className="text-cyan-400" />

                      <span>

                        {
                          item.job?.type
                        }

                      </span>

                    </div>

                    <div className="flex items-center gap-4">

                      <FaClock className="text-cyan-400" />

                      <span>

                        Applied Successfully

                      </span>

                    </div>

                  </div>

                  {/* TRACK BUTTON */}
                  <button
                    onClick={() =>
                      setOpenStatus(
                        openStatus ===
                          index
                          ? null
                          : index
                      )
                    }
                    className="mt-8 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition-all duration-300 text-white py-3 rounded-2xl font-semibold"
                  >

                    Track Status

                    {openStatus ===
                    index ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}

                  </button>

                  {/* STATUS BOX */}
                  {openStatus ===
                    index && (

                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-5"
                    >

                      <h3 className="text-xl font-bold mb-6">

                        Application Progress

                      </h3>

                      <div className="space-y-6">

                        {/* APPLIED */}
                        <div className="flex items-start gap-4">

                          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">

                            <FaCheckCircle />

                          </div>

                          <div>

                            <h4 className="font-semibold">

                              Applied Successfully

                            </h4>

                            <p className="text-sm text-gray-400">

                              Your application was submitted successfully

                            </p>

                          </div>

                        </div>

                        {/* REVIEW */}
                        <div className="flex items-start gap-4">

                          <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">

                            <FaHourglassHalf />

                          </div>

                          <div>

                            <h4 className="font-semibold">

                              Under Review

                            </h4>

                            <p className="text-sm text-gray-400">

                              Recruiter is reviewing your profile

                            </p>

                          </div>

                        </div>

                        {/* FINAL STATUS */}
                        <div className="flex items-start gap-4">

                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              item.status?.toLowerCase() ===
                              "accepted"
                                ? "bg-green-500/20 text-green-400"
                                : item.status?.toLowerCase() ===
                                  "rejected"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >

                            {item.status?.toLowerCase() ===
                            "accepted" ? (
                              <FaCheckCircle />
                            ) : item.status?.toLowerCase() ===
                              "rejected" ? (
                              <FaTimesCircle />
                            ) : (
                              <FaHourglassHalf />
                            )}

                          </div>

                          <div>

                            <h4 className="font-semibold capitalize">

                              {item.status}

                            </h4>

                            <p className="text-sm text-gray-400">

                              Current application status

                            </p>

                          </div>

                        </div>

                        {/* INTERVIEW */}
                        {item.interviewScheduled && (

                          <div className="flex items-start gap-4">

                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">

                              <FaClock />

                            </div>

                            <div>

                              <h4 className="font-semibold">

                                Interview Scheduled

                              </h4>

                              <p className="text-sm text-gray-400">

                                Your interview has been scheduled

                              </p>

                              <div className="mt-3 inline-block px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">

                                {
                                  item.interviewDate
                                }

                              </div>

                            </div>

                          </div>

                        )}

                      </div>

                    </motion.div>

                  )}

                </motion.div>

              )
            )}

          </div>

        )}

      </div>

    </section>

  );

}

export default AppliedJobs;