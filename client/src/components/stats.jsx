import { motion } from "framer-motion";

import {
  FaBriefcase,
  FaBuilding,
  FaUsers,
  FaChartLine,
  FaArrowUp,
} from "react-icons/fa";

function Stats() {

  const statsData = [
    {
      icon: <FaBriefcase />,
      number: "10K+",
      title: "Jobs Posted",
      desc: "Fresh opportunities added every single day.",
    },
    {
      icon: <FaBuilding />,
      number: "5K+",
      title: "Companies",
      desc: "Trusted by startups and global enterprises.",
    },
    {
      icon: <FaUsers />,
      number: "20K+",
      title: "Candidates",
      desc: "Professionals growing careers worldwide.",
    },
    {
      icon: <FaChartLine />,
      number: "95%",
      title: "Success Rate",
      desc: "Candidates successfully hired through us.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-32 bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] text-white">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-blue-600/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      {/* GRID EFFECT */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          viewport={{
            once: true,
          }}
          className="text-center mb-24"
        >

          {/* BADGE */}
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/10 backdrop-blur-2xl px-6 py-3 rounded-full shadow-2xl">

            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>

            <span className="text-cyan-300 font-semibold tracking-wide text-sm">

              OUR ACHIEVEMENTS

            </span>

          </div>

          {/* TITLE */}
          <h2 className="mt-8 text-5xl md:text-7xl font-black leading-tight">

            Trusted By
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">

              Thousands Worldwide

            </span>

          </h2>

          {/* DESCRIPTION */}
          <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">

            Empowering candidates and companies with a modern
            AI-powered hiring ecosystem built for speed,
            trust, and career growth.

          </p>

        </motion.div>

        {/* STATS GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {statsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                y: -12,
              }}
              className="group relative overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] p-9 shadow-2xl hover:border-cyan-400/40 transition-all duration-500"
            >

              {/* HOVER GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-600/10 to-cyan-500/10"></div>

              {/* TOP LINE */}
              <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-500"></div>

              {/* ICON */}
              <div className="relative z-10 w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-4xl text-white shadow-2xl group-hover:scale-110 transition-all duration-500">

                {item.icon}

              </div>

              {/* NUMBER */}
              <div className="relative z-10 mt-8 flex items-center gap-3">

                <h2 className="text-5xl font-black text-white">

                  {item.number}

                </h2>

                <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">

                  <FaArrowUp />

                </div>

              </div>

              {/* TITLE */}
              <h3 className="relative z-10 mt-5 text-3xl font-bold text-white">

                {item.title}

              </h3>

              {/* DESC */}
              <p className="relative z-10 mt-4 text-gray-300 leading-relaxed text-lg">

                {item.desc}

              </p>

              {/* BOTTOM GLOW */}
              <div className="absolute -bottom-20 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500"></div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Stats;