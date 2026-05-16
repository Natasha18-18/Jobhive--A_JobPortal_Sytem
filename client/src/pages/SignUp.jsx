import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import toast from "react-hot-toast";

import API from "../utils/api";

import {
  FaBriefcase,
  FaEnvelope,
  FaLock,
  FaUser,
  FaShieldAlt,
  FaArrowRight,
  FaCheckCircle,
  FaPhoneAlt,
  FaUserTie,
} from "react-icons/fa";

function Signup() {
  const [showOtp, setShowOtp] = useState(false);

  const [role, setRole] = useState("candidate");

  const [otpTimer, setOtpTimer] = useState(60);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});

  // OTP TIMER
  useEffect(() => {
    let interval;

    if (showOtp && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [showOtp, otpTimer]);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // REMOVE ERROR WHILE TYPING
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // VALIDATION
  const validateForm = () => {
    let newErrors = {};

    // FULL NAME
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // EMAIL
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    // PHONE
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter valid 10 digit phone number";
    }

    // PASSWORD
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    else if (formData.password.length < 8) {
      newErrors.password =
        "Password must be minimum 8 characters";
    }

    else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain 1 uppercase letter";
    }

    else if (!/[0-9]/.test(formData.password)) {
      newErrors.password =
        "Password must contain 1 number";
    }

    else if (!/[!@#$%^&*]/.test(formData.password)) {
      newErrors.password =
        "Password must contain 1 special character";
    }

    // CONFIRM PASSWORD
    if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

// SEND OTP
const handleCreateAccount = async () => {

  if (!validateForm()) return;

  try {

    setLoading(true);

    const { data } = await API.post(
      "/auth/send-otp",
      {
        email: formData.email,
      }
    );

    // SUCCESS
    if (data.success) {

      toast.success(
        data.message || "OTP sent successfully ✨"
      );

      setShowOtp(true);

      setOtpTimer(60);

    }

    // USER EXISTS
    else {

      toast.error(
        data.message || "User already exists"
      );

    }

  }

  catch (error) {

    const message =
      error.response?.data?.message ||
      "Failed to send OTP";

    toast.error(message);

  }

  finally {

    setLoading(false);

  }

};

// VERIFY OTP + REGISTER
const handleVerifyOtp = async (e) => {

  e.preventDefault();

  if (!formData.otp) {

    toast.error("Enter OTP");

    return;

  }

  try {

    setLoading(true);

    const { data } = await API.post(
      "/auth/register",
      {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        otp: formData.otp,
        role,
      }
    );

    // ACCOUNT CREATED
    if (data.success) {

      toast.success(
        data.message ||
        "Account created successfully 🎉"
      );

      console.log(data);

    }

    else {

      toast.error(
        data.message ||
        "Registration failed"
      );

    }

  }

  catch (error) {

    const message =
      error.response?.data?.message ||
      "OTP verification failed";

    toast.error(message);

  }

  finally {

    setLoading(false);

  }

};
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] min-h-screen pt-32 pb-20 px-6">

      {/* BG */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-blue-600/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        <div className="grid lg:grid-cols-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] overflow-hidden shadow-2xl">

          {/* LEFT */}
          <div className="hidden lg:flex flex-col justify-center p-14 relative overflow-hidden">

            <div className="absolute top-10 left-10 w-60 h-60 bg-blue-500/20 blur-3xl rounded-full"></div>

            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="relative z-10"
            >

              {/* LOGO */}
              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-2xl text-white text-2xl">

                  <FaBriefcase />

                </div>

                <div>

                  <h1 className="text-4xl font-black text-white">

                    Job<span className="text-cyan-400">Portal</span>

                  </h1>

                  <p className="text-gray-400 mt-1">
                    Modern Hiring Platform
                  </p>

                </div>

              </div>

              {/* TITLE */}
              <h2 className="mt-14 text-5xl leading-tight font-black text-white">

                Create Your

                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">

                  Dream Career

                </span>

              </h2>

            </motion.div>

          </div>

          {/* RIGHT */}
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
              duration: 0.7,
            }}
            className="bg-[#0f172a]/80 backdrop-blur-2xl p-8 md:p-14 flex flex-col justify-center"
          >

            {/* HEADING */}
            <div className="text-center">

              <h2 className="text-4xl font-black text-white">

                Create Account

              </h2>

              <p className="mt-3 text-gray-400">

                Start your journey with JobPortal

              </p>

            </div>

            {/* ROLE SELECT */}
            <div className="mt-8 grid grid-cols-2 gap-4">

              <button
                type="button"
                onClick={() => setRole("candidate")}
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  role === "candidate"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 border-cyan-400 text-white"
                    : "bg-white/5 border-white/10 text-gray-300"
                }`}
              >

                <FaUser className="mx-auto text-2xl mb-2" />

                Candidate

              </button>

              <button
                type="button"
                onClick={() => setRole("recruiter")}
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  role === "recruiter"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 border-cyan-400 text-white"
                    : "bg-white/5 border-white/10 text-gray-300"
                }`}
              >

                <FaUserTie className="mx-auto text-2xl mb-2" />

                Recruiter

              </button>

            </div>

            {/* FORM */}
            <form className="mt-10 space-y-6">

              {/* FULL NAME */}
              <div>

                <label className="text-gray-300 text-sm mb-3 block">
                  Full Name
                </label>

                <div className={`flex items-center gap-4 bg-white/5 border rounded-2xl px-5 py-4 ${
                  errors.fullName
                    ? "border-red-500"
                    : "border-white/10"
                }`}>

                  <FaUser className="text-cyan-400" />

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                  />

                </div>

                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.fullName}
                  </p>
                )}

              </div>

              {/* EMAIL */}
              <div>

                <label className="text-gray-300 text-sm mb-3 block">
                  Email Address
                </label>

                <div className={`flex items-center gap-4 bg-white/5 border rounded-2xl px-5 py-4 ${
                  errors.email
                    ? "border-red-500"
                    : "border-white/10"
                }`}>

                  <FaEnvelope className="text-cyan-400" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                  />

                </div>

                {errors.email && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.email}
                  </p>
                )}

              </div>

              {/* PHONE */}
              <div>

                <label className="text-gray-300 text-sm mb-3 block">
                  Phone Number
                </label>

                <div className={`flex items-center gap-4 bg-white/5 border rounded-2xl px-5 py-4 ${
                  errors.phone
                    ? "border-red-500"
                    : "border-white/10"
                }`}>

                  <FaPhoneAlt className="text-cyan-400" />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                  />

                </div>

                {errors.phone && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.phone}
                  </p>
                )}

              </div>

              {/* PASSWORD */}
              <div>

                <label className="text-gray-300 text-sm mb-3 block">
                  Password
                </label>

                <div className={`flex items-center gap-4 bg-white/5 border rounded-2xl px-5 py-4 ${
                  errors.password
                    ? "border-red-500"
                    : "border-white/10"
                }`}>

                  <FaLock className="text-cyan-400" />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                  />

                </div>

                {errors.password && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.password}
                  </p>
                )}

              </div>

              {/* CONFIRM PASSWORD */}
              <div>

                <label className="text-gray-300 text-sm mb-3 block">
                  Confirm Password
                </label>

                <div className={`flex items-center gap-4 bg-white/5 border rounded-2xl px-5 py-4 ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-white/10"
                }`}>

                  <FaLock className="text-cyan-400" />

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                  />

                </div>

                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.confirmPassword}
                  </p>
                )}

              </div>

              {/* OTP SECTION */}
              {showOtp && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="space-y-6"
                >

                  <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-2xl px-5 py-4 text-cyan-300 text-sm">

                    OTP has been sent to your email.

                  </div>

                  <div>

                    <label className="text-gray-300 text-sm mb-3 block">
                      Enter OTP
                    </label>

                    <div className="flex items-center gap-4 bg-white/5 border border-cyan-400/30 rounded-2xl px-5 py-4">

                      <FaShieldAlt className="text-cyan-400" />

                      <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        placeholder="Enter OTP"
                        className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                      />

                    </div>

                  </div>

                  <div className="flex items-center justify-between">

                    <p className="text-gray-400 text-sm">

                      {otpTimer > 0
                        ? `Resend OTP in ${otpTimer}s`
                        : "Didn't receive OTP?"}

                    </p>

                    {otpTimer <= 0 && (
                      <button
                        type="button"
                        onClick={handleCreateAccount}
                        className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
                      >

                        Resend OTP

                      </button>
                    )}

                  </div>

                  <motion.button
                    type="button"
                    onClick={handleVerifyOtp}
                    whileHover={{
                      scale: 1.01,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-3"
                  >

                    {loading
                      ? "Verifying..."
                      : "Verify & Create Account"}

                    <FaArrowRight />

                  </motion.button>

                </motion.div>
              )}

              {/* CREATE BUTTON */}
              {!showOtp && (
                <motion.button
                  type="button"
                  whileHover={{
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={handleCreateAccount}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-3"
                >

                  {loading
                    ? "Sending OTP..."
                    : "Create Account"}

                  <FaArrowRight />

                </motion.button>
              )}

            </form>

            {/* LOGIN */}
            <p className="text-center mt-8 text-gray-400">

              Already have an account?

              <Link
                to="/login"
                className="text-cyan-400 hover:text-cyan-300 ml-2 font-semibold transition"
              >

                Login

              </Link>

            </p>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

export default Signup;