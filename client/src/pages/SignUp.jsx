import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import toast from "react-hot-toast";

import API from "../utils/api";

import {
  FaBriefcase,
  FaEnvelope,
  FaLock,
  FaUser,
  FaShieldAlt,
  FaArrowRight,
  FaPhoneAlt,
  FaUserTie,
  FaCheckCircle,
  FaHome,
  FaEye,
  FaEyeSlash,
  FaRocket,
  FaStar,
} from "react-icons/fa";

function Signup() {

  const navigate = useNavigate();

  const [showOtp, setShowOtp] = useState(false);

  const [role, setRole] =
    useState("candidate");

  const [otpTimer, setOtpTimer] =
    useState(60);

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [passwordStrength,
    setPasswordStrength] =
    useState("");

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      otp: "",
    });

  const [errors, setErrors] =
    useState({});

  // =========================
  // OTP TIMER
  // =========================

  useEffect(() => {

    let interval;

    if (
      showOtp &&
      otpTimer > 0
    ) {

      interval = setInterval(() => {

        setOtpTimer(
          (prev) => prev - 1
        );

      }, 1000);

    }

    return () =>
      clearInterval(interval);

  }, [showOtp, otpTimer]);

  // =========================
  // PASSWORD STRENGTH
  // =========================

  useEffect(() => {

    const password =
      formData.password;

    if (password.length < 6) {

      setPasswordStrength("Weak");

    }

    else if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*]/.test(password)
    ) {

      setPasswordStrength("Strong");

    }

    else {

      setPasswordStrength("Medium");

    }

  }, [formData.password]);

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });

  };

  // =========================
  // VALIDATION
  // =========================

  const validateForm = () => {

    let newErrors = {};

    if (
      !formData.fullName.trim()
    ) {

      newErrors.fullName =
        "Full name is required";

    }

    if (
      !formData.email.trim()
    ) {

      newErrors.email =
        "Email is required";

    }

    if (
      !/^[6-9]\d{9}$/.test(
        formData.phone
      )
    ) {

      newErrors.phone =
        "Enter valid 10 digit phone number";

    }

    if (!formData.password) {

      newErrors.password =
        "Password is required";

    }

    else if (
      formData.password.length < 8
    ) {

      newErrors.password =
        "Minimum 8 characters required";

    }

    else if (
      !/[A-Z]/.test(
        formData.password
      )
    ) {

      newErrors.password =
        "Add 1 uppercase letter";

    }

    else if (
      !/[0-9]/.test(
        formData.password
      )
    ) {

      newErrors.password =
        "Add 1 number";

    }

    else if (
      !/[!@#$%^&*]/.test(
        formData.password
      )
    ) {

      newErrors.password =
        "Add 1 special character";

    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      newErrors.confirmPassword =
        "Passwords do not match";

    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );

  };

  // =========================
  // SEND OTP
  // =========================

  const handleCreateAccount =
    async () => {

      if (!validateForm())
        return;

      try {

        setLoading(true);

        const { data } =
          await API.post(
            "/auth/send-otp",
            {
              email:
                formData.email,
            }
          );

        if (data.success) {

          toast.success(
            data.message ||
            "OTP sent successfully ✨"
          );

          setShowOtp(true);

          setOtpTimer(60);

        }

        else {

          toast.error(
            data.message ||
            "User already exists"
          );

        }

      }

      catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
          "Failed to send OTP"
        );

      }

      finally {

        setLoading(false);

      }

    };

  // =========================
  // VERIFY OTP
  // =========================

