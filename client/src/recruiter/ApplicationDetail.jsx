import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaFilePdf,
  FaUserTie,
  FaCheckCircle,
  FaClock,
  FaUserGraduate,
} from "react-icons/fa";

function ApplicantDetails() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [application, setApplication] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [status, setStatus] =
    useState("Pending");

  // =========================
  // FETCH APPLICATION
  // =========================

  useEffect(() => {

    fetchApplication();

  }, [id]);

  const fetchApplication =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            `http://localhost:5002/api/application/single/${id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setApplication(
          res.data.application
        );

        setStatus(
          res.data.application.status
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load applicant details"
        );

      } finally {

        setLoading(false);

      }

    };

  // =========================
  // UPDATE STATUS
  // =========================

  const updateStatus =
    async (newStatus) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.put(
            `http://localhost:5002/api/application/status/${id}`,
            {
              status: newStatus,
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        toast.success(
          res.data.message
        );

        setStatus(newStatus);

      } catch (error) {

        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to update status"
        );

      }

    };

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white text-2xl">

        Loading...

      </div>

    );

  }

  // =========================
  // DATA
  // =========================

  const applicant =
    application?.applicant;

  const profileImage =
    applicant?.profileImage
      ? applicant.profileImage.startsWith(
          "http"
        )
        ? applicant.profileImage
        : `http://localhost:5002/uploads/${applicant.profileImage}`
      : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const resumeLink =
    applicant?.resume
      ? applicant.resume.startsWith(
          "http"
        )
        ? applicant.resume
        : `http://localhost:5002/uploads/${applicant.resume}`
      : "";

  return (

    <div className="min-h-screen bg-[#050816] text-white pt-28 pb-16 px-4 md:px-8">

      <div className="max-w-7xl mx-auto">

        {/* ===================== */}
        {/* TOP BAR */}
        {/* ===================== */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <button
            onClick={() =>
              navigate(
                "/recruiter/my-jobs"
              )
            }
            className="w-fit flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition duration-300"
          >

            <FaArrowLeft />

            Back To My Jobs

          </button>

          <div
            className={`px-5 py-2 rounded-full text-sm font-semibold w-fit ${
              status === "Accepted"
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : status === "Rejected"
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
            }`}
          >

            {status}

          </div>

        </div>

        {/* ===================== */}
        {/* MAIN CARD */}
        {/* ===================== */}

        <div className="bg-white/5 border border-white/10 rounded-[35px] overflow-hidden backdrop-blur-xl shadow-2xl">

          {/* COVER */}

          <div className="h-44 bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-purple-500/20"></div>

          <div className="px-5 md:px-10 pb-10">

            <div className="flex flex-col xl:flex-row gap-10 -mt-24">

              {/* ===================== */}
              {/* LEFT SIDEBAR */}
              {/* ===================== */}

              <div className="xl:w-[32%]">

                <div className="bg-[#0b1120] border border-white/10 rounded-3xl p-7 text-center sticky top-28">

                  {/* IMAGE */}

                  <img
                    src={profileImage}
                    alt="profile"
                    className="w-44 h-44 rounded-full object-cover border-4 border-cyan-400 mx-auto shadow-2xl"
                  />

                  {/* NAME */}

                  <h1 className="text-3xl font-black mt-6">

                    {applicant?.fullName}

                  </h1>

                  {/* HEADLINE */}

                  <p className="text-cyan-400 mt-2 text-lg">

                    {applicant?.headline ||
                      "Candidate"}

                  </p>

                  {/* JOB */}

                  <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">

                    <FaBriefcase />

                    {
                      application?.job
                        ?.title
                    }

                  </div>

                  {/* INFO */}

                  <div className="mt-8 space-y-5 text-left">

                    <div className="flex items-start gap-4 text-gray-300">

                      <FaEnvelope className="text-cyan-400 mt-1" />

                      <span className="break-all">

                        {applicant?.email}

                      </span>

                    </div>

                    <div className="flex items-start gap-4 text-gray-300">

                      <FaPhone className="text-cyan-400 mt-1" />

                      <span>

                        {applicant?.phone ||
                          "N/A"}

                      </span>

                    </div>

                    <div className="flex items-start gap-4 text-gray-300">

                      <FaMapMarkerAlt className="text-cyan-400 mt-1" />

                      <span>

                        {applicant?.location ||
                          "N/A"}

                      </span>

                    </div>

                    <div className="flex items-start gap-4 text-gray-300">

                      <FaClock className="text-cyan-400 mt-1" />

                      <span>

                        {applicant?.experience ||
                          "No Experience"}

                      </span>

                    </div>

                    <div className="flex items-start gap-4 text-gray-300">

                      <FaUserGraduate className="text-cyan-400 mt-1" />

                      <span>

                        {applicant?.education ||
                          "No Education Added"}

                      </span>

                    </div>

                  </div>

                  {/* ACTION BUTTONS */}

                  <div className="mt-8 flex flex-col gap-4">

                    <button
                      onClick={() =>
                        updateStatus(
                          "Accepted"
                        )
                      }
                      className="w-full py-3 rounded-2xl bg-green-500 hover:bg-green-600 transition font-semibold"
                    >

                      Accept Candidate

                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          "Rejected"
                        )
                      }
                      className="w-full py-3 rounded-2xl bg-red-500 hover:bg-red-600 transition font-semibold"
                    >

                      Reject Candidate

                    </button>

                  </div>

                </div>

              </div>

              {/* ===================== */}
              {/* RIGHT CONTENT */}
              {/* ===================== */}

              <div className="xl:w-[68%] space-y-8">

                {/* ABOUT */}

                <div className="bg-[#0b1120] border border-white/10 rounded-3xl p-7">

                  <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">

                    <FaUserTie className="text-cyan-400" />

                    About Candidate

                  </h2>

                  <p className="text-gray-300 leading-8 text-[16px]">

                    {applicant?.bio ||
                      "No bio added yet"}

                  </p>

                </div>

                {/* SKILLS */}

                <div className="bg-[#0b1120] border border-white/10 rounded-3xl p-7">

                  <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">

                    <FaCheckCircle className="text-cyan-400" />

                    Skills

                  </h2>

                  <div className="flex flex-wrap gap-4">

                    {applicant?.skills &&
                    applicant?.skills
                      .length > 0 ? (

                      applicant?.skills.map(
                        (
                          skill,
                          index
                        ) => (

                          <span
                            key={index}
                            className="px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-medium"
                          >

                            {skill}

                          </span>

                        )
                      )

                    ) : (

                      <p className="text-gray-400">

                        No skills added

                      </p>

                    )}

                  </div>

                </div>

                {/* LINKS */}

                <div className="bg-[#0b1120] border border-white/10 rounded-3xl p-7">

                  <h2 className="text-2xl font-bold mb-5">

                    Professional Links

                  </h2>

                  <div className="flex flex-wrap gap-4">

                    {applicant?.portfolio && (

                      <a
                        href={
                          applicant?.portfolio
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition flex items-center gap-3"
                      >

                        <FaGlobe />

                        Portfolio

                      </a>

                    )}

                    {applicant?.linkedin && (

                      <a
                        href={
                          applicant?.linkedin
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-3 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center gap-3"
                      >

                        <FaLinkedin />

                        LinkedIn

                      </a>

                    )}

                    {applicant?.github && (

                      <a
                        href={
                          applicant?.github
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-3 rounded-2xl bg-gray-500/10 hover:bg-gray-500/20 transition flex items-center gap-3"
                      >

                        <FaGithub />

                        GitHub

                      </a>

                    )}

                  </div>

                </div>

                {/* RESUME */}

                {applicant?.resume && (

                  <div className="bg-[#0b1120] border border-white/10 rounded-3xl p-7">

                    <h2 className="text-2xl font-bold mb-5">

                      Resume

                    </h2>

                    <div className="flex flex-wrap gap-4">

                      <a
                        href={resumeLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold flex items-center gap-3 hover:scale-105 transition"
                      >

                        <FaFilePdf />

                        View Resume

                      </a>

                      <a
                        href={resumeLink}
                        download
                        className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition"
                      >

                        Download Resume

                      </a>

                    </div>

                  </div>

                )}

                {/* FULL PROFILE */}

                <div>

                  <Link
                    to={`/candidate/profile/${applicant?._id}`}
                    className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition duration-300"
                  >

                    View Full Profile

                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ApplicantDetails;