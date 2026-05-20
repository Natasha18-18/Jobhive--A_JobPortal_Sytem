import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import API from "../utils/api";

import {
  FaBriefcase,
  FaLock,
  FaEnvelope,
  FaShieldAlt,
  FaGoogle,
  FaArrowRight,
  FaUserTie,
  FaUser,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("password");

  const [role, setRole] = useState("candidate");

  const [showOtpField, setShowOtpField] = useState(false);

  const [otpTimer, setOtpTimer] = useState(60);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });

  // OTP TIMER
  useEffect(() => {

    let interval;

    if (showOtpField && otpTimer > 0) {

      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);

    }

    return () => clearInterval(interval);

  }, [showOtpField, otpTimer]);

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });

  };

  // VALIDATION
  const validateForm = () => {

    let newErrors = {};

    // EMAIL
    if (!formData.email.trim()) {

      newErrors.email = "Email is required";

    }

    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {

      newErrors.email =
        "Invalid email address";

    }

    // PASSWORD
    if (
      loginType === "password" &&
      !formData.password
    ) {

      newErrors.password =
        "Password is required";

    }

    else if (
      loginType === "password" &&
      formData.password.length < 6
    ) {

      newErrors.password =
        "Password must be at least 6 characters";

    }

    // OTP
    if (
      loginType === "otp" &&
      showOtpField &&
      !formData.otp
    ) {

      newErrors.otp = "OTP is required";

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  // SEND OTP
  const handleSendOtp = async () => {

    if (!formData.email.trim()) {

      setErrors({
        email: "Enter email first",
      });

      return;

    }

    try {

      setLoading(true);

      const { data } = await API.post(
        "/auth/send-login-otp",
        {
          email: formData.email,
        }
      );

      if (data.success) {

        toast.success(
          data.message ||
            "OTP sent successfully"
        );

        setShowOtpField(true);

        setOtpTimer(60);

      }

      else {

        toast.error(
          data.message ||
            "Failed to send OTP"
        );

      }

    }

catch (error) {

  const message =
    error.response?.data?.message ||
    "Login failed";

  // TOAST
  toast.error(message);

  // FIELD ERRORS
  if (
    message === "User does not exist"
  ) {

    setErrors({
      email: "User does not exist",
    });

  }

  else if (
    message === "Incorrect password"
  ) {

    setErrors({
      password: "Incorrect password",
    });

  }

  else if (
    message === "Invalid role selected"
  ) {

    toast.error(
      "Please select correct role"
    );

  }

}

    finally {

      setLoading(false);

    }

  };

  // LOGIN
  const handleLogin = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    try {

      setLoading(true);

      let response;

      // PASSWORD LOGIN
      if (loginType === "password") {

        response = await API.post(
          "/auth/login",
          {
            email: formData.email,
            password: formData.password,
            role,
          }
        );

      }

      // OTP LOGIN
      else {

        response = await API.post(
          "/auth/verify-login-otp",
          {
            email: formData.email,
            otp: formData.otp,
            role,
          }
        );

      }

      if (response.data.success) {

        toast.success(
          response.data.message ||
            "Login successful 🎉"
        );

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.user
          )
        );

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        window.dispatchEvent(
          new Event("profileUpdated")
        );

        if (
          response.data.user.role ===
          "recruiter"
        ) {

          window.location.href =
  "/recruiter/dashboard";

        }

        else {

          window.location.href = "/jobs";

        }

      }

      else {

        toast.error(
          response.data.message ||
            "Login failed"
        );

      }

    }

    catch (error) {

      toast.error(
        error.response?.data?.message ||
          (error.response?.status === 404
            ? "User does not exist"
            : "Login failed")
      );

    }

    finally {

      setLoading(false);

    }

  };

  return (
    <>
      <section className="relative overflow-hidden bg-[#030712] min-h-screen pt-24 pb-16 px-5">

        {/* BG EFFECTS */}
        <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-cyan-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-blue-600/20 blur-3xl rounded-full"></div>

        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:55px_55px]"></div>

        {/* MAIN */}
        <div className="max-w-7xl mx-auto relative z-10">

          <div className="grid lg:grid-cols-2 min-h-[850px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_80px_rgba(0,255,255,0.08)]">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex relative overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 via-cyan-500/10 to-transparent"></div>

              <div className="absolute top-[-80px] left-[-80px] w-[280px] h-[280px] bg-cyan-500/20 rounded-full blur-3xl"></div>

              <div className="absolute bottom-[-120px] right-[-80px] w-[320px] h-[320px] bg-blue-600/20 rounded-full blur-3xl"></div>

              <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:50px_50px]"></div>

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

                <div>

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

                  <div className="mt-16">

                    <p className="uppercase tracking-[6px] text-cyan-400 text-sm font-semibold mb-5">

                      Your Career Starts Here

                    </p>

                    <h2 className="text-6xl font-black leading-[1.1] text-white">

                      Find Your

                      <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500 bg-clip-text text-transparent">

                        Dream Job Faster

                      </span>

                    </h2>

                    <p className="mt-8 text-lg text-gray-300 leading-relaxed max-w-xl">

                      Connect with top companies,
                      explore premium
                      opportunities, and unlock
                      the next step of your
                      professional journey with
                      our modern AI-powered
                      hiring platform.

                    </p>

                  </div>

                </div>

              </motion.div>

            </div>

            {/* RIGHT SIDE */}
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
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

              <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>

              {/* HEADING */}
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

                  Welcome Back

                </h2>

                <p className="mt-4 text-gray-400 text-lg">

                  Login and continue your journey

                </p>

              </div>

              {/* ROLE */}
              <div className="mt-10 grid grid-cols-2 gap-4">

                <button
                  type="button"
                  onClick={() =>
                    setRole("candidate")
                  }
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    role === "candidate"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 border-cyan-400 text-white shadow-[0_0_25px_rgba(0,255,255,0.2)]"
                      : "bg-white/5 border-white/10 text-gray-300 hover:border-cyan-400"
                  }`}
                >

                  <FaUser className="mx-auto text-2xl mb-2" />

                  Candidate

                </button>

                <button
                  type="button"
                  onClick={() =>
                    setRole("recruiter")
                  }
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    role === "recruiter"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 border-cyan-400 text-white shadow-[0_0_25px_rgba(0,255,255,0.2)]"
                      : "bg-white/5 border-white/10 text-gray-300 hover:border-cyan-400"
                  }`}
                >

                  <FaUserTie className="mx-auto text-2xl mb-2" />

                  Recruiter

                </button>

              </div>

              {/* LOGIN SWITCH */}
              <div className="mt-10 flex items-center bg-white/5 border border-white/10 rounded-2xl p-2">

                <button
                  type="button"
                  onClick={() =>
                    setLoginType("password")
                  }
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    loginType === "password"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl"
                      : "text-gray-300 hover:text-white"
                  }`}
                >

                  Password

                </button>

                <button
                  type="button"
                  onClick={() =>
                    setLoginType("otp")
                  }
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    loginType === "otp"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl"
                      : "text-gray-300 hover:text-white"
                  }`}
                >

                  OTP

                </button>

              </div>

              {/* FORM */}
              <form
                onSubmit={handleLogin}
                className="mt-10 space-y-6"
              >

                {/* EMAIL */}
                <div>

                  <label className="text-gray-300 text-sm mb-3 block">

                    Email Address

                  </label>

                  <div
                    className={`flex items-center gap-4 bg-white/5 border rounded-2xl px-5 py-4 transition-all duration-300 focus-within:border-cyan-400 ${
                      errors.email
                        ? "border-red-500"
                        : "border-white/10"
                    }`}
                  >

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

                {/* PASSWORD */}
                {loginType === "password" && (
                  <>
                    <div>

                      <label className="text-gray-300 text-sm mb-3 block">

                        Password

                      </label>

                      <div
                        className={`flex items-center gap-4 bg-white/5 border rounded-2xl px-5 py-4 transition-all duration-300 focus-within:border-cyan-400 ${
                          errors.password
                            ? "border-red-500"
                            : "border-white/10"
                        }`}
                      >

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
                          onChange={handleChange}
                          placeholder="Enter your password"
                          className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              !showPassword
                            )
                          }
                          className="text-cyan-400 text-lg"
                        >

                          <span className="text-sm font-medium">
  {showPassword
    ? "Hide"
    : "Show"}
