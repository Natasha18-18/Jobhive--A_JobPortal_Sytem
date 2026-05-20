import { useState, useEffect } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  FaVideo,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaLink,
  FaArrowLeft,
} from "react-icons/fa";

function InterviewSchedule() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [application, setApplication] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      date: "",
      hour: "10",
      minute: "00",
      ampm: "AM",
      mode: "Online",
      meetingLink: "",
      location: "",
      message: "",
    });

  useEffect(() => {

    fetchApplication();

  }, []);

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

      } catch (error) {

        toast.error(
          "Failed to load application"
        );

      }

    };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  // =========================
  // FORMAT DATE DD-MM-YYYY
  // =========================

  const formatDate = (date) => {

    if (!date) return "";

    const [year, month, day] =
      date.split("-");

    return `${day}-${month}-${year}`;

  };

  // =========================
  // HANDLE SUBMIT
  // =========================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        // FINAL TIME FORMAT
        const formattedTime =
          `${formData.hour}:${formData.minute} ${formData.ampm}`;

        const payload = {
          ...formData,

          date:
            formatDate(
              formData.date
            ),

          time:
            formattedTime,
        };

        const res =
          await axios.post(
            `http://localhost:5002/api/application/interview/${id}`,
            payload,
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

        navigate(-1);

      } catch (error) {

        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Interview scheduling failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-[#050816] text-white px-6 py-28">

      <div className="max-w-3xl mx-auto">

        {/* BACK */}

        <button
          onClick={() =>
            navigate(-1)
          }
          className="flex items-center gap-3 mb-8 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition"
        >

          <FaArrowLeft />

          Back

        </button>

        {/* CARD */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center">

              <FaVideo className="text-3xl text-cyan-400" />

            </div>

            <div>

              <h1 className="text-4xl font-black">

                Schedule Interview

              </h1>

              <p className="text-gray-400 mt-1">

                Candidate:
                {" "}
                <span className="text-cyan-400 font-semibold">

                  {
                    application?.applicant
                      ?.fullName
                  }

                </span>

              </p>

            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          >

            {/* DATE */}

            <div>

              <label className="flex items-center gap-2 mb-3 font-semibold text-lg">

                <FaCalendarAlt className="text-cyan-400" />

                Interview Date

              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl bg-[#0b1120] border border-white/10 outline-none focus:border-cyan-400 transition"
              />

              {formData.date && (

                <p className="text-cyan-400 mt-2 text-sm">

                  Selected:
                  {" "}
                  {
                    formatDate(
                      formData.date
                    )
                  }

                </p>

              )}

            </div>

            {/* TIME */}

            <div>

              <label className="flex items-center gap-2 mb-3 font-semibold text-lg">

                <FaClock className="text-cyan-400" />

                Interview Time

              </label>

              <div className="flex gap-4">

                {/* HOUR */}

                <select
                  name="hour"
                  value={formData.hour}
                  onChange={handleChange}
                  className="flex-1 px-5 py-4 rounded-2xl bg-[#0b1120] border border-white/10 outline-none"
                >

                  {Array.from(
                    { length: 12 },
                    (_, i) => {

                      const value =
                        String(
                          i + 1
                        ).padStart(
                          2,
                          "0"
                        );

                      return (
                        <option
                          key={value}
                          value={value}
                        >
                          {value}
                        </option>
                      );

                    }
                  )}

                </select>

                {/* MINUTE */}

                <select
                  name="minute"
                  value={formData.minute}
                  onChange={handleChange}
                  className="flex-1 px-5 py-4 rounded-2xl bg-[#0b1120] border border-white/10 outline-none"
                >

                  {[
                    "00",
                    "05",
                    "10",
                    "15",
                    "20",
                    "25",
                    "30",
                    "35",
                    "40",
                    "45",
                    "50",
                    "55",
                  ].map(
                    (minute) => (
                      <option
                        key={minute}
                        value={minute}
                      >
                        {minute}
                      </option>
                    )
                  )}

                </select>

                {/* AM PM */}

                <select
                  name="ampm"
                  value={formData.ampm}
                  onChange={handleChange}
                  className="flex-1 px-5 py-4 rounded-2xl bg-[#0b1120] border border-white/10 outline-none"
                >

                  <option value="AM">
                    AM
                  </option>

                  <option value="PM">
                    PM
                  </option>

                </select>

              </div>

              <p className="text-cyan-400 mt-2 text-sm">

                Selected Time:
                {" "}
                {formData.hour}:
                {formData.minute}
                {" "}
                {formData.ampm}

              </p>

            </div>

            {/* MODE */}

            <div>

              <label className="flex items-center gap-2 mb-3 font-semibold text-lg">

                <FaVideo className="text-cyan-400" />

                Interview Mode

              </label>

              <select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-[#0b1120] border border-white/10 outline-none focus:border-cyan-400 transition"
              >

                <option>
                  Online
                </option>

                <option>
                  Offline
                </option>

              </select>

            </div>

            {/* ONLINE */}

            {formData.mode ===
              "Online" && (

              <div>

                <label className="flex items-center gap-2 mb-3 font-semibold text-lg">

                  <FaLink className="text-cyan-400" />

                  Meeting Link

                </label>

                <input
                  type="text"
                  name="meetingLink"
                  value={formData.meetingLink}
                  onChange={handleChange}
                  required
                  placeholder="https://meet.google.com/..."
                  className="w-full px-5 py-4 rounded-2xl bg-[#0b1120] border border-white/10 outline-none focus:border-cyan-400 transition"
                />

              </div>
            )}

            {/* OFFLINE */}

            {formData.mode ===
              "Offline" && (

              <div>

                <label className="flex items-center gap-2 mb-3 font-semibold text-lg">

                  <FaMapMarkerAlt className="text-cyan-400" />

                  Interview Location

                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Office address"
                  className="w-full px-5 py-4 rounded-2xl bg-[#0b1120] border border-white/10 outline-none focus:border-cyan-400 transition"
                />

              </div>
            )}

            {/* MESSAGE */}

            <div>

              <label className="block mb-3 font-semibold text-lg">

                Additional Message

              </label>

              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Interview instructions..."
                className="w-full px-5 py-4 rounded-2xl bg-[#0b1120] border border-white/10 outline-none focus:border-cyan-400 transition resize-none"
              />

            </div>

            {/* BUTTON */}

            <button
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-black text-lg hover:scale-[1.01] transition disabled:opacity-60"
            >

              {
                loading
                  ? "Sending Invite..."
                  : "Send Interview Invite"
              }

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default InterviewSchedule;