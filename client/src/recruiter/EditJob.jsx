import {
  useState,
  useEffect,
} from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  motion,
} from "framer-motion";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

function EditJob() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      company: "",
      location: "",
      salary: "",
      type: "Full Time",
      experience: "",
      description: "",
      skills: "",
      status: "Active",
    });

  // =========================
  // FETCH SINGLE JOB
  // =========================

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const response =
        await axios.get(
          `http://localhost:5002/api/jobs/${id}`
        );

      const job = response.data.job;

      setFormData({
        title: job.title || "",
        company:
          job.company || "",
        location:
          job.location || "",
        salary:
          job.salary || "",
        type:
          job.type || "Full Time",
        experience:
          job.experience || "",
        description:
          job.description || "",
        skills:
          job.skills?.join(",") || "",
        status:
          job.status || "Active",
      });
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to load job"
      );
    }
  };

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // =========================
  // UPDATE JOB
  // =========================

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.put(
          `http://localhost:5002/api/jobs/update/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      toast.success(
        response.data.message
      );

      navigate(
        "/recruiter/my-jobs"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white pt-32 pb-20 px-6">

      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-2xl shadow-2xl"
        >

          <h1 className="text-4xl font-black mb-10">
            Edit Job
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
            />

            <input
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
            />

            <input
              type="number"
              name="salary"
              placeholder="Salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
            >
              <option>
                Full Time
              </option>

              <option>
                Part Time
              </option>

              <option>
                Internship
              </option>

              <option>
                Remote
              </option>
            </select>

            <input
              type="text"
              name="experience"
              placeholder="Experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
            />

            <textarea
              rows="6"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none resize-none"
            ></textarea>

            <input
              type="text"
              name="skills"
              placeholder="React, Node, MongoDB"
              value={formData.skills}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
            >
              <option>
                Active
              </option>

              <option>
                Closed
              </option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-lg"
            >
              {loading
                ? "Updating..."
                : "Update Job"}
            </button>

          </form>

        </motion.div>

      </div>

    </div>
  );
}

export default EditJob;