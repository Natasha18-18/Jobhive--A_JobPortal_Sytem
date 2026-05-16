import {
  Link,
  useParams,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaArrowRight,
  FaCheckCircle,
  FaBookmark,
  FaShareAlt,
  FaBuilding,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function JobDetail() {

  const { id } = useParams();

  const [job, setJob] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH SINGLE JOB
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

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white text-3xl">

        Loading...

      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] pt-32 pb-20 px-6">

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-2xl shadow-2xl"
        >

          <img
            src={
              job?.image
                ? `http://localhost:5002/uploads/${job.image}`
                : "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            }
            alt={job?.title}
            className="w-full h-[350px] object-cover"
          />

          <div className="p-8 md:p-12">

            {/* TAG */}
            <span className="px-5 py-2 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">

              {job?.type}

            </span>

            {/* TITLE */}
            <h1 className="mt-8 text-5xl font-black text-white">

              {job?.title}

            </h1>

            <p className="mt-4 text-cyan-300 text-2xl font-semibold">

              {job?.company}

            </p>

            {/* INFO */}
            <div className="grid md:grid-cols-3 gap-6 mt-10">

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

                <div className="flex items-center gap-3 text-cyan-400">

                  <FaMapMarkerAlt />

                  Location

                </div>

                <p className="mt-4 text-white font-semibold text-lg">

                  {job?.location}

                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

                <div className="flex items-center gap-3 text-cyan-400">

                  <FaMoneyBillWave />

                  Salary

                </div>

                <p className="mt-4 text-white font-semibold text-lg">

                  {job?.salary}

                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

                <div className="flex items-center gap-3 text-cyan-400">

                  <FaClock />

                  Experience

                </div>

                <p className="mt-4 text-white font-semibold text-lg">

                  {job?.experience}

                </p>

              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="mt-16">

              <h2 className="text-3xl font-bold text-white">

                Job Description

              </h2>

              <p className="mt-6 text-gray-300 leading-relaxed text-lg">

                {job?.description}

              </p>

            </div>

            {/* REQUIREMENTS */}
            <div className="mt-16">

              <h2 className="text-3xl font-bold text-white">

                Requirements

              </h2>

              <div className="mt-8 space-y-5">

                {job?.requirements?.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-4 text-gray-300 text-lg"
                    >

                      <FaCheckCircle className="text-cyan-400" />

                      {item}

                    </div>
                  )
                )}

              </div>

            </div>

            {/* BUTTON */}
            <div className="mt-16">

              <Link to="/apply-job">

                <button className="bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-5 rounded-2xl text-white font-semibold flex items-center gap-3">

                  Apply Now

                  <FaArrowRight />

                </button>

              </Link>

            </div>

          </div>

        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="space-y-8"
        >

          <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-2xl shadow-2xl">

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-3xl">

              <FaBuilding />

            </div>

            <h2 className="mt-6 text-3xl font-bold text-white">

              {job?.company}

            </h2>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default JobDetail;