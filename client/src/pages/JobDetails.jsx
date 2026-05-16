import { Link } from "react-router-dom";

import { motion } from "framer-motion";

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

function JobDetail() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] pt-32 pb-20 px-6">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-3 gap-10">

        {/* LEFT CONTENT */}
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
            duration: 0.7,
          }}
          className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-2xl shadow-2xl"
        >

          {/* COVER IMAGE */}
          <div className="relative">

            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              alt="job"
              className="w-full h-[350px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent"></div>

          </div>

          <div className="p-8 md:p-12">

            {/* TAGS */}
            <div className="flex flex-wrap items-center gap-4">

              <span className="px-5 py-2 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">

                Full Time

              </span>

              <span className="px-5 py-2 rounded-full bg-white/5 text-gray-300 border border-white/10">

                Remote

              </span>

              <span className="px-5 py-2 rounded-full bg-white/5 text-gray-300 border border-white/10">

                Urgent Hiring

              </span>

            </div>

            {/* TITLE */}
            <h1 className="mt-8 text-4xl md:text-5xl font-black text-white leading-tight">

              Frontend Developer

            </h1>

            <p className="mt-4 text-cyan-300 text-2xl font-semibold">

              Google

            </p>

            {/* JOB INFO */}
            <div className="grid md:grid-cols-3 gap-6 mt-10">

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-cyan-400/30 transition">

                <div className="flex items-center gap-3 text-cyan-400">

                  <FaMapMarkerAlt />

                  Location

                </div>

                <p className="mt-4 text-white font-semibold text-lg">

                  Bangalore, India

                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-cyan-400/30 transition">

                <div className="flex items-center gap-3 text-cyan-400">

                  <FaMoneyBillWave />

                  Salary

                </div>

                <p className="mt-4 text-white font-semibold text-lg">

                  ₹12L - ₹18L

                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-cyan-400/30 transition">

                <div className="flex items-center gap-3 text-cyan-400">

                  <FaClock />

                  Experience

                </div>

                <p className="mt-4 text-white font-semibold text-lg">

                  2+ Years

                </p>

              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="mt-16">

              <h2 className="text-3xl font-bold text-white">

                Job Description

              </h2>

              <p className="mt-6 text-gray-300 leading-relaxed text-lg">

                We are looking for a passionate Frontend Developer
                to build modern, responsive, and high-performance web
                applications using React.js and Tailwind CSS.
                You will collaborate closely with UI/UX designers,
                backend engineers, and product teams to deliver
                exceptional user experiences.

              </p>

            </div>

            {/* RESPONSIBILITIES */}
            <div className="mt-16">

              <h2 className="text-3xl font-bold text-white">

                Responsibilities

              </h2>

              <div className="mt-8 space-y-5">

                {[
                  "Build scalable React.js applications",
                  "Develop reusable UI components",
                  "Optimize apps for performance",
                  "Collaborate with backend developers",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 text-gray-300 text-lg"
                  >

                    <FaCheckCircle className="text-cyan-400" />

                    {item}

                  </div>
                ))}

              </div>

            </div>

            {/* REQUIREMENTS */}
            <div className="mt-16">

              <h2 className="text-3xl font-bold text-white">

                Requirements

              </h2>

              <div className="mt-8 space-y-5">

                {[
                  "Strong knowledge of React.js",
                  "Experience with Tailwind CSS",
                  "Good understanding of REST APIs",
                  "Responsive web development skills",
                  "Git & GitHub knowledge",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 text-gray-300 text-lg"
                  >

                    <FaCheckCircle className="text-cyan-400" />

                    {item}

                  </div>
                ))}

              </div>

            </div>

            {/* BUTTONS */}
            <div className="mt-16 flex flex-wrap gap-5">

              <Link to="/apply-job">

                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-5 rounded-2xl text-white font-semibold shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 flex items-center gap-3"
                >

                  Apply Now

                  <FaArrowRight />

                </motion.button>

              </Link>

              <button className="bg-white/5 border border-white/10 hover:bg-white/10 px-8 py-5 rounded-2xl text-white font-semibold flex items-center gap-3 transition">

                <FaBookmark />

                Save Job

              </button>

              <button className="bg-white/5 border border-white/10 hover:bg-white/10 px-8 py-5 rounded-2xl text-white font-semibold flex items-center gap-3 transition">

                <FaShareAlt />

                Share

              </button>

            </div>

          </div>

        </motion.div>

        {/* RIGHT SIDEBAR */}
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
            duration: 0.8,
          }}
          className="space-y-8"
        >

          {/* COMPANY CARD */}
          <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-2xl shadow-2xl">

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-3xl shadow-2xl">

              <FaBuilding />

            </div>

            <h2 className="mt-6 text-3xl font-bold text-white">

              Google

            </h2>

            <p className="mt-3 text-gray-400 leading-relaxed">

              One of the world's leading technology companies focused
              on innovation, AI, cloud computing, and modern software.

            </p>

            <div className="mt-8 space-y-5">

              <div className="flex items-center gap-4 text-gray-300">

                <FaUsers className="text-cyan-400" />

                10,000+ Employees

              </div>

              <div className="flex items-center gap-4 text-gray-300">

                <FaGlobe className="text-cyan-400" />

                www.google.com

              </div>

            </div>

          </div>

          {/* QUICK INFO */}
          <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-2xl shadow-2xl">

            <h2 className="text-2xl font-bold text-white">

              Quick Details

            </h2>

            <div className="mt-8 space-y-6">

              {[
                ["Job Type", "Full Time"],
                ["Experience", "2+ Years"],
                ["Work Mode", "Remote"],
                ["Salary", "₹12L - ₹18L"],
                ["Posted", "2 Days Ago"],
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-white/5 pb-4"
                >

                  <span className="text-gray-400">
                    {item[0]}
                  </span>

                  <span className="text-white font-semibold">
                    {item[1]}
                  </span>

                </div>
              ))}

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default JobDetail;