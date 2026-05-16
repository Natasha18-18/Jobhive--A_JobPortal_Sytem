import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="relative overflow-hidden  bg-[#050816]/95 backdrop-blur-2xl text-white pt-24 pb-10">

      {/* BACKGROUND BLUR */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 opacity-10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-14 border-b border-white/10 pb-16">

          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-bold shadow-xl">
                J
              </div>

              <h2 className="text-3xl font-extrabold">
                Job<span className="text-blue-400">Portal</span>
              </h2>

            </div>

            <p className="mt-6 text-gray-300 leading-relaxed">

              Find your dream job, connect with top companies,
              and build your future with our modern hiring platform.

            </p>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-4 mt-8">

              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="/"
                    className="w-11 h-11 rounded-xl bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Icon />
                  </a>
                )
              )}

            </div>

          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >

            <h3 className="text-2xl font-bold mb-7">
              Quick Links
            </h3>

            <ul className="space-y-4">

              {["Home", "About", "Jobs", "Companies", "Contact"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      to="/"
                      className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition group"
                    >

                      <FaArrowRight className="text-sm group-hover:translate-x-1 transition" />

                      {item}

                    </Link>
                  </li>
                )
              )}

            </ul>

          </motion.div>

          {/* RESOURCES */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <h3 className="text-2xl font-bold mb-7">
              Resources
            </h3>

            <ul className="space-y-4">

              {[
                "Career Tips",
                "Resume Builder",
                "Interview Guide",
                "Help Center",
                "Privacy Policy",
              ].map((item, index) => (
                <li key={index}>

                  <a
                    href="/"
                    className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition group"
                  >

                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition" />

                    {item}

                  </a>

                </li>
              ))}

            </ul>

          </motion.div>

          {/* NEWSLETTER */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >

            <h3 className="text-2xl font-bold mb-7">
              Newsletter
            </h3>

            <p className="text-gray-300 leading-relaxed">

              Subscribe to get latest job updates and career news.

            </p>

            {/* INPUT */}
            <div className="mt-6">

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 text-white placeholder:text-gray-400"
              />

              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-blue-500/30 transition-all duration-300">

                Subscribe Now

              </button>

            </div>

          </motion.div>

        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">

          <p className="text-gray-400 text-center md:text-left">

            © 2026 JobPortal. All Rights Reserved.

          </p>

          <div className="flex items-center gap-6 text-gray-400">

            <a href="/" className="hover:text-blue-400 transition">
              Terms
            </a>

            <a href="/" className="hover:text-blue-400 transition">
              Privacy
            </a>

            <a href="/" className="hover:text-blue-400 transition">
              Cookies
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;