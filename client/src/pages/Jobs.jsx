import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaArrowRight,
  FaClock,
} from "react-icons/fa";

function Jobs() {

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore",
      salary: "₹12L - ₹18L",
      type: "Full Time",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Adobe",
      location: "Remote",
      salary: "₹8L - ₹14L",
      type: "Remote",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "Microsoft",
      location: "Hyderabad",
      salary: "₹15L - ₹22L",
      type: "Hybrid",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] pt-32 pb-20 px-6">

      {/* BG */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* TOP */}
        <div className="text-center">

          <h1 className="text-5xl md:text-7xl font-black text-white">

            Explore

            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">

              Dream Jobs

            </span>

          </h1>

          <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto">

            Find premium opportunities from top companies worldwide.

          </p>

        </div>

        {/* SEARCH */}
        <div className="mt-14 bg-white/5 border border-white/10 rounded-[30px] p-5 backdrop-blur-2xl">

          <div className="grid lg:grid-cols-3 gap-4">

            <div className="flex items-center gap-4 bg-[#111827]/70 px-5 py-4 rounded-2xl">

              <FaSearch className="text-cyan-400" />

              <input
                type="text"
                placeholder="Search jobs..."
                className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
              />

            </div>

            <div className="flex items-center gap-4 bg-[#111827]/70 px-5 py-4 rounded-2xl">

              <FaMapMarkerAlt className="text-cyan-400" />

              <input
                type="text"
                placeholder="Location"
                className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
              />

            </div>

            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl text-white font-semibold">

              Search Jobs

            </button>

          </div>

        </div>

        {/* JOBS */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">

          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
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
              whileHover={{
                y: -10,
              }}
              className="bg-white/5 border border-white/10 rounded-[30px] overflow-hidden backdrop-blur-2xl hover:border-cyan-400/30 transition-all duration-300"
            >

              <img
                src={job.image}
                alt={job.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-7">

                <div className="flex items-center justify-between">

                  <span className="px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-300 text-sm">

                    {job.type}

                  </span>

                  <div className="flex items-center gap-2 text-gray-400 text-sm">

                    <FaClock />

                    2 Days Ago

                  </div>

                </div>

                <h2 className="mt-5 text-3xl font-bold text-white">

                  {job.title}

                </h2>

                <p className="mt-2 text-cyan-300 font-medium">

                  {job.company}

                </p>

                <div className="mt-6 space-y-4 text-gray-300">

                  <div className="flex items-center gap-3">

                    <FaMapMarkerAlt className="text-cyan-400" />

                    {job.location}

                  </div>

                  <div className="flex items-center gap-3">

                    <FaMoneyBillWave className="text-cyan-400" />

                    {job.salary}

                  </div>

                  <div className="flex items-center gap-3">

                    <FaBriefcase className="text-cyan-400" />

                    2+ Years Experience

                  </div>

                </div>

                <Link
                  to={`/jobs/${job.id}`}
                  className="mt-8 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 py-4 rounded-2xl text-white font-semibold shadow-xl hover:shadow-cyan-500/30 transition-all duration-300"
                >

                  View Details

                  <FaArrowRight />

                </Link>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Jobs;