</span>

                        </button>

                      </div>

                      {errors.password && (
                        <p className="text-red-400 text-sm mt-2">

                          {errors.password}

                        </p>
                      )}

                    </div>

                    <div className="flex justify-end">

                      <Link
                        to="/forgot-password"
                        className="text-cyan-400 hover:text-cyan-300 text-sm transition"
                      >

                        Forgot Password?

                      </Link>

                    </div>
                  </>
                )}

                {/* OTP */}
                {loginType === "otp" && (
                  <>
                    {!showOtpField && (
                      <motion.button
                        type="button"
                        whileHover={{
                          scale: 1.02,
                        }}
                        whileTap={{
                          scale: 0.98,
                        }}
                        onClick={handleSendOtp}
                        className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-2xl font-semibold text-white transition-all duration-300"
                      >

                        {loading
                          ? "Sending OTP..."
                          : "Send OTP"}

                      </motion.button>
                    )}

                    {showOtpField && (
                      <>
                        <div>

                          <label className="text-gray-300 text-sm mb-3 block">

                            Enter OTP

                          </label>

                          <div
                            className={`flex items-center gap-4 bg-white/5 border rounded-2xl px-5 py-4 transition-all duration-300 ${
                              errors.otp
                                ? "border-red-500"
                                : "border-white/10"
                            }`}
                          >

                            <FaLock className="text-cyan-400" />

                            <input
                              type="text"
                              name="otp"
                              value={
                                formData.otp
                              }
                              onChange={
                                handleChange
                              }
                              placeholder="Enter OTP"
                              className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                            />

                          </div>

                          {errors.otp && (
                            <p className="text-red-400 text-sm mt-2">

                              {errors.otp}

                            </p>
                          )}

                        </div>
                      </>
                    )}
                  </>
                )}

{/* LOGIN BUTTON */}
<motion.button
  type="submit"
  whileHover={{
    scale: 1.02,
  }}
  whileTap={{
    scale: 0.97,
  }}
  className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 text-white"
>

  {loading
    ? "Please wait..."
    : "Login Now"}

  <FaArrowRight />

</motion.button>

{/* EXTRA LINKS */}
<div className="mt-8 space-y-5 text-center">

  {/* SIGNUP */}
  <p className="text-gray-400 text-sm">

    Don’t have an account?{" "}

    <Link
      to="/signup"
      className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
    >
      Signup
    </Link>

  </p>

  {/* BACK TO HOME */}
  <Link
    to="/"
    className="inline-flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition font-medium"
  >

    ← Back to Home

  </Link>

</div>

                

              </form>

            </motion.div>

          </div>

        </div>

      </section>
    </>
  );
}

export default Login;