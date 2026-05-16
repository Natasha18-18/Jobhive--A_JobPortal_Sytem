import { motion } from "framer-motion";

import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

function UploadJob() {

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] pt-32 pb-20 px-6">

      <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-[35px] p-10 backdrop-blur-2xl shadow-2xl">

        <div className="text-center">

          <h1 className="text-5xl font-black text-white">
            Upload Job
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Create and publish new job opportunities.
          </p>

        </div>

        <form className="mt-12 space-y-8">

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="text-gray-300 block mb-3">
                Job Title
              </label>

              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
                <FaBriefcase className="text-cyan-400" />

                <input
                  type="text"
                  placeholder="Frontend Developer"
                  className="bg-transparent outline-none w-full text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-300 block mb-3">
                Location
              </label>

              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
                <FaMapMarkerAlt className="text-cyan-400" />

                <input
                  type="text"
                  placeholder="Bangalore"
                  className="bg-transparent outline-none w-full text-white"
                />
              </div>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="text-gray-300 block mb-3">
                Salary
              </label>

              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
                <FaMoneyBillWave className="text-cyan-400" />

                <input
                  type="text"
                  placeholder="₹12L - ₹18L"
                  className="bg-transparent outline-none w-full text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-300 block mb-3">
                Experience
              </label>

              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
                <FaClock className="text-cyan-400" />

                <input
                  type="text"
                  placeholder="2+ Years"
                  className="bg-transparent outline-none w-full text-white"
                />
              </div>
            </div>

          </div>

          <div>
            <label className="text-gray-300 block mb-3">
              Skills Required
            </label>

            <input
              type="text"
              placeholder="React, Tailwind, Node.js"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white"
            />
          </div>

          <div>
            <label className="text-gray-300 block mb-3">
              Job Description
            </label>

            <textarea
              rows="6"
              placeholder="Write job description..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white resize-none"
            ></textarea>
          </div>

          <div>
            <label className="text-gray-300 block mb-3">
              Requirements
            </label>

            <textarea
              rows="6"
              placeholder="Write job requirements..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white resize-none"
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-5 rounded-2xl text-white font-semibold flex items-center justify-center gap-3 shadow-2xl"
          >
            Publish Job
            <FaArrowRight />
          </motion.button>

        </form>

      </div>

    </section>
  );
}

export default UploadJob;