import { motion } from "framer-motion";

import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGlobe,
  FaLinkedin,
  FaGithub,
  FaBell,
  FaShieldAlt,
  FaSave,
} from "react-icons/fa";

function Settings() {

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] pt-32 pb-20 px-6 overflow-hidden relative">

      {/* BG EFFECTS */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-blue-600/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* PAGE TITLE */}
        <div className="mb-10">

          <h1 className="text-5xl font-black text-white">
            Profile Settings
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Manage your account information and preferences
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT MENU */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 rounded-[30px] p-6 h-fit backdrop-blur-2xl"
          >

            <div className="space-y-4">

              {[
                "Account Information",
                "Social Profiles",
                "Notifications",
                "Security",
              ].map((item, index) => (
                <button
                  key={index}
                  className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 ${
                    index === 0
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {item}
                </button>
              ))}

            </div>

          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-10 backdrop-blur-2xl shadow-2xl"
          >

            {/* ACCOUNT INFO */}
            <div>

              <h2 className="text-3xl font-bold text-white mb-8">
                Account Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                {/* FULL NAME */}
                <div>

                  <label className="text-gray-300 text-sm mb-3 block">
                    Full Name
                  </label>

                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

                    <FaUser className="text-cyan-400" />

                    <input
                      type="text"
                      placeholder="Harsh Sharma"
                      className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                    />

                  </div>

                </div>

                {/* EMAIL */}
                <div>

                  <label className="text-gray-300 text-sm mb-3 block">
                    Email Address
                  </label>

                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

                    <FaEnvelope className="text-cyan-400" />

                    <input
                      type="email"
                      placeholder="harsh@gmail.com"
                      className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                    />

                  </div>

                </div>

                {/* PHONE */}
                <div>

                  <label className="text-gray-300 text-sm mb-3 block">
                    Phone Number
                  </label>

                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

                    <FaPhoneAlt className="text-cyan-400" />

                    <input
                      type="text"
                      placeholder="+91 9876543210"
                      className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                    />

                  </div>

                </div>

                {/* LOCATION */}
                <div>

                  <label className="text-gray-300 text-sm mb-3 block">
                    Location
                  </label>

                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

                    <FaMapMarkerAlt className="text-cyan-400" />

                    <input
                      type="text"
                      placeholder="Delhi, India"
                      className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* SOCIAL LINKS */}
            <div className="mt-14">

              <h2 className="text-3xl font-bold text-white mb-8">
                Social Profiles
              </h2>

              <div className="space-y-6">

                {/* LINKEDIN */}
                <div>

                  <label className="text-gray-300 text-sm mb-3 block">
                    LinkedIn Profile
                  </label>

                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

                    <FaLinkedin className="text-cyan-400" />

                    <input
                      type="text"
                      placeholder="https://linkedin.com/in/username"
                      className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                    />

                  </div>

                </div>

                {/* GITHUB */}
                <div>

                  <label className="text-gray-300 text-sm mb-3 block">
                    GitHub Profile
                  </label>

                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

                    <FaGithub className="text-cyan-400" />

                    <input
                      type="text"
                      placeholder="https://github.com/username"
                      className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                    />

                  </div>

                </div>

                {/* WEBSITE */}
                <div>

                  <label className="text-gray-300 text-sm mb-3 block">
                    Portfolio Website
                  </label>

                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

                    <FaGlobe className="text-cyan-400" />

                    <input
                      type="text"
                      placeholder="https://yourportfolio.com"
                      className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* NOTIFICATIONS */}
            <div className="mt-14">

              <h2 className="text-3xl font-bold text-white mb-8">
                Notifications
              </h2>

              <div className="space-y-5">

                {[
                  "Email Notifications",
                  "Job Alerts",
                  "Application Updates",
                  "Company Messages",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-5 py-5"
                  >

                    <div className="flex items-center gap-4">

                      <FaBell className="text-cyan-400" />

                      <span className="text-gray-300">
                        {item}
                      </span>

                    </div>

                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 accent-cyan-500"
                    />

                  </div>
                ))}

              </div>

            </div>

            {/* SECURITY */}
            <div className="mt-14">

              <h2 className="text-3xl font-bold text-white mb-8">
                Security
              </h2>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-5">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-2xl">

                    <FaShieldAlt />

                  </div>

                  <div>

                    <h3 className="text-white font-semibold text-lg">
                      Two-Factor Authentication
                    </h3>

                    <p className="text-gray-400 text-sm">
                      Add extra security to your account
                    </p>

                  </div>

                </div>

                <button className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 rounded-2xl text-white font-semibold shadow-xl">
                  Enable
                </button>

              </div>

            </div>

            {/* SAVE BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-14 w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-5 rounded-2xl text-white font-semibold shadow-2xl flex items-center justify-center gap-3"
            >

              <FaSave />

              Save Changes

            </motion.button>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

export default Settings;