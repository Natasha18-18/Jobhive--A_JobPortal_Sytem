import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaPlusCircle,
  FaClipboardList,
  FaUserTie,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";

function RecruiterNavbar() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <nav className="bg-[#0f172a] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-cyan-400"
        >
          Recruiter Panel
        </motion.h1>

        <div className="flex items-center gap-6 text-sm md:text-base">
          
          <Link
            to="/recruiter/dashboard"
            className="flex items-center gap-2 hover:text-cyan-400 transition"
          >
            <FaHome />
            Home
          </Link>

          <Link
            to="/recruiter/post-job"
            className="flex items-center gap-2 hover:text-cyan-400 transition"
          >
            <FaPlusCircle />
            Post Job
          </Link>

          <Link
            to="/recruiter/my-jobs"
            className="flex items-center gap-2 hover:text-cyan-400 transition"
          >
            <FaBriefcase />
            My Jobs
          </Link>

          <Link
            to="/recruiter/applications"
            className="flex items-center gap-2 hover:text-cyan-400 transition"
          >
            <FaClipboardList />
            Applications
          </Link>

          <Link
            to="/recruiter/profile"
            className="flex items-center gap-2 hover:text-cyan-400 transition"
          >
            <FaUserTie />
            Profile
          </Link>

          <button
            onClick={logoutHandler}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default RecruiterNavbar;