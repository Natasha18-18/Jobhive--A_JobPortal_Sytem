import { useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaFilePdf,
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
} from "react-icons/fa";

function ApplicantDetails() {

  const navigate = useNavigate();

  const { id } = useParams();

  // =========================
  // DUMMY DATA
  // =========================

  const [applicant] = useState({
    id,
    fullName: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 9876543210",
    location: "Delhi, India",
    education: "B.Tech Computer Science",
    experience: "2 Years",
    skills: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Tailwind CSS",
    ],
    status: "Pending",
    appliedDate: "15 May 2026",
    about:
      "Passionate MERN Stack Developer with strong frontend & backend skills. Looking for exciting opportunities.",
    profileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800",
    resume:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  });

  // =========================
  // STATUS
  // =========================

  const [status, setStatus] =
    useState(applicant.status);

  const handleAccept = () => {

    setStatus("Accepted");

  };

  const handleReject = () => {

    setStatus("Rejected");

  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-32 relative overflow-hidden">

      {/* BG EFFECTS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* BACK BUTTON */}
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() =>
            navigate(-1)
          }
          className="mb-8 flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 border border-white/10 hover:border-cyan-400/40 transition"
        >

          <FaArrowLeft />

          Back

        </motion.button>

        {/* TOP CARD */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl"
        >

          <div className="flex flex-col lg:flex-row gap-10">

            {/* LEFT */}
            <div className="lg:w-1/3">

              <div className="bg-[#0b1120] rounded-3xl p-6 border border-white/10">

                <img
                  src={
                    applicant.profileImage
                  }
                  alt="profile"
                  className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-cyan-400 shadow-2xl"
                />

                <div className="text-center mt-6">

                  <h1 className="text-3xl font-bold">

                    {applicant.fullName}

                  </h1>

                  <p className="text-cyan-400 mt-2">

                    MERN Stack Developer

                  </p>

                </div>

                {/* STATUS */}
                <div className="mt-6 flex justify-center">

                  <span
                    className={`px-5 py-2 rounded-full text-sm font-semibold ${
                      status ===
                      "Accepted"
                        ? "bg-green-500/20 text-green-400"
                        : status ===
                          "Rejected"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >

                    {status}

                  </span>

                </div>

              </div>

            </div>

            {/* RIGHT */}
            <div className="lg:w-2/3 space-y-8">

              {/* INFO GRID */}
              <div className="grid md:grid-cols-2 gap-5">

                <div className="bg-[#0b1120] rounded-3xl p-5 border border-white/10 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xl">

                    <FaEnvelope />

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">

                      Email

                    </p>

                    <h3 className="font-semibold">

                      {applicant.email}

                    </h3>

                  </div>

                </div>

                <div className="bg-[#0b1120] rounded-3xl p-5 border border-white/10 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl">

                    <FaPhone />

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">

                      Phone

                    </p>

                    <h3 className="font-semibold">

                      {applicant.phone}

                    </h3>

                  </div>

                </div>

                <div className="bg-[#0b1120] rounded-3xl p-5 border border-white/10 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center text-xl">

                    <FaMapMarkerAlt />

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">

                      Location

                    </p>

                    <h3 className="font-semibold">

                      {applicant.location}

                    </h3>

                  </div>

                </div>

                <div className="bg-[#0b1120] rounded-3xl p-5 border border-white/10 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center text-xl">

                    <FaGraduationCap />

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">

                      Education

                    </p>

                    <h3 className="font-semibold">

                      {applicant.education}

                    </h3>

                  </div>

                </div>

                <div className="bg-[#0b1120] rounded-3xl p-5 border border-white/10 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 text-green-400 flex items-center justify-center text-xl">

                    <FaBriefcase />

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">

                      Experience

                    </p>

                    <h3 className="font-semibold">

                      {applicant.experience}

                    </h3>

                  </div>

                </div>

                <div className="bg-[#0b1120] rounded-3xl p-5 border border-white/10 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl">

                    <FaUserTie />

                  </div>

                  <div>

                    <p className="text-gray-400 text-sm">

                      Applied Date

                    </p>

                    <h3 className="font-semibold">

                      {applicant.appliedDate}

                    </h3>

                  </div>

                </div>

              </div>

              {/* ABOUT */}
              <div className="bg-[#0b1120] rounded-3xl p-6 border border-white/10">

                <h2 className="text-2xl font-bold mb-4">

                  About Candidate

                </h2>

                <p className="text-gray-300 leading-8">

                  {applicant.about}

                </p>

              </div>

              {/* SKILLS */}
              <div className="bg-[#0b1120] rounded-3xl p-6 border border-white/10">

                <h2 className="text-2xl font-bold mb-5">

                  Skills

                </h2>

                <div className="flex flex-wrap gap-4">

                  {applicant.skills.map(
                    (
                      skill,
                      index
                    ) => (
                      <span
                        key={index}
                        className="px-5 py-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-400/20"
                      >

                        {skill}

                      </span>
                    )
                  )}

                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-5">

                <motion.a
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  href={
                    applicant.resume
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold flex items-center gap-3 shadow-xl"
                >

                  <FaFilePdf />

                  View Resume

                </motion.a>

                <motion.a
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  href={
                    applicant.resume
                  }
                  download
                  className="px-7 py-4 rounded-2xl bg-white/10 border border-white/10 font-semibold flex items-center gap-3 hover:border-cyan-400/40 transition"
                >

                  <FaDownload />

                  Download CV

                </motion.a>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={
                    handleAccept
                  }
                  className="px-7 py-4 rounded-2xl bg-green-500 text-white font-semibold flex items-center gap-3 shadow-xl"
                >

                  <FaCheckCircle />

                  Accept

                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={
                    handleReject
                  }
                  className="px-7 py-4 rounded-2xl bg-red-500 text-white font-semibold flex items-center gap-3 shadow-xl"
                >

                  <FaTimesCircle />

                  Reject

                </motion.button>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default ApplicantDetails;