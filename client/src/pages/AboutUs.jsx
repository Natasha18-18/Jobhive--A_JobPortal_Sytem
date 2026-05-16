import { motion } from "framer-motion";

import {
  FaBriefcase,
  FaUsers,
  FaRocket,
  FaShieldAlt,
  FaGlobe,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

function About() {

  const stats = [
    {
      number: "10K+",
      title: "Active Jobs",
    },
    {
      number: "5K+",
      title: "Companies",
    },
    {
      number: "20K+",
      title: "Candidates",
    },
    {
      number: "95%",
      title: "Success Rate",
    },
  ];

  const features = [
    {
      icon: <FaRocket />,
      title: "Fast Hiring",
      desc: "Quick and smart recruitment process powered by AI.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Platform",
      desc: "Your data and applications stay protected and secure.",
    },
    {
      icon: <FaGlobe />,
      title: "Remote Jobs",
      desc: "Explore opportunities from companies worldwide.",
    },
    {
      icon: <FaChartLine />,
      title: "Career Growth",
      desc: "Build a successful future with premium opportunities.",
    },
  ];

  return (
    <>


      <section className="relative overflow-hidden bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] text-white">

        {/* BACKGROUND */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full"></div>

        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        {/* HERO */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-24">

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >

              <div className="inline-flex items-center gap-3 bg-white/10 border border-white/10 px-5 py-3 rounded-full backdrop-blur-xl">

                <FaBriefcase className="text-cyan-400" />

                <span className="text-cyan-300 font-semibold text-sm">
                  ABOUT JOBPORTAL
                </span>

              </div>

              <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight">

                Building Careers

                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">

                  Connecting Talent

                </span>

              </h1>

              <p className="mt-8 text-lg text-gray-300 leading-relaxed max-w-2xl">

                JobPortal helps professionals discover amazing career opportunities
                while enabling companies to hire the best talent faster and smarter.

              </p>

              {/* FEATURES */}
              <div className="mt-10 space-y-5">

                {[
                  "AI Powered Recruitment",
                  "Trusted By Thousands",
                  "Global Hiring Network",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4"
                  >

                    <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-cyan-400">

                      <FaCheckCircle />

                    </div>

                    <span className="text-gray-300">
                      {item}
                    </span>

                  </div>
                ))}

              </div>

            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >

              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                alt="about"
                className="rounded-[40px] w-full h-[650px] object-cover border border-white/10 shadow-2xl"
              />

              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-t from-[#050816]/80 via-transparent to-transparent"></div>

              {/* FLOATING CARD */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl"
              >

                <div className="flex items-center gap-5">

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-2xl">

                    <FaUsers />

                  </div>

                  <div>

                    <h2 className="text-3xl font-black">
                      20K+
                    </h2>

                    <p className="text-gray-300">
                      Happy Candidates
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
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[30px] p-8 text-center hover:bg-white/10 transition-all duration-300"
              >

                <h2 className="text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">

                  {item.number}

                </h2>

                <p className="mt-4 text-gray-300 text-lg">
                  {item.title}
                </p>

              </motion.div>
            ))}

          </div>

        </div>

        {/* WHY CHOOSE US */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-28">

          <div className="text-center">

            <h2 className="text-5xl font-black">

              Why Choose

              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">

                JobPortal

              </span>

            </h2>

            <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">

              Everything you need to find the perfect opportunity
              and grow your professional career.

            </p>

          </div>

          {/* FEATURES */}
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
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[30px] p-8 hover:-translate-y-3 hover:bg-white/10 transition-all duration-500"
              >

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-2xl shadow-2xl">

                  {item.icon}

                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-400 leading-relaxed">

                  {item.desc}

                </p>

              </motion.div>
            ))}

          </div>

        </div>

      </section>


    </>
  );
}

export default About;