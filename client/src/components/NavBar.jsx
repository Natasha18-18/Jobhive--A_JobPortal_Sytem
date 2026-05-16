import { useEffect, useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import {
  HiMenuAlt3,
  HiX,
} from "react-icons/hi";

import {
  FaBriefcase,
  FaBell,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaLock,
  FaUserEdit,
} from "react-icons/fa";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [candidate, setCandidate] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // USER STATE
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const location = useLocation();

  const navigate = useNavigate();

  // =========================
  // FETCH PROFILE
  // =========================

useEffect(() => {

  const loadUser = () => {

    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(storedUser);

    if (storedUser?._id) {

      fetchProfile(storedUser);

    } else {

      setLoading(false);

    }

  };

  loadUser();

  window.addEventListener(
    "profileUpdated",
    loadUser
  );

  return () => {

    window.removeEventListener(
      "profileUpdated",
      loadUser
    );

  };

}, [location.pathname]);

  const fetchProfile = async (
    currentUser
  ) => {

    try {

      const res = await axios.get(
        `http://localhost:5002/api/candidate/${currentUser._id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {

        setCandidate(res.data.data);

        // UPDATE USER
        const updatedUser = {
          ...currentUser,
          fullName:
            res.data.data.fullName,
          email:
            res.data.data.email,
          profileImage:
            res.data.data.profileImage,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        setUser(updatedUser);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    setUser(null);

    setCandidate(null);

    navigate("/login");

  };

  // =========================
  // NAV LINKS
  // =========================

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "About",
      path: "/about",
    },

    {
      name: "Jobs",
      path: "/jobs",
    },

    {
      name: "Companies",
      path: "/companies",
    },

    {
      name: "Contact",
      path: "/contact",
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

      {/* BG EFFECT */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full"></div>

      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-10">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <motion.div
            whileHover={{
              rotate: 8,
              scale: 1.08,
            }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl shadow-xl"
          >

            <FaBriefcase />

          </motion.div>

          <div>

            <h1 className="text-2xl font-extrabold text-white">

              Job
              <span className="text-cyan-400">
                Portal
              </span>

            </h1>

            <p className="text-xs text-gray-400 -mt-1">

              Find Your Dream Career

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
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
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

                <span className="relative z-10">

                  {link.name}

                </span>

              </Link>
            )
          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-4">

          {/* LOADING */}
          {loading ? (
            <div className="text-gray-400 text-sm">

              Loading...

            </div>
          ) : user ? (
            <>

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

              {/* PROFILE */}
              <div className="relative">

                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  onClick={() =>
                    setProfileOpen(
                      !profileOpen
                    )
                  }
                  className="flex items-center gap-3 bg-white/10 border border-white/10 px-4 py-2 rounded-2xl text-white hover:border-cyan-400/40 transition-all duration-300"
                >

                  {/* IMAGE */}
                  {candidate?.profileImage?.trim() ? (
                    <img
                      src={`http://localhost:5002/uploads/${candidate.profileImage}`}
                      alt="profile"
                      className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400 shadow-lg"
                    />
                  ) : (
                    <FaUserCircle className="text-4xl text-cyan-400" />
                  )}

                  {/* INFO */}
                  <div className="text-left">

                    <h3 className="text-sm font-semibold">

                      {candidate?.fullName ||
                        user?.fullName ||
                        "User"}

                    </h3>

                    <p className="text-xs text-gray-400">

                      {candidate?.role ||
                        "Candidate"}

                    </p>

                  </div>

                </motion.button>

                {/* DROPDOWN */}
                <AnimatePresence>

                  {profileOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: 20,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="absolute right-0 mt-5 w-80 bg-[#0b1120]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                    >

                      {/* TOP */}
                      <div className="relative p-6 border-b border-white/10">

                        <button
                          onClick={() =>
                            setProfileOpen(
                              false
                            )
                          }
                          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 flex items-center justify-center transition"
                        >

                          <HiX />

                        </button>

                        <div className="flex items-center gap-4">

                          {candidate?.profileImage ? (
                            <img
                              src={`http://localhost:5002/uploads/${candidate.profileImage}`}
                              alt="profile"
                              className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-3xl">

                              <FaUserCircle />

                            </div>
                          )}

                          <div>

                            <h2 className="text-white font-bold text-lg">

                              {candidate?.fullName ||
                                user?.fullName}

                            </h2>

                            <p className="text-gray-400 text-sm">

                              {candidate?.email ||
                                user?.email}

                            </p>

                          </div>

                        </div>

                      </div>

                      {/* MENU */}
                      <div className="p-3 space-y-2">

                        <Link
                          to="/profile"
                          onClick={() =>
                            setProfileOpen(
                              false
                            )
                          }
                          className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition"
                        >

                          <FaUserEdit />

                          Edit Profile

                        </Link>

                        <Link
                          to="/settings"
                          onClick={() =>
                            setProfileOpen(
                              false
                            )
                          }
                          className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition"
                        >

                          <FaCog />

                          Settings

                        </Link>

                        {/* <Link
                          to="/change-password"
                          onClick={() =>
                            setProfileOpen(
                              false
                            )
                          }
                          className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition"
                        >

                          <FaLock />

                          Change Password

                        </Link> */}

                        {/* RESUME */}
                        {candidate?.resume && (
                          <a
                            href={`http://localhost:5002/uploads/${candidate.resume}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition"
                          >

                            📄 View Resume

                          </a>
                        )}

                        {/* LOGOUT */}
                        <button
                          onClick={
                            handleLogout
                          }
                          className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 transition"
                        >

                          <FaSignOutAlt />

                          Logout

                        </button>

                      </div>

                    </motion.div>
                  )}

                </AnimatePresence>

              </div>

            </>
          ) : (
            <Link
              to="/login"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-xl hover:scale-105 transition-all duration-300"
            >

              Login

            </Link>
          )}

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
                    className={`px-5 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                      location.pathname ===
                      link.path
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-cyan-400"
                    }`}
                  >

                    {link.name}

                  </Link>
                )
              )}

              {/* MOBILE USER */}
              {user ? (
                <>

                  <Link
                    to="/profile"
                    className="px-5 py-4 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-cyan-400 transition"
                  >

                    Edit Profile

                  </Link>

                  <button
                    onClick={
                      handleLogout
                    }
                    className="text-left px-5 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition"
                  >

                    Logout

                  </button>

                </>
              ) : (
                <Link
                  to="/login"
                  className="px-5 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center font-semibold"
                >

                  Login

                </Link>
              )}

            </div>

          </motion.div>
        )}

      </AnimatePresence>

    </motion.nav>
  );
}

export default Navbar;