const handleVerifyOtp = async (e) => {

  e.preventDefault();

  if (!formData.otp) {

    setErrors({
      otp: "Enter OTP",
    });

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

    if (data.success) {

      toast.success(
        data.message ||
        "Account created successfully 🎉"
      );

      navigate("/login");

    } else {

      toast.error(data.message);

    }

  } catch (error) {

    const message =
      error.response?.data?.message;

    // EMAIL EXISTS
    if (
      message?.toLowerCase().includes("exists")
    ) {

      setErrors((prev) => ({
        ...prev,
        email: message,
      }));

    }

    // WRONG OTP
    else if (
      message?.toLowerCase().includes("otp")
    ) {

      setErrors((prev) => ({
        ...prev,
        otp: message,
      }));

    }

    else {

      toast.error(
        message || "Registration failed"
      );

    }

  } finally {

    setLoading(false);

  }

};
  return (

    <section className="relative overflow-hidden bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] min-h-screen pt-24 pb-20 px-6">

      {/* BG EFFECTS */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-blue-600/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="grid lg:grid-cols-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.08)]"
        >

          {/* LEFT */}
          <div className="hidden lg:flex flex-col justify-start p-14 pt-6 relative overflow-hidden">

            <div className="absolute top-10 left-10 w-60 h-60 bg-blue-500/20 blur-3xl rounded-full"></div>

            <div className="relative z-10">

              {/* LOGO */}
              <motion.div
                initial={{
                  scale: 0.8,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.6,
                }}
                className="flex items-center gap-4"
              >

                <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-2xl text-white text-2xl">

                  <FaBriefcase />

                </div>

                <div>

                  <h1 className="text-4xl font-black text-white">

                    Job
                    <span className="text-cyan-400">
                      Portal
                    </span>

                  </h1>

                  <p className="text-gray-400 mt-1">

                    Modern Hiring Platform

                  </p>

                </div>

              </motion.div>

              {/* TITLE */}
              <motion.h2
                initial={{
                  opacity: 0,
                  x: -40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.2,
                }}
                className="mt-14 text-5xl leading-tight font-black text-white"
              >

                Create Your

                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">

                  Dream Career

                </span>

              </motion.h2>

              <p className="mt-6 text-lg text-gray-300 leading-relaxed">

                Join thousands of candidates &
                recruiters building their future
                with JobPortal.

              </p>

              {/* FEATURES */}
              <div className="mt-10 space-y-5">

                <div className="flex items-center gap-4 text-white">

                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">

                    <FaRocket />

                  </div>

                  <div>

                    <h4 className="font-semibold">
                      Fast Hiring
                    </h4>

                    <p className="text-sm text-gray-400">
                      Apply instantly to top jobs
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-4 text-white">

                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">

                    <FaStar />

                  </div>

                  <div>

                    <h4 className="font-semibold">
                      Premium Experience
                    </h4>

                    <p className="text-sm text-gray-400">
                      Interactive & modern UI
                    </p>

                  </div>

                </div>

              </div>

            </div>

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

            {/* HEADER */}
            <div className="text-center">

              <motion.h2
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="text-4xl font-black text-white"
              >

                Create Account

              </motion.h2>

              <p className="mt-3 text-gray-400">

                Start your journey with JobPortal

              </p>

            </div>

            {/* ROLE SELECT */}
            <div className="mt-8 grid grid-cols-2 gap-4">

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                type="button"
                onClick={() =>
                  setRole(
                    "candidate"
                  )
                }
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  role === "candidate"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 border-cyan-400 text-white shadow-xl"
                    : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                }`}
              >

                <FaUser className="mx-auto text-2xl mb-2" />

                Candidate

              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                type="button"
                onClick={() =>
                  setRole(
                    "recruiter"
                  )
                }
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  role === "recruiter"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 border-cyan-400 text-white shadow-xl"
                    : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                }`}
              >

                <FaUserTie className="mx-auto text-2xl mb-2" />

                Recruiter

              </motion.button>

            </div>

            {/* FORM */}
            <form className="mt-10 space-y-5">

              {/* FULL NAME */}
              <InputField
                label="Full Name"
                icon={<FaUser />}
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                error={errors.fullName}
              />

              {/* EMAIL */}
              <InputField
                label="Email Address"
                icon={<FaEnvelope />}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                error={errors.email}
              />

              {/* PHONE */}
              <InputField
                label="Phone Number"
                icon={<FaPhoneAlt />}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                error={errors.phone}
              />

              {/* PASSWORD */}
              <div>

                <label className="text-gray-300 text-sm mb-3 block">

                  Password

                </label>

                <div className={`flex items-center gap-4 bg-white/5 border rounded-2xl px-5 py-4 transition-all ${
                  errors.password
                    ? "border-red-500"
                    : "border-white/10 focus-within:border-cyan-400"
                }`}>

                  <FaLock className="text-cyan-400" />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={
                      formData.password
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Create password"
                    className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="text-gray-400 hover:text-cyan-400"
                  >

                    {showPassword
                      ? <FaEyeSlash />
                      : <FaEye />}

                  </button>

                </div>

                {formData.password && (
                  <div className="mt-3">

                    <div className="flex items-center justify-between">

                      <p className="text-sm text-gray-400">

                        Password Strength

                      </p>

                      <p className={`text-sm font-semibold ${
                        passwordStrength === "Strong"
                          ? "text-green-400"
                          : passwordStrength === "Medium"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}>

                        {passwordStrength}

                      </p>

                    </div>

                    <div className="w-full h-2 bg-white/10 rounded-full mt-2 overflow-hidden">

                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          passwordStrength === "Strong"
                            ? "w-full bg-green-500"
                            : passwordStrength === "Medium"
                            ? "w-2/3 bg-yellow-500"
                            : "w-1/3 bg-red-500"
                        }`}
                      ></div>

                    </div>

                  </div>
                )}

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
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={
                      formData.confirmPassword
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Confirm password"
                    className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="text-gray-400 hover:text-cyan-400"
                  >

                    {showConfirmPassword
                      ? <FaEyeSlash />
                      : <FaEye />}

                  </button>

                </div>

                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-2">

                    {errors.confirmPassword}

                  </p>
                )}

              </div>

              {/* OTP SECTION */}
              <AnimatePresence>

                {showOtp && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    className="space-y-5 overflow-hidden"
                  >

                    <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-2xl px-5 py-4 text-cyan-300 text-sm flex items-center gap-3">

                      <FaCheckCircle />

                      OTP sent successfully to your email

                    </div>

                    <InputField
  label="Enter OTP"
  icon={<FaShieldAlt />}
  type="text"
  name="otp"
  value={formData.otp}
  onChange={handleChange}
  placeholder="Enter OTP"
  error={errors.otp}
/>

                    <div className="flex items-center justify-between">

                      <p className="text-gray-400 text-sm">

                        {otpTimer > 0
                          ? `Resend OTP in ${otpTimer}s`
                          : "Didn't receive OTP?"}

                      </p>

                      {otpTimer <= 0 && (

                        <button
                          type="button"
                          onClick={
                            handleCreateAccount
                          }
                          className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
                        >

                          Resend OTP

                        </button>
                      )}

                    </div>

                    <motion.button
                      type="button"
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      onClick={
                        handleVerifyOtp
                      }
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-3 text-white"
                    >

                      {loading
                        ? "Verifying..."
                        : "Verify & Create Account"}

                      <FaArrowRight />

                    </motion.button>

                  </motion.div>
                )}

              </AnimatePresence>

              {/* CREATE BUTTON */}
              {!showOtp && (

                <motion.button
                  type="button"
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={
                    handleCreateAccount
                  }
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-3 text-white"
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

            {/* BACK BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() =>
                navigate("/")
              }
              className="mt-6 w-full bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3"
            >

              <FaHome />

              Back To Home

            </motion.button>

          </motion.div>

        </motion.div>

      </div>

    </section>
  );
}

// =========================
// INPUT FIELD COMPONENT
// =========================

const InputField = ({
  label,
  icon,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
}) => (

  <div>

    <label className="text-gray-300 text-sm mb-3 block">

      {label}

    </label>

    <div className={`flex items-center gap-4 bg-white/5 border rounded-2xl px-5 py-4 transition-all ${
      error
        ? "border-red-500"
        : "border-white/10 focus-within:border-cyan-400"
    }`}>

      <div className="text-cyan-400">

        {icon}

      </div>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
      />

    </div>

    {error && (
      <p className="text-red-400 text-sm mt-2">

        {error}

      </p>
    )}

  </div>
);

export default Signup;