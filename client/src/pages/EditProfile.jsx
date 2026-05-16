import { useState } from "react";

import { motion } from "framer-motion";

import {
  FaUserCircle,
  FaCamera,
  FaFileUpload,
  FaPlus,
  FaTrash,
  FaSave,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaGlobe,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function EditProfile() {

  const [skills, setSkills] = useState([
    "React",
    "Node.js",
    "Tailwind CSS",
  ]);

  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim() !== "") {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
  };

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] pt-32 pb-20 px-6">

        {/* BG */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full"></div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* HEADING */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-center mb-14"
          >

            <h1 className="text-5xl font-black text-white">

              Edit Your Profile

            </h1>

            <p className="mt-4 text-gray-400 text-lg">

              Update your profile and stand out to recruiters

            </p>

          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT SIDEBAR */}
            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-2xl h-fit"
            >

              {/* PROFILE IMAGE */}
              <div className="flex flex-col items-center">

                <div className="relative">

                  <div className="w-36 h-36 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-7xl shadow-2xl">

                    <FaUserCircle />

                  </div>

                  <label className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-white cursor-pointer shadow-xl">

                    <FaCamera />

                    <input
                      type="file"
                      className="hidden"
                    />

                  </label>

                </div>

                <h2 className="mt-6 text-2xl font-bold text-white">
                  Harsh Sharma
                </h2>

                <p className="text-cyan-400 mt-1">
                  Frontend Developer
                </p>

              </div>

              {/* RESUME */}
              <div className="mt-10">

                <h3 className="text-white font-semibold text-lg mb-4">

                  Resume

                </h3>

                <label className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 py-4 rounded-2xl text-white font-semibold cursor-pointer shadow-xl hover:shadow-cyan-500/30 transition-all duration-300">

                  <FaFileUpload />

                  Upload Resume

                  <input
                    type="file"
                    className="hidden"
                  />

                </label>

              </div>

              {/* QUICK INFO */}
              <div className="mt-10 space-y-5">

                <div className="flex items-center gap-4 text-gray-300">

                  <FaMapMarkerAlt className="text-cyan-400" />

                  Haryana, India

                </div>

                <div className="flex items-center gap-4 text-gray-300">

                  <FaBriefcase className="text-cyan-400" />

                  2 Years Experience

                </div>

                <div className="flex items-center gap-4 text-gray-300">

                  <FaGraduationCap className="text-cyan-400" />

                  B.Tech CSE

                </div>

              </div>

            </motion.div>

            {/* RIGHT CONTENT */}
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-2xl"
            >

              {/* BASIC INFO */}
              <div>

                <h2 className="text-3xl font-bold text-white mb-8">

                  Basic Information

                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                  <input
                    type="text"
                    placeholder="Full Name"
                    className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-gray-500 focus:border-cyan-400"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-gray-500 focus:border-cyan-400"
                  />

                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-gray-500 focus:border-cyan-400"
                  />

                  <input
                    type="text"
                    placeholder="Job Role"
                    className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-gray-500 focus:border-cyan-400"
                  />

                </div>

              </div>

              {/* BIO */}
              <div className="mt-12">

                <h2 className="text-3xl font-bold text-white mb-6">

                  Bio

                </h2>

                <textarea
                  rows="6"
                  placeholder="Write something about yourself..."
                  className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 outline-none text-white placeholder:text-gray-500 focus:border-cyan-400 resize-none"
                ></textarea>

              </div>

              {/* SOCIAL LINKS */}
              <div className="mt-12">

                <h2 className="text-3xl font-bold text-white mb-6">

                  Social Links

                </h2>

                <div className="space-y-5">

                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

                    <FaGlobe className="text-cyan-400" />

                    <input
                      type="text"
                      placeholder="Portfolio Website"
                      className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                    />

                  </div>

                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

                    <FaLinkedin className="text-cyan-400" />

                    <input
                      type="text"
                      placeholder="LinkedIn Profile"
                      className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                    />

                  </div>

                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

                    <FaGithub className="text-cyan-400" />

                    <input
                      type="text"
                      placeholder="GitHub Profile"
                      className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                    />

                  </div>

                </div>

              </div>

              {/* SKILLS */}
              <div className="mt-12">

                <h2 className="text-3xl font-bold text-white mb-6">

                  Skills

                </h2>

                {/* ADD SKILL */}
                <div className="flex gap-4">

                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Add a skill"
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-gray-500 focus:border-cyan-400"
                  />

                  <button
                    onClick={addSkill}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 rounded-2xl text-white text-xl shadow-xl"
                  >

                    <FaPlus />

                  </button>

                </div>

                {/* SKILLS LIST */}
                <div className="flex flex-wrap gap-4 mt-8">

                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-400/20 px-5 py-3 rounded-2xl text-cyan-300"
                    >

                      {skill}

                      <button
                        onClick={() => removeSkill(index)}
                        className="text-red-400 hover:text-red-500"
                      >

                        <FaTrash />

                      </button>

                    </div>
                  ))}

                </div>

              </div>

              {/* SAVE BUTTON */}
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="mt-14 w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-5 rounded-2xl text-white font-bold text-lg shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-4"
              >

                <FaSave />

                Save Profile

              </motion.button>

            </motion.div>

          </div>

        </div>

      </section>

    </>
  );
}

export default EditProfile;