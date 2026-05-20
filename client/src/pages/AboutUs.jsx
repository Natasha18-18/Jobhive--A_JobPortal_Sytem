import { motion } from "framer-motion";

import {
  FaBriefcase,
  FaUsers,
  FaRocket,
  FaShieldAlt,
  FaGlobe,
  FaChartLine,
  FaCheckCircle,
  FaArrowRight,
  FaStar,
  FaLaptopCode,
  FaBuilding,
  FaUserTie,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function About() {

  const stats = [
    {
      number: "10K+",
      title: "Active Jobs",
      icon: <FaBriefcase />,
    },
    {
      number: "5K+",
      title: "Companies",
      icon: <FaBuilding />,
    },
    {
      number: "20K+",
      title: "Candidates",
      icon: <FaUsers />,
    },
    {
      number: "95%",
      title: "Success Rate",
      icon: <FaChartLine />,
    },
  ];

  const features = [
    {
      icon: <FaRocket />,
      title: "Fast Hiring",
      desc: "AI-powered recruitment system that helps companies hire top talent faster.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Platform",
      desc: "Advanced authentication and secure application management for all users.",
    },
    {
      icon: <FaGlobe />,
      title: "Remote Opportunities",
      desc: "Access global remote jobs and international career opportunities easily.",
    },
    {
      icon: <FaChartLine />,
      title: "Career Growth",
      desc: "Track applications, build professional profiles, and grow your career.",
    },
  ];

  const perks = [
    "AI Powered Recruitment",
    "Trusted By Top Companies",
    "Global Hiring Network",
    "24/7 Support System",
  ];

  return (

    <section className="relative overflow-hidden bg-[#030712] text-white">

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24">

        {/* HERO */}

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
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

            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-cyan-400/20 bg-cyan-500/10 text-cyan-300 text-sm font-semibold backdrop-blur-xl">

              <FaStar />

              Modern AI Hiring Platform

            </div>

            {/* TITLE */}

            <h1 className="mt-8 text-5xl md:text-7xl font-black leading-[1.1]">

              Transforming

              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">

                The Future Of Hiring

              </span>

            </h1>

            {/* DESCRIPTION */}

            <p className="mt-8 text-lg text-gray-300 leading-relaxed max-w-2xl">

              Our Job Portal connects talented professionals with
              top companies worldwide using modern AI-powered recruitment,
              seamless hiring workflows, and a secure digital experience.

            </p>

            {/* PERKS */}

            <div className="mt-10 grid sm:grid-cols-2 gap-5">

              {perks.map((item, index) => (

                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-xl hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300"
                >

                  <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white">

                    <FaCheckCircle />

                  </div>

                  <span className="text-gray-200 font-medium">

                    {item}

                  </span>

                </motion.div>

              ))}

            </div>

            {/* BUTTONS */}

            <div className="mt-12 flex flex-wrap gap-5">

              <Link
                to="/jobs"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-2xl font-semibold shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:scale-[1.03] transition-all duration-300"
              >

                Explore Jobs

                <FaArrowRight className="group-hover:translate-x-1 transition-all duration-300" />

              </Link>

              <Link
                to="/companies"
                className="inline-flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/20 px-8 py-4 rounded-2xl font-semibold transition-all duration-300"
              >

                View Companies

              </Link>

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
            transition={{
              duration: 0.7,
            }}
            className="relative"
          >

            {/* IMAGE */}

            <div className="relative overflow-hidden rounded-[40px] border border-white/10">

              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400&auto=format&fit=crop"
                alt="about"
                className="w-full h-[650px] object-cover hover:scale-105 transition-all duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/20 to-transparent"></div>

            </div>

            {/* FLOAT CARD 1 */}

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute top-10 -left-8 bg-[#0f172a]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-2xl"
            >

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-2xl">

                  <FaUsers />

                </div>

                <div>

                  <h2 className="text-2xl font-black">

                    20K+

                  </h2>

                  <p className="text-gray-300 text-sm">

                    Active Candidates

                  </p>

                </div>

              </div>

            </motion.div>

            {/* FLOAT CARD 2 */}

            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="absolute bottom-10 -right-5 bg-[#0f172a]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-2xl"
            >

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">

                  <FaUserTie />

                </div>

                <div>

                  <h2 className="text-2xl font-black">

                    5K+

                  </h2>

                  <p className="text-gray-300 text-sm">

                    Recruiters Hiring

                  </p>

                </div>

              </div>

            </motion.div>

          </motion.div>

        </div>

      </div>

      {/* STATS */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                y: -8,
              }}
              className="bg-white/5 border border-white/10 rounded-[30px] p-8 backdrop-blur-2xl hover:border-cyan-400/20 hover:bg-white/10 transition-all duration-500"
            >

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-2xl">

                {item.icon}

              </div>

              <h2 className="mt-8 text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">

                {item.number}

              </h2>

              <p className="mt-3 text-gray-300 text-lg">

                {item.title}

              </p>

            </motion.div>

          ))}

        </div>

      </div>

      {/* FEATURES */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-28">

        {/* TOP */}

        <div className="text-center max-w-3xl mx-auto">

          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-sm font-semibold">

            <FaStar />

            WHY CHOOSE US

          </div>

          <h2 className="mt-8 text-5xl md:text-6xl font-black leading-tight">

            Smarter Hiring

            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">

              Better Opportunities

            </span>

          </h2>

          <p className="mt-6 text-lg text-gray-400 leading-relaxed">

            Everything candidates and recruiters need to connect,
            hire, and grow professionally on one modern platform.

          </p>

        </div>

        {/* FEATURE GRID */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {features.map((item, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                y: -10,
              }}
              className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-2xl hover:border-cyan-400/20 hover:bg-white/10 transition-all duration-500"
            >

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 transition-all duration-500"></div>

              <div className="relative z-10">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-2xl shadow-2xl">

                  {item.icon}

                </div>

                <h3 className="mt-8 text-2xl font-bold text-white">

                  {item.title}

                </h3>

                <p className="mt-4 text-gray-400 leading-relaxed">

                  {item.desc}

                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );
}

export default About;