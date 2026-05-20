import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowRight,
  FaBriefcase,
  FaUserTie,
  FaUserGraduate,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

function Footer() {

  // =========================
  // USER
  // =========================

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const role = user?.role;

  // =========================
  // DYNAMIC LINKS
  // =========================

  const candidateLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Jobs",
      path: "/jobs",
    },
    {
      name: "My Applications",
      path: "/my-applications",
    },
    {
      name: "Profile",
      path: "/profile",
    },
    {
      name: "Notifications",
      path: "/notifications",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  const recruiterLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Post Job",
      path: "/recruiter/post-job",
    },
    {
      name: "Manage Jobs",
      path: "/recruiter/jobs",
    },
    {
      name: "Applicants",
      path: "/recruiter/applicants",
    },
    {
      name: "Recruiter Profile",
      path: "/recruiter/profile",
    },
    {
      name: "Notifications",
      path: "/notifications",
    },
  ];

  const guestLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Jobs",
      path: "/jobs",
    },
    {
      name: "Login",
      path: "/login",
    },
    {
      name: "Register",
      path: "/signup",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  const links =
    role === "recruiter"
      ? recruiterLinks
      : role === "candidate"
      ? candidateLinks
      : guestLinks;

  return (

    <footer className="relative overflow-hidden bg-[#050816] text-white border-t border-white/10">

      {/* GRID */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* GLOW */}

      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-10">

        {/* TOP */}

        <div className="grid lg:grid-cols-3 gap-14 pb-14 border-b border-white/10">

          {/* BRAND */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{ once: true }}
          >

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.4)]">

                <FaBriefcase className="text-black text-2xl" />

              </div>

              <div>

                <h2 className="text-3xl font-black">

                  Job
                  <span className="text-cyan-400">

                    {" "}Portal

                  </span>

                </h2>

                <p className="text-gray-400 text-sm mt-1">

                  Smart Hiring Platform

                </p>

              </div>

            </div>

            {/* DESCRIPTION */}

            <p className="mt-6 text-gray-300 leading-relaxed">

              Find your dream job, connect with top recruiters,
              manage applications, and grow your career with our modern job portal platform.

            </p>

            {/* ROLE */}

            <div className="mt-6 flex items-center gap-3">

              {role === "recruiter" ? (

                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">

                  <FaUserTie />

                  Recruiter Panel

                </div>

              ) : role === "candidate" ? (

                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400">

                  <FaUserGraduate />

                  Candidate Panel

                </div>

              ) : (

                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 border border-white/10 text-gray-300">

                  Guest User

                </div>

              )}

            </div>

            {/* SOCIALS */}

            <div className="flex items-center gap-4 mt-8">

              {[
                FaFacebookF,
                FaTwitter,
                FaInstagram,
                FaLinkedinIn,
              ].map((Icon, index) => (

                <a
                  key={index}
                  href="/"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500 hover:border-cyan-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >

                  <Icon />

                </a>

              ))}

            </div>

          </motion.div>

          {/* QUICK LINKS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            viewport={{ once: true }}
          >

            <h3 className="text-2xl font-bold mb-8">

              Quick Links

            </h3>

            <div className="grid grid-cols-2 gap-5">

              {links.map(
                (item, index) => (

                  <Link
                    key={index}
                    to={item.path}
                    className="group flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-all duration-300"
                  >

                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition" />

                    {item.name}

                  </Link>
                )
              )}

            </div>

          </motion.div>

          {/* RIGHT SECTION */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{ once: true }}
          >

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-7">

              <h3 className="text-2xl font-bold mb-5">

                {role === "recruiter"
                  ? "Hire Top Talent 🚀"
                  : role === "candidate"
                  ? "Find Your Dream Job 🚀"
                  : "Join Our Platform 🚀"}

              </h3>

              <p className="text-gray-300 leading-relaxed mb-7">

                {role === "recruiter"
                  ? "Post jobs, manage applicants, schedule interviews, and hire smarter with our recruiter tools."
                  : role === "candidate"
                  ? "Apply for jobs, track applications, receive notifications, and grow your career faster."
                  : "Join as a candidate or recruiter and unlock powerful job portal features."}

              </p>

              {/* BUTTONS */}

              <div className="space-y-4">

                {!user ? (

                  <>
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.35)]"
                    >

                      Get Started

                    </Link>

                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 py-4 rounded-2xl font-semibold transition-all duration-300"
                    >

                      Login Account

                    </Link>
                  </>
                ) : role === "recruiter" ? (

                  <>
                    <Link
                      to="/recruiter/post-job"
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-semibold"
                    >

                      Post New Job

                    </Link>

                    <Link
                      to="/recruiter/jobs"
                      className="w-full flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 py-4 rounded-2xl font-semibold transition-all duration-300"
                    >

                      Manage Jobs

                    </Link>
                  </>
                ) : (

                  <>
                    <Link
                      to="/jobs"
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-semibold"
                    >

                      Explore Jobs

                    </Link>

                    <Link
                      to="/my-applications"
                      className="w-full flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 py-4 rounded-2xl font-semibold transition-all duration-300"
                    >

                      My Applications

                    </Link>
                  </>
                )}

              </div>

            </div>

          </motion.div>

        </div>

        {/* BOTTOM */}

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-400 text-sm text-center md:text-left">

            © 2026 Job Portal. All Rights Reserved.

          </p>

          <div className="flex items-center gap-6 text-sm text-gray-400">

            <Link
              to="/terms"
              className="hover:text-cyan-400 transition"
            >

              Terms

            </Link>

            <Link
              to="/privacy"
              className="hover:text-cyan-400 transition"
            >

              Privacy

            </Link>

            <Link
              to="/contact"
              className="hover:text-cyan-400 transition"
            >

              Contact

            </Link>

          </div>

        </div>

      </div>

    </footer>

  );

}

export default Footer;