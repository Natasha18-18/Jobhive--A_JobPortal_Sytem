import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import Heroimg from "../assets/heroimg.jpg"

import {
  FaSearch,
  FaBriefcase,
  FaUsers,
  FaStar,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] pt-28 pb-20 text-white">

      {/* BACKGROUND EFFECT */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-blue-600/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center relative z-10">

        {/* LEFT */}
        <motion.div
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >

          {/* BADGE */}
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/10 backdrop-blur-xl px-5 py-2.5 rounded-full">

            <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse"></div>

            <span className="text-cyan-300 text-sm font-semibold tracking-wide">

              AI Powered Hiring Platform

            </span>

          </div>

          {/* TITLE */}
          <h1 className="mt-8 text-4xl md:text-6xl font-black leading-[1.1]">

            Find Your

            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">

              Dream Job

            </span>

            Faster & Smarter

          </h1>

          {/* DESC */}
          <p className="mt-6 text-base md:text-lg text-gray-300 leading-relaxed max-w-xl">

            Discover premium opportunities, connect with top
            companies, and grow your career using our modern
            recruitment platform.

          </p>

          {/* FEATURES */}
          <div className="mt-7 flex flex-wrap gap-5">

            {[
              "10K+ Jobs",
              "5000+ Companies",
              "Remote Work",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-300"
              >

                <FaCheckCircle className="text-cyan-400 text-sm" />

                <span className="text-sm">
                  {item}
                </span>

              </div>
            ))}

          </div>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-4">

            <motion.div
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
            >

              <Link
                to="/login"
                className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 rounded-2xl font-semibold shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300"
              >

                Get Started

                <FaArrowRight className="text-sm" />

              </Link>

            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
            >

              <Link
                to="/jobs"
                className="bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 px-7 py-3.5 rounded-2xl font-semibold transition-all duration-300"
              >

                Explore Jobs

              </Link>

            </motion.div>

          </div>

          {/* SEARCH */}
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
              delay: 0.3,
            }}
            className="mt-12 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[28px] p-4 shadow-2xl max-w-2xl"
          >

            <div className="flex flex-col md:flex-row gap-4">

              <div className="flex items-center flex-1 gap-3 bg-[#111827]/70 border border-white/5 px-5 py-3.5 rounded-2xl">

                <FaSearch className="text-cyan-400" />

                <input
                  type="text"
                  placeholder="Search jobs, companies..."
                  className="bg-transparent outline-none w-full text-white placeholder:text-gray-400"
                />

              </div>

              <button className="bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 rounded-2xl font-semibold hover:opacity-90 transition-all duration-300">

                Search

              </button>

            </div>

          </motion.div>

          {/* STATS */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-xl">

            {[
              {
                num: "10K+",
                label: "Jobs",
              },
              {
                num: "5K+",
                label: "Companies",
              },
              {
                num: "20K+",
                label: "Candidates",
              },
            ].map((item, index) => (
              <div key={index}>

                <h2 className="text-3xl md:text-4xl font-black text-white">

                  {item.num}

                </h2>

                <p className="mt-2 text-gray-400 text-sm">

                  {item.label}

                </p>

              </div>
            ))}

          </div>

        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{
            opacity: 0,
            x: 50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative flex justify-center"
        >

          {/* IMAGE */}
          <div className="relative w-full max-w-[500px]">

            <img
              src={Heroimg}
              alt="hero"
              className="w-full h-[560px] object-cover rounded-[35px] border border-white/10 shadow-2xl"
            />

            <div className="absolute inset-0 rounded-[35px] bg-gradient-to-t from-[#050816]/70 via-transparent to-transparent"></div>

          </div>

          {/* CARD 1 */}
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute top-8 -left-4 bg-white/10 backdrop-blur-2xl border border-white/10 px-5 py-4 rounded-3xl shadow-2xl"
          >

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-xl">

                <FaUsers />

              </div>

              <div>

                <h3 className="text-2xl font-bold text-black">
                  5K+
                </h3>

                <p className="text-sm text-black">
                  Hiring Companies
                </p>

              </div>

            </div>

          </motion.div>

          {/* CARD 2 */}
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute bottom-6 -right-4 bg-white/10 backdrop-blur-2xl border border-white/10 p-5 rounded-3xl shadow-2xl w-[240px]"
          >

            <div className="flex gap-1 text-yellow-400 text-sm">

              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />

            </div>

            <h3 className="mt-4 text-2xl font-bold">

              UI/UX Designer

            </h3>

            <p className="mt-1 text-sm text-gray-300">

              Remote • Full Time

            </p>

            <button className="mt-5 w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-3 rounded-2xl font-semibold hover:opacity-90 transition">

              Apply Now

            </button>

          </motion.div>

          {/* CARD 3 */}
          <motion.div
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute left-14 bottom-28 bg-[#0f172a]/90 backdrop-blur-2xl border border-white/10 px-5 py-4 rounded-3xl shadow-2xl"
          >

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-lg">

                <FaBriefcase />

              </div>

              <div>

                <h3 className="text-xl font-bold">
                  95%
                </h3>

                <p className="text-sm text-gray-300">
                  Success Rate
                </p>

              </div>

            </div>

          </motion.div>

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;