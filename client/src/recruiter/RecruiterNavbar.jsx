import { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  HiMenuAlt3,
  HiX,
} from "react-icons/hi";

import {
  FaBriefcase,
  FaPlusCircle,
  FaClipboardList,
  FaUserTie,
  FaSignOutAlt,
  FaHome,
  FaBell,
} from "react-icons/fa";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

function RecruiterNavbar() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    navigate("/login");

  };

  // =========================
  // NAV LINKS
  // =========================

  const navLinks = [
    {
      name: "Dashboard",
      path: "/recruiter/dashboard",
      icon: <FaHome />,
    },

    {
      name: "Post Job",
      path: "/recruiter/upload-job",
      icon: <FaPlusCircle />,
    },

    {
      name: "My Jobs",
      path: "/recruiter/my-jobs",
      icon: <FaBriefcase />,
    },

    {
      name: "Applicants",
      path: "/recruiter/applicants",
      icon: <FaClipboardList />,
    },

    {
      name: "Profile",
      path: "/recruiter/profile",
      icon: <FaUserTie />,
    },
  ];

  return (
    <motion.nav
      initial={{
        y: -100,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="fixed top-0 left-0 w-full z-50 bg-[#050816]/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
    >

      {/* BG EFFECTS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-10">

        {/* LOGO */}
        <Link
          to="/recruiter/dashboard"
          className="flex items-center gap-3"
        >

          <motion.div
            whileHover={{
              rotate: 8,
              scale: 1.08,
            }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl shadow-xl"
          >

            <FaBriefcase />

          </motion.div>

          <div>

            <h1 className="text-2xl font-extrabold text-white">

              Recruiter
              <span className="text-cyan-400">
                Panel
              </span>

            </h1>

            <p className="text-xs text-gray-400 -mt-1">

              Manage Hiring Efficiently

            </p>

          </div>

        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-2xl px-3 py-3 rounded-full border border-white/10 shadow-xl">

          {navLinks.map(
            (link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  location.pathname ===
                  link.path
                    ? "text-white"
                    : "text-gray-300 hover:text-cyan-400"
                }`}
              >

                {location.pathname ===
                  link.path && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-2">

                  {link.icon}

                  {link.name}

                </span>

              </Link>
            )
          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-4">

          {/* NOTIFICATION */}
          <motion.button
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="relative w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 hover:text-cyan-400 transition"
          >

            <FaBell className="text-lg" />

            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>

          </motion.button>

          {/* PROFILE BUTTON */}
          <Link
            to="/recruiter/profile"
            className="flex items-center gap-3 bg-white/10 border border-white/10 px-4 py-2 rounded-2xl text-white hover:border-cyan-400/40 transition-all duration-300"
          >

            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xl">

              <FaUserTie />

            </div>

            <div className="text-left">

              <h3 className="text-sm font-semibold">

                Recruiter

              </h3>

              <p className="text-xs text-gray-400">

                Hiring Manager

              </p>

            </div>

          </Link>

          {/* LOGOUT */}
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={handleLogout}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-xl flex items-center gap-2"
          >

            <FaSignOutAlt />

            Logout

          </motion.button>

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="lg:hidden text-4xl text-white"
        >

          {menuOpen ? (
            <HiX />
          ) : (
            <HiMenuAlt3 />
          )}

        </button>

      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>

        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
            }}
            transition={{
              duration: 0.3,
            }}
            className="lg:hidden mx-5 mb-5 bg-[#0b1120]/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
          >

            <div className="flex flex-col p-6 gap-3">

              {navLinks.map(
                (link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className={`px-5 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                      location.pathname ===
                      link.path
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-cyan-400"
                    }`}
                  >

                    {link.icon}

                    {link.name}

                  </Link>
                )
              )}

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="text-left px-5 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition flex items-center gap-3"
              >

                <FaSignOutAlt />

                Logout

              </button>

            </div>

          </motion.div>
        )}

      </AnimatePresence>

    </motion.nav>
  );
}

export default RecruiterNavbar;