import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import {
  FaBuilding,
  FaMapMarkerAlt,
  FaUsers,
  FaArrowRight,
  FaSearch,
  FaStar,
  FaBriefcase,
} from "react-icons/fa";

function Companies() {

  const companies = [
    {
      id: 1,
      name: "Google",
      location: "Bangalore, India",
      jobs: "120+ Jobs",
      employees: "10K+ Employees",
      rating: "4.9",
      image:
        "https://images.unsplash.com/photo-1572021335469-31706a17aaef",
    },

    {
      id: 2,
      name: "Microsoft",
      location: "Hyderabad, India",
      jobs: "85+ Jobs",
      employees: "8K+ Employees",
      rating: "4.8",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978",
    },

    {
      id: 3,
      name: "Amazon",
      location: "Pune, India",
      jobs: "150+ Jobs",
      employees: "15K+ Employees",
      rating: "4.7",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },

    {
      id: 4,
      name: "Netflix",
      location: "Remote",
      jobs: "45+ Jobs",
      employees: "5K+ Employees",
      rating: "4.8",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    },

    {
      id: 5,
      name: "Adobe",
      location: "Noida, India",
      jobs: "70+ Jobs",
      employees: "6K+ Employees",
      rating: "4.6",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    },

    {
      id: 6,
      name: "Spotify",
      location: "Remote",
      jobs: "30+ Jobs",
      employees: "3K+ Employees",
      rating: "4.9",
      image:
        "https://images.unsplash.com/photo-1497215842964-222b430dc094",
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] pt-32 pb-20 px-6">

      {/* BG GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADING */}
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
            duration: 0.7,
          }}
          className="text-center"
        >

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">

            Top Hiring

            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">

              Companies

            </span>

          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">

            Discover world-class companies hiring talented developers,
            designers, marketers, and engineers globally.

          </p>

        </motion.div>

        {/* SEARCH */}
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
            delay: 0.2,
          }}
          className="mt-14 bg-white/5 border border-white/10 rounded-[30px] p-5 backdrop-blur-2xl shadow-2xl"
        >

          <div className="flex items-center gap-4 bg-[#111827]/70 border border-white/10 rounded-2xl px-5 py-4">

            <FaSearch className="text-cyan-400 text-lg" />

            <input
              type="text"
              placeholder="Search companies..."
              className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
            />

          </div>

        </motion.div>

        {/* COMPANY GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16">

          {companies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                y: -10,
              }}
              className="bg-white/5 border border-white/10 rounded-[35px] overflow-hidden backdrop-blur-2xl shadow-2xl hover:border-cyan-400/30 transition-all duration-300 group"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden">

                <img
                  src={company.image}
                  alt={company.name}
                  className="w-full h-[240px] object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent"></div>

              </div>

              {/* CONTENT */}
              <div className="p-8">

                {/* TOP */}
                <div className="flex items-center justify-between">

                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl shadow-2xl">

                    <FaBuilding />

                  </div>

                  <div className="flex items-center gap-2 text-yellow-400">

                    <FaStar />

                    <span className="font-semibold">
                      {company.rating}
                    </span>

                  </div>

                </div>

                {/* TITLE */}
                <h2 className="mt-6 text-3xl font-bold text-white">

                  {company.name}

                </h2>

                {/* INFO */}
                <div className="mt-6 space-y-4">

                  <div className="flex items-center gap-3 text-gray-300">

                    <FaMapMarkerAlt className="text-cyan-400" />

                    {company.location}

                  </div>

                  <div className="flex items-center gap-3 text-gray-300">

                    <FaBriefcase className="text-cyan-400" />

                    {company.jobs}

                  </div>

                  <div className="flex items-center gap-3 text-gray-300">

                    <FaUsers className="text-cyan-400" />

                    {company.employees}

                  </div>

                </div>

                {/* BUTTON */}
                <Link to="/jobs">

                  <motion.button
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="mt-8 w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-3"
                  >

                    View Jobs

                    <FaArrowRight />

                  </motion.button>

                </Link>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Companies;