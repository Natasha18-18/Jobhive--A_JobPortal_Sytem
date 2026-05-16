import { useState } from "react";

import { motion } from "framer-motion";

import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

function ChangePassword() {

  const [showCurrent, setShowCurrent] = useState(false);

  const [showNew, setShowNew] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] pt-32 pb-20 px-6 overflow-hidden relative">

      {/* BG EFFECTS */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-blue-600/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* TOP */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-2xl shadow-2xl"
        >

          {/* HEADER */}
          <div className="p-10 border-b border-white/10">

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-4xl shadow-2xl">

                <FaShieldAlt />

              </div>

              <div>

                <h1 className="text-5xl font-black text-white">
                  Change Password
                </h1>

                <p className="text-gray-400 mt-2 text-lg">
                  Keep your account secure with a strong password
                </p>

              </div>

            </div>

          </div>

          {/* FORM */}
          <div className="p-8 md:p-12">

            <form className="space-y-8">

              {/* CURRENT PASSWORD */}
              <div>

                <label className="text-gray-300 text-sm mb-3 block">
                  Current Password
                </label>

                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus-within:border-cyan-400 transition">

                  <FaLock className="text-cyan-400" />

                  <input
                    type={showCurrent ? "text" : "password"}
                    placeholder="Enter current password"
                    className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="text-gray-400 hover:text-cyan-400 transition"
                  >

                    {showCurrent ? <FaEyeSlash /> : <FaEye />}

                  </button>

                </div>

              </div>

              {/* NEW PASSWORD */}
              <div>

                <label className="text-gray-300 text-sm mb-3 block">
                  New Password
                </label>

                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus-within:border-cyan-400 transition">

                  <FaLock className="text-cyan-400" />

                  <input
                    type={showNew ? "text" : "password"}
                    placeholder="Enter new password"
                    className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="text-gray-400 hover:text-cyan-400 transition"
                  >

                    {showNew ? <FaEyeSlash /> : <FaEye />}

                  </button>

                </div>

              </div>

              {/* CONFIRM PASSWORD */}
              <div>

                <label className="text-gray-300 text-sm mb-3 block">
                  Confirm New Password
                </label>

                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus-within:border-cyan-400 transition">

                  <FaLock className="text-cyan-400" />

                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="text-gray-400 hover:text-cyan-400 transition"
                  >

                    {showConfirm ? <FaEyeSlash /> : <FaEye />}

                  </button>

                </div>

              </div>

              {/* PASSWORD TIPS */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

                <h3 className="text-white font-bold text-xl mb-5">
                  Password Requirements
                </h3>

                <div className="space-y-4">

                  {[
                    "Minimum 8 characters",
                    "At least one uppercase letter",
                    "At least one number",
                    "At least one special character",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 text-gray-300"
                    >

                      <FaCheckCircle className="text-cyan-400" />

                      {item}

                    </div>
                  ))}

                </div>

              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-5 rounded-2xl text-white font-semibold shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-3"
              >

                Update Password

                <FaArrowRight />

              </motion.button>

            </form>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default ChangePassword;