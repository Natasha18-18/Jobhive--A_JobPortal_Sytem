import { motion } from "framer-motion";

import {
  FaUpload,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFileAlt,
  FaArrowRight,
} from "react-icons/fa";

function ApplyJob() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] text-white px-6 py-32 relative overflow-hidden">

      {/* BG GLOW */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-600/10 blur-3xl rounded-full"></div>

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >

          <h1 className="text-5xl md:text-6xl font-black">

            Apply For

            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">

              Your Dream Job

            </span>

          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">

            Fill in your details and upload your resume to apply instantly.

          </p>

        </motion.div>

        {/* FORM */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[35px] p-8 md:p-12 shadow-2xl space-y-8"
        >

          {/* NAME */}
          <div>

            <label className="text-sm text-gray-300 mb-3 block">
              Full Name
            </label>

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

              <FaUser className="text-cyan-400" />

              <input
                type="text"
                placeholder="Enter your full name"
                className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
              />

            </div>

          </div>

          {/* EMAIL */}
          <div>

            <label className="text-sm text-gray-300 mb-3 block">
              Email Address
            </label>

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

              <FaEnvelope className="text-cyan-400" />

              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
              />

            </div>

          </div>

          {/* PHONE */}
          <div>

            <label className="text-sm text-gray-300 mb-3 block">
              Phone Number
            </label>

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

              <FaPhone className="text-cyan-400" />

              <input
                type="text"
                placeholder="Enter phone number"
                className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
              />

            </div>

          </div>

          {/* COVER LETTER */}
          <div>

            <label className="text-sm text-gray-300 mb-3 block">
              Cover Letter
            </label>

            <div className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

              <FaFileAlt className="text-cyan-400 mt-1" />

              <textarea
                rows="5"
                placeholder="Write something about yourself..."
                className="bg-transparent outline-none w-full text-white placeholder:text-gray-500 resize-none"
              ></textarea>

            </div>

          </div>

          {/* RESUME */}
          <div>

            <label className="text-sm text-gray-300 mb-3 block">
              Upload Resume
            </label>

            <label className="flex items-center justify-center gap-4 border-2 border-dashed border-cyan-400/30 rounded-2xl px-6 py-10 cursor-pointer hover:bg-white/5 transition">

              <FaUpload className="text-cyan-400 text-2xl" />

              <span className="text-gray-300">
                Upload Resume (PDF/DOC)
              </span>

              <input
                type="file"
                className="hidden"
              />

            </label>

          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-4 rounded-2xl font-semibold shadow-2xl flex items-center justify-center gap-3"
          >

            Submit Application

            <FaArrowRight />

          </motion.button>

        </motion.form>

      </div>

    </section>
  );
}

export default ApplyJob;