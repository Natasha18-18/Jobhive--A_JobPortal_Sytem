import { motion } from "framer-motion";

import {
  FaBriefcase,
  FaUsers,
  FaClipboardList,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function RecruiterDashboard() {

  const stats = [
    {
      title: "Jobs Posted",
      value: "12",
      icon: <FaBriefcase />,
    },
    {
      title: "Applicants",
      value: "245",
      icon: <FaUsers />,
    },
    {
      title: "Shortlisted",
      value: "18",
      icon: <FaClipboardList />,
    },
    {
      title: "Hiring Success",
      value: "89%",
      icon: <FaChartLine />,
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] pt-32 pb-20 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-12 flex-wrap gap-5">

          <div>
            <h1 className="text-5xl font-black text-white">
              Recruiter Dashboard
            </h1>

            <p className="text-gray-400 mt-3 text-lg">
              Manage jobs, applicants and hiring process.
            </p>
          </div>

          <Link
            to="/upload-job"
            className="bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-4 rounded-2xl text-white font-semibold shadow-xl flex items-center gap-3"
          >
            Post New Job
            <FaArrowRight />
          </Link>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
            >

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl shadow-xl">
                {item.icon}
              </div>

              <h2 className="mt-6 text-4xl font-black text-white">
                {item.value}
              </h2>

              <p className="mt-2 text-gray-400">
                {item.title}
              </p>

            </motion.div>
          ))}

        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-12">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold text-white mb-6">
              Recent Jobs
            </h2>

            <div className="space-y-5">

              {[1,2,3].map((item) => (
                <div
                  key={item}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between"
                >

                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      Frontend Developer
                    </h3>

                    <p className="text-gray-400 mt-1">
                      24 Applicants
                    </p>
                  </div>

                  <span className="text-cyan-400 font-medium">
                    Active
                  </span>

                </div>
              ))}

            </div>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold text-white mb-6">
              Recent Applications
            </h2>

            <div className="space-y-5">

              {[1,2,3].map((item) => (
                <div
                  key={item}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between"
                >

                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      Harsh Sharma
                    </h3>

                    <p className="text-gray-400 mt-1">
                      Applied for React Developer
                    </p>
                  </div>

                  <button className="px-5 py-2 rounded-xl bg-cyan-500/10 text-cyan-300">
                    View
                  </button>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default RecruiterDashboard;