import {
  FaBriefcase,
  FaUsers,
  FaRocket,
  FaShieldAlt,
  FaGlobe,
  FaBolt,
  FaArrowRight,
} from "react-icons/fa";

import { motion } from "framer-motion";

function Features() {

  const features = [
    {
      icon: <FaBriefcase />,
      title: "Top Companies",
      desc: "Connect with premium companies and unlock high-paying opportunities worldwide.",
    },
    {
      icon: <FaUsers />,
      title: "Easy Apply",
      desc: "Apply instantly with one click and manage all applications seamlessly.",
    },
    {
      icon: <FaRocket />,
      title: "Career Growth",
      desc: "Boost your professional journey with smart recommendations and insights.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Trusted Platform",
      desc: "Secure and reliable platform trusted by recruiters and candidates globally.",
    },
    {
      icon: <FaGlobe />,
      title: "Remote Jobs",
      desc: "Discover remote and hybrid opportunities from companies worldwide.",
    },
    {
      icon: <FaBolt />,
      title: "Fast Hiring",
      desc: "Get hired faster using AI-powered matching and quick application flow.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-32 bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] text-white">

      {/* BLUR EFFECTS */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >

          {/* BADGE */}
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/10 backdrop-blur-xl px-6 py-3 rounded-full shadow-xl">

            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>

            <span className="text-cyan-300 font-semibold tracking-wide text-sm">
              WHY CHOOSE JOBPORTAL
            </span>

          </div>

          {/* TITLE */}
          <h2 className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight">

            Everything You Need
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">

              To Build Your Career

            </span>

          </h2>

          {/* DESCRIPTION */}
          <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">

            Experience a modern hiring ecosystem designed to help
            candidates connect with top companies faster, smarter,
            and more efficiently.

          </p>

        </motion.div>

        {/* FEATURE GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {features.map((item, index) => (
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
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-500/10 to-blue-600/10"></div>

              {/* ICON */}
              <div className="relative z-10 w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-4xl text-white shadow-2xl group-hover:scale-110 transition-all duration-500">

                {item.icon}

              </div>

              {/* TITLE */}
              <h3 className="relative z-10 mt-8 text-3xl font-bold text-white">

                {item.title}

              </h3>

              {/* DESC */}
              <p className="relative z-10 mt-5 text-gray-300 leading-relaxed text-lg">

                {item.desc}

              </p>

              {/* BUTTON */}
              <button className="relative z-10 mt-8 flex items-center gap-3 text-cyan-400 font-semibold group-hover:gap-5 transition-all duration-300">

                Learn More

                <FaArrowRight />

              </button>

              {/* TOP BORDER EFFECT */}
              <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-500"></div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;