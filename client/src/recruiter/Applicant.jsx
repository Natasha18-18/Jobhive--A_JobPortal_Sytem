import { motion } from "framer-motion";

import {
  FaFileAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

function Applicants() {

  const applicants = [1,2,3,4];

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] pt-32 pb-20 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black text-white">
          Applicants
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Review and manage job applications.
        </p>

        <div className="space-y-8 mt-12">

          {applicants.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8"
            >

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                <div>
                  <h2 className="text-3xl font-bold text-white">
                    Harsh Sharma
                  </h2>

                  <p className="text-cyan-400 mt-2">
                    React Developer
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <span className="px-4 py-2 rounded-full bg-white/10 text-gray-300">
                      React
                    </span>

                    <span className="px-4 py-2 rounded-full bg-white/10 text-gray-300">
                      Node.js
                    </span>

                    <span className="px-4 py-2 rounded-full bg-white/10 text-gray-300">
                      Tailwind
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">

                  <button className="px-5 py-3 rounded-2xl bg-cyan-500/10 text-cyan-300 flex items-center gap-3">
                    <FaFileAlt />
                    Resume
                  </button>

                  <button className="px-5 py-3 rounded-2xl bg-green-500/10 text-green-400 flex items-center gap-3">
                    <FaCheck />
                    Shortlist
                  </button>

                  <button className="px-5 py-3 rounded-2xl bg-red-500/10 text-red-400 flex items-center gap-3">
                    <FaTimes />
                    Reject
                  </button>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Applicants;