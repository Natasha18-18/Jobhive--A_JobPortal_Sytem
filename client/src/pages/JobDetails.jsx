import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaArrowRight,
  FaBookmark,
  FaShareAlt,
  FaBuilding,
  FaUsers,
  FaGlobe,
  FaBriefcase,
  FaFire,
  FaBolt,
  FaStar,
} from "react-icons/fa";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import toast from "react-hot-toast";

function JobDetail() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [job, setJob] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saved, setSaved] =
    useState(false);

  const [applyLoading, setApplyLoading] =
    useState(false);

  const [applied, setApplied] =
    useState(false);

  // =========================
  // FETCH JOB
  // =========================

  useEffect(() => {

    fetchJob();

  }, []);

  const fetchJob = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5002/api/jobs/${id}`
      );

      if (res.data.success) {

        setJob(res.data.job);

        checkSavedStatus(
          res.data.job._id
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

  // =========================
  // CHECK SAVED STATUS
  // =========================

  const checkSavedStatus =
    async (jobId) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) return;

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

          const exists =
            res.data.jobs.some(
              (item) =>
                item.jobId ===
                jobId
            );

          setSaved(exists);

        }

      } catch (error) {

        console.log(error);

      }

    };

  // =========================
  // SAVE JOB
  // =========================

  const handleSaveJob =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          toast.error(
            "Please login first"
          );

          navigate("/login");

          return;

        }

        // REMOVE SAVE
        if (saved) {

          await axios.delete(
            `http://localhost:5002/api/saved/remove/${job._id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

          setSaved(false);

          toast.success(
            "Removed from saved jobs"
          );

        }

        // SAVE JOB
        else {

          await axios.post(
            "http://localhost:5002/api/saved/save",
            {
              jobId: job._id,
              title: job.title,
              company: job.company,
              location: job.location,
              salary: job.salary,
              type: job.type,
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

          setSaved(true);

          toast.success(
            "Job saved successfully"
          );

        }

      } catch (error) {

        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Something went wrong"
        );

      }

    };

  // =========================
  // APPLY JOB
  // =========================

  const handleApply =
    async () => {

      try {

        setApplyLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          toast.error(
            "Please login first"
          );

          navigate("/login");

          return;

        }

        const res =
          await axios.post(
            `http://localhost:5002/api/application/apply/${id}`,
            {},
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        if (res.data.success) {

          toast.success(
            res.data.message
          );

          setApplied(true);

        }

      }

      catch (error) {

        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Application failed"
        );

      }

      finally {

        setApplyLoading(false);

      }

    };

  // =========================
  // SHARE
  // =========================

  const handleShare = async () => {

    try {

      await navigator.share({
        title: job?.title,
        text:
          `Check out this job at ${job?.company}`,
        url:
          window.location.href,
      });

    }

    catch (error) {

      console.log(error);

    }

  };

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="min-h-screen bg-[#050816] flex items-center justify-center overflow-hidden">

        <div className="relative">

          <div className="w-28 h-28 border-[6px] border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin"></div>

          <div className="absolute inset-0 flex items-center justify-center text-cyan-300 font-semibold">

            Loading

          </div>

        </div>

      </div>
    );
  }

  return (

    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#030712] via-[#071120] to-[#0f172a] pt-28 pb-20 px-5">

      {/* BG EFFECTS */}

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-3xl rounded-full"></div>

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]"></div>

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}

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
          className="lg:col-span-2"
        >

          {/* HERO CARD */}

          <div className="relative overflow-hidden bg-white/5 border border-white/10 rounded-[35px] backdrop-blur-2xl shadow-[0_0_60px_rgba(0,255,255,0.08)] p-8 md:p-12">

            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>

            {/* BADGES */}

            <div className="flex flex-wrap items-center gap-4 relative z-10">

              <span className="px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm font-semibold">

                {job?.type}

              </span>

              <span className="px-5 py-2 rounded-full bg-orange-500/10 border border-orange-400/20 text-orange-300 text-sm font-semibold flex items-center gap-2">

                <FaBolt />

                Urgent Hiring

              </span>

            </div>

            {/* TITLE */}

            <div className="mt-8 relative z-10">

              <h1 className="text-4xl md:text-6xl leading-tight font-black text-white">

                {job?.title}

              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-gray-300">

                <div className="flex items-center gap-2">

                  <FaBuilding className="text-cyan-400" />

                  {job?.company}

                </div>

                <div className="w-2 h-2 rounded-full bg-gray-500"></div>

                <div className="flex items-center gap-2">

                  <FaMapMarkerAlt className="text-cyan-400" />

                  {job?.location}

                </div>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="mt-10 flex flex-wrap gap-4 relative z-10">

              {/* APPLY BUTTON */}

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={handleApply}
                disabled={
                  applyLoading ||
                  applied
                }
                className={`px-8 py-4 rounded-2xl text-white font-semibold flex items-center gap-3 shadow-2xl transition-all duration-300 ${
                  applied
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-cyan-500/20"
                }`}
              >

                {
                  applyLoading
                    ? "Applying..."
                    : applied
                    ? "Applied Successfully"
                    : "Apply Now"
                }

                <FaArrowRight />

              </motion.button>

              {/* SAVE */}

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={handleSaveJob}
                className={`px-7 py-4 rounded-2xl border flex items-center gap-3 font-semibold transition-all duration-300 ${
                  saved
                    ? "bg-cyan-500 text-white border-cyan-400"
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                }`}
              >

                <FaBookmark />

                {
                  saved
                    ? "Saved"
                    : "Save Job"
                }

              </motion.button>

              {/* SHARE */}

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={handleShare}
                className="px-7 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center gap-3 font-semibold transition-all duration-300"
              >

                <FaShareAlt />

                Share

              </motion.button>

            </div>

          </div>

          {/* INFO CARDS */}

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <motion.div
              whileHover={{
                y: -5,
              }}
              className="bg-white/5 border border-white/10 rounded-[30px] p-6 backdrop-blur-xl"
            >

              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-2xl">

                <FaMoneyBillWave />

              </div>

              <p className="mt-5 text-gray-400">

                Salary

              </p>

              <h3 className="mt-2 text-2xl font-bold text-white">

                {job?.salary}

              </h3>

            </motion.div>

            <motion.div
              whileHover={{
                y: -5,
              }}
              className="bg-white/5 border border-white/10 rounded-[30px] p-6 backdrop-blur-xl"
            >

              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-2xl">

                <FaClock />

              </div>

              <p className="mt-5 text-gray-400">

                Experience

              </p>

              <h3 className="mt-2 text-2xl font-bold text-white">

                {job?.experience}

              </h3>

            </motion.div>

            <motion.div
              whileHover={{
                y: -5,
              }}
              className="bg-white/5 border border-white/10 rounded-[30px] p-6 backdrop-blur-xl"
            >

              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-2xl">

                <FaBriefcase />

              </div>

              <p className="mt-5 text-gray-400">

                Job Type

              </p>

              <h3 className="mt-2 text-2xl font-bold text-white">

                {job?.type}

              </h3>

            </motion.div>

          </div>

          {/* DESCRIPTION */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="mt-8 bg-white/5 border border-white/10 rounded-[35px] p-8 md:p-10 backdrop-blur-2xl"
          >

            <div className="flex items-center gap-3">

              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-2xl">

                <FaFire />

              </div>

              <div>

                <h2 className="text-3xl font-bold text-white">

                  Job Description

                </h2>

                <p className="text-gray-400 mt-1">

                  Complete overview about this opportunity

                </p>

              </div>

            </div>

            <p className="mt-8 text-gray-300 leading-relaxed text-lg">

              {job?.description}

            </p>

          </motion.div>

        </motion.div>

        {/* RIGHT SIDE */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="space-y-8"
        >

          <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-2xl shadow-2xl sticky top-28 overflow-hidden">

            <div className="absolute top-0 right-0 w-52 h-52 bg-cyan-500/10 blur-3xl rounded-full"></div>

            <div className="relative z-10">

              <div className="w-24 h-24 rounded-[30px] bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-4xl shadow-2xl">

                <FaBuilding />

              </div>

              <h2 className="mt-6 text-3xl font-black text-white leading-tight">

                {job?.company}

              </h2>

              <p className="mt-3 text-gray-400 leading-relaxed">

                Join one of the fastest growing companies and build your future with amazing opportunities.

              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4">

                  <div className="flex items-center gap-3 text-gray-300">

                    <FaUsers className="text-cyan-400" />

                    Team Size

                  </div>

                  <span className="text-white font-semibold">

                    100+

                  </span>

                </div>

                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4">

                  <div className="flex items-center gap-3 text-gray-300">

                    <FaGlobe className="text-cyan-400" />

                    Work Mode

                  </div>

                  <span className="text-white font-semibold">

                    Hybrid

                  </span>

                </div>

                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4">

                  <div className="flex items-center gap-3 text-gray-300">

                    <FaStar className="text-cyan-400" />

                    Rating

                  </div>

                  <span className="text-white font-semibold">

                    4.8/5

                  </span>

                </div>

              </div>

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={handleApply}
                disabled={
                  applyLoading ||
                  applied
                }
                className={`mt-8 w-full py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-3 shadow-2xl transition-all duration-300 ${
                  applied
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-cyan-500/20"
                }`}
              >

                {
                  applyLoading
                    ? "Applying..."
                    : applied
                    ? "Applied Successfully"
                    : "Apply For This Job"
                }

                <FaArrowRight />

              </motion.button>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default JobDetail;