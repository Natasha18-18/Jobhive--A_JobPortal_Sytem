import { motion } from "framer-motion";

import {
  FaEdit,
  FaTrash,
  FaUsers,
} from "react-icons/fa";

function MyJobs() {

  const jobs = [1,2,3,4];

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] pt-32 pb-20 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black text-white">
          My Jobs
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Manage your posted jobs.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mt-12">

          {jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8"
            >

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-3xl font-bold text-white">
                    Frontend Developer
                  </h2>

                  <p className="text-cyan-400 mt-2">
                    Google • Remote
                  </p>
                </div>

                <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400">
                  Active
                </span>

              </div>

              <div className="flex items-center gap-3 mt-8 text-gray-300">
                <FaUsers />
                45 Applicants
              </div>

              <div className="flex flex-wrap gap-4 mt-8">

                <button className="px-5 py-3 rounded-2xl bg-cyan-500/10 text-cyan-300 flex items-center gap-3">
                  <FaEdit />
                  Edit
                </button>

                <button className="px-5 py-3 rounded-2xl bg-red-500/10 text-red-400 flex items-center gap-3">
                  <FaTrash />
                  Delete
                </button>

                <button className="px-5 py-3 rounded-2xl bg-white/10 text-white flex items-center gap-3">
                  <FaUsers />
                  View Applicants
                </button>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default MyJobs;