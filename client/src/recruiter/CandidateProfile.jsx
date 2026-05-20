import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaUserTie,
  FaMapMarkerAlt,
  FaGlobe,
  FaLinkedin,
  FaGithub,
  FaFilePdf,
} from "react-icons/fa";

function CandidateProfile() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [candidate, setCandidate] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

    const handleSubmit = async (
  e
) => {

  e.preventDefault();

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    await axios.put(
      "http://localhost:5002/api/user/candidate/update",

      {
        fullName,
        phone,
        headline,
        bio,
        location,
        experience,
        portfolio,
        linkedin,
        github,
        resume,

        skills:
          skills
            .split(",")
            .map((s) =>
              s.trim()
            ),
      },

      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    toast.success(
      "Profile Updated"
    );

  } catch (error) {

    toast.error(
      "Update failed"
    );

  }

};

  useEffect(() => {

    fetchCandidate();

  }, []);

  const fetchCandidate =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            `http://localhost:5002/api/auth/candidate/${id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setCandidate(
          res.data.user
        );

      } catch (error) {

        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to load profile"
        );

      } finally {

        setLoading(false);

      }

    };

  if (loading) {

    return (

      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white text-2xl">

        Loading...

      </div>
    );

  }

  return (

    <div className="min-h-screen bg-[#050816] text-white pt-28 pb-20 px-6">

      <div className="max-w-5xl mx-auto">

        {/* BACK BUTTON */}

        <button
          onClick={() =>
            navigate(-1)
          }
          className="mb-8 flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10"
        >

          <FaArrowLeft />

          Back

        </button>

        {/* PROFILE CARD */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">

          {/* TOP */}

          <div className="flex flex-col md:flex-row items-center gap-8">

            <img
              src={
                candidate?.profileImage ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt=""
              className="w-40 h-40 rounded-full object-cover border-4 border-cyan-400"
            />

            <div>

              <h1 className="text-5xl font-black">

                {candidate?.fullName}

              </h1>

              <p className="text-cyan-400 text-xl mt-2">

                {candidate?.headline ||
                  "Candidate"}

              </p>

              <div className="mt-5 space-y-3 text-gray-300">

                <p className="flex items-center gap-3">

                  <FaEnvelope />

                  {candidate?.email}

                </p>

                <p className="flex items-center gap-3">

                  <FaPhone />

                  {candidate?.phone ||
                    "N/A"}

                </p>

                <p className="flex items-center gap-3">

                  <FaMapMarkerAlt />

                  {candidate?.location ||
                    "N/A"}

                </p>

              </div>

            </div>

          </div>

          {/* ABOUT */}

          <div className="mt-12">

            <h2 className="text-3xl font-black mb-4">

              About

            </h2>

            <p className="text-gray-300 leading-8">

              {candidate?.bio ||
                "No bio added"}

            </p>

          </div>

          {/* SKILLS */}

          <div className="mt-12">

            <h2 className="text-3xl font-black mb-6">

              Skills

            </h2>

            <div className="flex flex-wrap gap-4">

              {candidate?.skills?.length >
              0 ? (

                candidate.skills.map(
                  (
                    skill,
                    index
                  ) => (

                    <span
                      key={index}
                      className="px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-semibold"
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

          <div className="mt-12">

            <h2 className="text-3xl font-black mb-6">

              Links

            </h2>

            <div className="flex flex-wrap gap-5">

              {candidate?.portfolio && (

                <a
                  href={
                    candidate.portfolio
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10"
                >

                  <FaGlobe />

                  Portfolio

                </a>
              )}

              {candidate?.linkedin && (

                <a
                  href={
                    candidate.linkedin
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-500/10 text-blue-400"
                >

                  <FaLinkedin />

                  LinkedIn

                </a>
              )}

              {candidate?.github && (

                <a
                  href={
                    candidate.github
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gray-500/10"
                >

                  <FaGithub />

                  GitHub

                </a>
              )}

              {candidate?.resume && (

                <a
                  href={
                    candidate.resume
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-500/10 text-red-400"
                >

                  <FaFilePdf />

                  Resume

                </a>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CandidateProfile;