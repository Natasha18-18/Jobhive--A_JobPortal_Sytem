import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaPaperPlane,
} from "react-icons/fa";

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 blur-[140px] rounded-full" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm mb-6">
            Contact Our Team
          </div> */}

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Let’s Build Something
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Amazing Together
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-lg leading-relaxed">
            Have questions, ideas, or opportunities? Reach out to our team and
            we’ll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {/* Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:border-cyan-400/40 transition duration-300">
              <h2 className="text-3xl font-bold mb-6">
                Get In Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-2xl bg-cyan-500/15 text-cyan-400 text-xl">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-slate-400">
                      support@jobportal.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-2xl bg-blue-500/15 text-blue-400 text-xl">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="text-slate-400">
                      +91 98765 43210
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-2xl bg-purple-500/15 text-purple-400 text-xl">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Office</h3>
                    <p className="text-slate-400">
                      Haryana, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold mb-5">
                Follow Us
              </h2>

              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-14 h-14 rounded-2xl bg-slate-800 hover:bg-cyan-500 transition duration-300 flex items-center justify-center text-xl"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="#"
                  className="w-14 h-14 rounded-2xl bg-slate-800 hover:bg-blue-500 transition duration-300 flex items-center justify-center text-xl"
                >
                  <FaTwitter />
                </a>

                <a
                  href="#"
                  className="w-14 h-14 rounded-2xl bg-slate-800 hover:bg-purple-500 transition duration-300 flex items-center justify-center text-xl"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl"
          >
            <h2 className="text-3xl font-bold mb-8">
              Send Message
            </h2>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 text-slate-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-900/70 border border-white/10 focus:border-cyan-400 outline-none transition duration-300"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-900/70 border border-white/10 focus:border-cyan-400 outline-none transition duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-slate-300">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Message subject"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-900/70 border border-white/10 focus:border-cyan-400 outline-none transition duration-300"
                />
              </div>

              <div>
                <label className="block mb-2 text-slate-300">
                  Your Message
                </label>
                <textarea
                  rows="6"
                  placeholder="Write your message here..."
                  className="w-full px-5 py-4 rounded-2xl bg-slate-900/70 border border-white/10 focus:border-cyan-400 outline-none transition duration-300 resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-cyan-500/30 hover:shadow-2xl transition duration-300"
              >
                Send Message
                <FaPaperPlane />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
