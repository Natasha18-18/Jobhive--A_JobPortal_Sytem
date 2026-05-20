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
  FaCrown,
  FaBolt,
} from "react-icons/fa";

function Signup() {

  const navigate = useNavigate();

  const [showOtp, setShowOtp] =
    useState(false);

  const [role, setRole] =
    useState("candidate");

  const [otpTimer, setOtpTimer] =
    useState(60);

  const [loading, setLoading] =
    useState(false);

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [
    passwordStrength,
    setPasswordStrength,
  ] = useState("");

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

  const handleVerifyOtp =
    async (e) => {

      e.preventDefault();

      if (!formData.otp) {

        setErrors({
          otp: "Enter OTP",
        });

        toast.error(
          "Enter OTP"
        );

        return;

      }

      try {

        setLoading(true);

        const { data } =
          await API.post(
            "/auth/register",
            {
              fullName:
                formData.fullName,
              email:
                formData.email,
              phone:
                formData.phone,
              password:
                formData.password,
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

        }

        else {

          toast.error(
            data.message
          );

        }

      }

      catch (error) {

        const message =
          error.response?.data
            ?.message;

        if (
          message
            ?.toLowerCase()
            .includes("exists")
        ) {

          setErrors(
            (prev) => ({
              ...prev,
              email:
                message,
            })
          );

        }

        else if (
          message
            ?.toLowerCase()
            .includes("otp")
        ) {

          setErrors(
            (prev) => ({
              ...prev,
              otp: message,
            })
          );

        }

        else {

          toast.error(
            message ||
            "Registration failed"
          );

        }

      }

      finally {

        setLoading(false);

      }

    };

  return (

    <section className="relative overflow-hidden bg-[#030712] min-h-screen pt-20 pb-20 px-5">

      {/* BG EFFECTS */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full"></div>

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:55px_55px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">

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
            duration: 0.8,
          }}
          className="grid lg:grid-cols-2 min-h-[950px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_80px_rgba(0,255,255,0.08)]"
        >

          {/* ================= LEFT ================= */}
          <div className="hidden lg:flex relative overflow-hidden">

            {/* GLOW */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 via-cyan-500/10 to-transparent"></div>

            <div className="absolute top-[-80px] left-[-80px] w-[280px] h-[280px] bg-cyan-500/20 rounded-full blur-3xl"></div>

            <div className="absolute bottom-[-120px] right-[-80px] w-[320px] h-[320px] bg-blue-600/20 rounded-full blur-3xl"></div>

            {/* GRID */}
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:50px_50px]"></div>

            {/* CONTENT */}
            <motion.div
              initial={{
                opacity: 0,
                x: -60,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="relative z-10 flex flex-col justify-between h-full w-full p-14"
            >

              {/* TOP */}
              <div>

                {/* LOGO */}
                <div className="flex items-center gap-4">

                  <motion.div
                    whileHover={{
                      rotate: 8,
                      scale: 1.05,
                    }}
                    className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700 flex items-center justify-center shadow-[0_0_35px_rgba(0,255,255,0.35)] text-white text-3xl"
                  >

                    <FaBriefcase />

                  </motion.div>

                  <div>

                    <h1 className="text-5xl font-black tracking-tight text-white">

                      Job
                      <span className="text-cyan-400">
                        Portal
                      </span>

                    </h1>

                    <p className="text-gray-400 mt-1 text-lg">

                      Smart Hiring Platform

                    </p>

                  </div>

                </div>

                {/* TITLE */}
                <div className="mt-16">

                  <p className="uppercase tracking-[6px] text-cyan-400 text-sm font-semibold mb-5">

                    Join The Future

                  </p>

                  <h2 className="text-6xl font-black leading-[1.1] text-white">

                    Build Your

                    <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500 bg-clip-text text-transparent">

                      Dream Career

                    </span>

                  </h2>

                  <p className="mt-8 text-lg text-gray-300 leading-relaxed max-w-xl">

                    Connect with top recruiters,
                    unlock premium opportunities,
                    and start your professional
                    journey with our modern AI
                    powered hiring platform.

                  </p>

                </div>

                {/* FEATURES */}
                <div className="mt-14 grid grid-cols-2 gap-5">

                  {[
                    {
                      icon: <FaRocket />,
                      title: "Fast Hiring",
                    },
                    {
                      icon: <FaStar />,
                      title: "Premium UI",
                    },
                    {
                      icon: <FaBolt />,
                      title: "Quick Apply",
                    },
                    {
                      icon: <FaCrown />,
                      title: "Top Companies",
                    },
                  ].map((item, index) => (

                    <motion.div
                      key={index}
                      whileHover={{
                        scale: 1.03,
                        y: -4,
                      }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl"
                    >

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white">

                          {item.icon}

                        </div>

                        <span className="text-white font-medium">

                          {item.title}

                        </span>

                      </div>

                    </motion.div>
                  ))}

                </div>

              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-5 mt-14">

                {[
                  {
                    value: "25K+",
                    label: "Candidates",
                  },
                  {
                    value: "10K+",
                    label: "Recruiters",
                  },
                  {
                    value: "99%",
                    label: "Success",
                  },
                ].map((item, index) => (

                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center backdrop-blur-xl"
                  >

                    <h3 className="text-3xl font-black text-cyan-400">

                      {item.value}

                    </h3>

                    <p className="text-gray-400 mt-2 text-sm">

                      {item.label}

                    </p>

                  </motion.div>
                ))}

              </div>

            </motion.div>

          </div>

          {/* ================= RIGHT ================= */}
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
              duration: 0.8,
            }}
            className="relative bg-[#0b1220]/90 backdrop-blur-3xl px-7 md:px-14 py-12 flex flex-col justify-center"
          >

            {/* GLOW */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>

            {/* HEADER */}
            <div className="relative z-10 text-center">

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
                  duration: 0.5,
                }}
                className="mx-auto mb-6 w-20 h-20 rounded-[28px] bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-3xl shadow-[0_0_40px_rgba(0,255,255,0.25)]"
              >

                <FaUser />

              </motion.div>

              <h2 className="text-5xl font-black text-white">

                Create Account

              </h2>

              <p className="mt-4 text-gray-400 text-lg">

                Start your journey with JobPortal

              </p>

            </div>

            {/* ROLE */}
            <div className="mt-10 grid grid-cols-2 gap-4">

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
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 border-cyan-400 text-white shadow-[0_0_25px_rgba(0,255,255,0.2)]"
                    : "bg-white/5 border-white/10 text-gray-300 hover:border-cyan-400"
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
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 border-cyan-400 text-white shadow-[0_0_25px_rgba(0,255,255,0.2)]"
                    : "bg-white/5 border-white/10 text-gray-300 hover:border-cyan-400"
                }`}
              >

                <FaUserTie className="mx-auto text-2xl mb-2" />

                Recruiter

              </motion.button>

            </div>

            {/* FORM */}
            <form className="mt-10 space-y-5">

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

                <div className={`flex items-center gap-4 bg-white/5 border rounded-2xl px-5 py-4 transition-all duration-300 focus-within:border-cyan-400 focus-within:shadow-[0_0_20px_rgba(0,255,255,0.15)] ${
                  errors.password
                    ? "border-red-500"
                    : "border-white/10"
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
                    className="text-gray-400 hover:text-cyan-400 transition"
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

                <div className={`flex items-center gap-4 bg-white/5 border rounded-2xl px-5 py-4 transition-all duration-300 focus-within:border-cyan-400 focus-within:shadow-[0_0_20px_rgba(0,255,255,0.15)] ${
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
                    className="text-gray-400 hover:text-cyan-400 transition"
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

              {/* OTP */}
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
                        boxShadow:
                          "0px 0px 30px rgba(16,185,129,0.25)",
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={
                        handleVerifyOtp
                      }
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 text-white"
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
                    boxShadow:
                      "0px 0px 30px rgba(0,255,255,0.25)",
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={
                    handleCreateAccount
                  }
                  className="relative overflow-hidden w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 text-white"
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

            {/* BACK */}
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
              className="mt-6 w-full bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 hover:border-cyan-400"
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
// INPUT FIELD
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

    <div className={`flex items-center gap-4 bg-white/5 border rounded-2xl px-5 py-4 transition-all duration-300 focus-within:border-cyan-400 focus-within:shadow-[0_0_20px_rgba(0,255,255,0.15)] ${
      error
        ? "border-red-500"
        : "border-white/10"
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