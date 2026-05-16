import { motion } from "framer-motion";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaClock,
  FaGlobe,
} from "react-icons/fa";

function Contact() {
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

            Get In

            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">

              Touch

            </span>

          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">

            Have questions, suggestions, or need support?
            Our team is always ready to help you.

          </p>

        </motion.div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-2 gap-10 mt-20">

          {/* LEFT SIDE */}
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 backdrop-blur-2xl shadow-2xl"
          >

            <h2 className="text-4xl font-black text-white">

              Send Message

            </h2>

            <p className="mt-4 text-gray-400">

              Fill out the form below and we'll contact you soon.

            </p>

            {/* FORM */}
            <form className="mt-10 space-y-6">

              {/* NAME */}
              <div>

                <label className="text-sm text-gray-300 mb-3 block">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 outline-none focus:border-cyan-400 transition"
                />

              </div>

              {/* EMAIL */}
              <div>

                <label className="text-sm text-gray-300 mb-3 block">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 outline-none focus:border-cyan-400 transition"
                />

              </div>

              {/* SUBJECT */}
              <div>

                <label className="text-sm text-gray-300 mb-3 block">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 outline-none focus:border-cyan-400 transition"
                />

              </div>

              {/* MESSAGE */}
              <div>

                <label className="text-sm text-gray-300 mb-3 block">
                  Message
                </label>

                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 outline-none resize-none focus:border-cyan-400 transition"
                ></textarea>

              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-3"
              >

                Send Message

                <FaPaperPlane />

              </motion.button>

            </form>

          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="space-y-8"
          >

            {/* CARD 1 */}
            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-2xl shadow-2xl">

              <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl shadow-2xl">

                <FaEnvelope />

              </div>

              <h2 className="mt-6 text-3xl font-bold text-white">

                Email Us

              </h2>

              <p className="mt-4 text-gray-400 leading-relaxed">

                support@jobportal.com

              </p>

            </div>

            {/* CARD 2 */}
            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-2xl shadow-2xl">

              <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl shadow-2xl">

                <FaPhoneAlt />

              </div>

              <h2 className="mt-6 text-3xl font-bold text-white">

                Call Us

              </h2>

              <p className="mt-4 text-gray-400 leading-relaxed">

                +91 98765 43210

              </p>

            </div>

            {/* CARD 3 */}
            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-2xl shadow-2xl">

              <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl shadow-2xl">

                <FaMapMarkerAlt />

              </div>

              <h2 className="mt-6 text-3xl font-bold text-white">

                Office Address

              </h2>

              <p className="mt-4 text-gray-400 leading-relaxed">

                Gurugram, Haryana, India

              </p>

            </div>

            {/* EXTRA INFO */}
            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-2xl shadow-2xl">

              <h2 className="text-3xl font-bold text-white">

                Support Hours

              </h2>

              <div className="mt-6 space-y-5">

                <div className="flex items-center gap-4 text-gray-300">

                  <FaClock className="text-cyan-400" />

                  Mon - Fri : 9AM - 6PM

                </div>

                <div className="flex items-center gap-4 text-gray-300">

                  <FaGlobe className="text-cyan-400" />

                  www.jobportal.com

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

export default Contact;