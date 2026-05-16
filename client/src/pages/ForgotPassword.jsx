import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import API from "../utils/api";

import {
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaArrowRight,
  FaCheckCircle,
  FaBriefcase,
} from "react-icons/fa";

function ForgotPassword() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // STEP 1 VALIDATION
  const validateEmail = () => {

    let newErrors = {};

    if (!formData.email.trim()) {

      newErrors.email = "Email is required";

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  // STEP 2 VALIDATION
  const validateOtp = () => {

    let newErrors = {};

    if (!formData.otp.trim()) {

      newErrors.otp = "OTP is required";

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  // STEP 3 VALIDATION
  const validatePassword = () => {

    let newErrors = {};

    if (!formData.password) {

      newErrors.password = "Password is required";

    }

    else if (formData.password.length < 8) {

      newErrors.password =
        "Password must be at least 8 characters";

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
  const handleSendOtp = async () => {

    if (!validateEmail()) return;

    try {

      setLoading(true);

      const { data } = await API.post(
        "/auth/send-forgot-otp",
        {
          email: formData.email,
        }
      );

      if (data.success) {

        toast.success(
          data.message || "OTP sent successfully"
        );

        setStep(2);

      }

    }

    catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to send OTP"
      );

    }

    finally {

      setLoading(false);

    }

  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {

    if (!validateOtp()) return;

    try {

      setLoading(true);

      const { data } = await API.post(
        "/auth/verify-forgot-otp",
        {
          email: formData.email,
          otp: formData.otp,
        }
      );

      if (data.success) {

        toast.success(
          data.message || "OTP verified"
        );

        setStep(3);

      }

    }

    catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Invalid OTP"
      );

    }

    finally {

      setLoading(false);

    }

  };

  // RESET PASSWORD
  const handleResetPassword = async (e) => {

    e.preventDefault();

    if (!validatePassword()) return;

    try {

      setLoading(true);

      const { data } = await API.post(
        "/auth/reset-password",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (data.success) {

        toast.success(
          data.message || "Password reset successful"
        );

        navigate("/login");

      }

    }

    catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to reset password"
      );

    }

    finally {

      setLoading(false);

    }

  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] px-6 pt-32 pb-20 min-h-screen flex items-center justify-center">

        {/* BACKGROUND */}
        <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-blue-600/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-500/10 blur-3xl rounded-full"></div>

        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        <div className="max-w-5xl w-full grid lg:grid-cols-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] overflow-hidden shadow-2xl relative z-10">

          {/* LEFT SIDE */}
          <div className="hidden lg:flex flex-col justify-center p-14 relative overflow-hidden">

            <div className="absolute top-10 left-10 w-60 h-60 bg-blue-500/20 blur-3xl rounded-full"></div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
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
                    Secure Password Recovery
                  </p>

                </div>

              </div>

              {/* TITLE */}
              <h2 className="mt-14 text-5xl font-black leading-tight text-white">

                Reset Your

                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">

                  Password Securely

                </span>

              </h2>

              <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-md">

                Verify your identity with OTP and create a new secure password
                to regain access to your account.

              </p>

              {/* FEATURES */}
              <div className="mt-10 space-y-5">

                {[
                  "Secure OTP Verification",
                  "Fast Password Recovery",
                  "Protected User Authentication",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 text-gray-300"
                  >

                    <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-cyan-400">

                      <FaCheckCircle />

                    </div>

                    <span>{item}</span>

                  </div>
                ))}

              </div>

            </motion.div>

          </div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-[#0f172a]/80 backdrop-blur-2xl p-8 md:p-14 flex flex-col justify-center"
          >

            {/* HEADING */}
            <div className="text-center">

              <h2 className="text-4xl font-black text-white">

                Forgot Password

              </h2>

              <p className="mt-3 text-gray-400">

                Recover your account in a few easy steps

              </p>

            </div>

            {/* STEP INDICATOR */}
            <div className="flex items-center justify-center gap-4 mt-10">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-bold transition ${
                    step >= item
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                      : "bg-white/10 text-gray-400"
                  }`}
                >

                  {item}

                </div>
              ))}

            </div>

            {/* FORM */}
            <form
              onSubmit={handleResetPassword}
              className="mt-10 space-y-6"
            >

              {/* STEP 1 */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >

                  <div>

                    <label className="text-gray-300 text-sm mb-3 block">

                      Email Address

                    </label>

                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

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

                  </div>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSendOtp}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-4 rounded-2xl font-semibold shadow-2xl flex items-center justify-center gap-3 text-white"
                  >

                    {loading
                      ? "Sending OTP..."
                      : "Send OTP"}

                    <FaArrowRight />

                  </motion.button>

                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >

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

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleVerifyOtp}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-4 rounded-2xl font-semibold shadow-2xl flex items-center justify-center gap-3 text-white"
                  >

                    {loading
                      ? "Verifying..."
                      : "Verify OTP"}

                    <FaArrowRight />

                  </motion.button>

                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >

     {/* PASSWORD */}
<div>

  <label className="text-gray-300 text-sm mb-3 block">

    New Password

  </label>

  <div
    className={`flex items-center gap-4 bg-white/5 border rounded-2xl px-5 py-4 ${
      errors.password
        ? "border-red-500"
        : "border-white/10"
    }`}
  >

    <FaLock className="text-cyan-400" />

    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Enter new password"
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

  <div
    className={`flex items-center gap-4 bg-white/5 border rounded-2xl px-5 py-4 ${
      errors.confirmPassword
        ? "border-red-500"
        : "border-white/10"
    }`}
  >

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

                  <div>

                    <label className="text-gray-300 text-sm mb-3 block">

                      Confirm Password

                    </label>

                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

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

                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 py-4 rounded-2xl font-semibold shadow-2xl flex items-center justify-center gap-3 text-white"
                  >

                    {loading
                      ? "Resetting..."
                      : "Reset Password"}

                    <FaArrowRight />

                  </motion.button>

                </motion.div>
              )}

            </form>

            {/* LOGIN LINK */}
            <p className="text-center mt-10 text-gray-400">

              Remember your password?

              <Link
                to="/login"
                className="text-cyan-400 hover:text-cyan-300 ml-2 font-semibold transition"
              >

                Back to Login

              </Link>

            </p>

          </motion.div>

        </div>

      </section>
    </>
  );
}

export default ForgotPassword;