import { motion } from "framer-motion";

import {
  FaBuilding,
  FaGlobe,
  FaEnvelope,
  FaLinkedin,
  FaSave,
} from "react-icons/fa";

function RecruiterProfile() {

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] pt-32 pb-20 px-6">

      <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-[35px] p-10 backdrop-blur-2xl shadow-2xl">

        <div className="text-center">

          <h1 className="text-5xl font-black text-white">
            Recruiter Profile
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Manage company and recruiter information.
          </p>

        </div>

        <div className="flex justify-center mt-10">

          <div className="w-36 h-36 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-5xl font-bold shadow-2xl">
            G
          </div>

        </div>

        <form className="mt-12 space-y-8">

          <div>
            <label className="text-gray-300 block mb-3">
              Company Name
            </label>

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <FaBuilding className="text-cyan-400" />

              <input
                type="text"
                placeholder="Google"
                className="bg-transparent outline-none w-full text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 block mb-3">
              Website
            </label>

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <FaGlobe className="text-cyan-400" />

              <input
                type="text"
                placeholder="https://company.com"
                className="bg-transparent outline-none w-full text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 block mb-3">
              Official Email
            </label>

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <FaEnvelope className="text-cyan-400" />

              <input
                type="email"
                placeholder="hr@company.com"
                className="bg-transparent outline-none w-full text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 block mb-3">
              LinkedIn
            </label>

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <FaLinkedin className="text-cyan-400" />

              <input
                type="text"
                placeholder="linkedin.com/company"
                className="bg-transparent outline-none w-full text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 block mb-3">
              About Company
            </label>

            <textarea
              rows="6"
              placeholder="Write about company..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white resize-none"
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-5 rounded-2xl text-white font-semibold flex items-center justify-center gap-3 shadow-2xl"
          >
            Save Profile
            <FaSave />
          </motion.button>

        </form>

      </div>

    </section>
  );
}

export default RecruiterProfile;