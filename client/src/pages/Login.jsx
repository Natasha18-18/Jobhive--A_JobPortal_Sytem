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
} from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("password");

  const [role, setRole] = useState("candidate");

  const [showOtpField, setShowOtpField] = useState(false);

  const [otpTimer, setOtpTimer] = useState(60);

  const [loading, setLoading] = useState(false);

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

    // PASSWORD
    if (
      loginType === "password" &&
      !formData.password
    ) {

      newErrors.password = "Password is required";

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
          data.message || "OTP sent successfully"
        );

        setShowOtpField(true);

        setOtpTimer(60);

      }

      else {

        toast.error(
          data.message || "Failed to send OTP"
        );

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

  // SAVE TOKEN
  localStorage.setItem(
    "token",
    response.data.token
  );

  // SAVE USER
  localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
  );

  // LOGIN FLAG
  localStorage.setItem(
    "isLoggedIn",
    "true"
  );

  // UPDATE NAVBAR
  window.dispatchEvent(
    new Event("profileUpdated")
  );

  // REDIRECT
  if (response.data.user.role === "recruiter") {

    navigate("/recruiter/dashboard");

  } else {

    navigate("/");

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
        "Login failed"
      );

    }

    finally {

      setLoading(false);

    }

  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] min-h-screen pt-32 pb-20 px-6">

        {/* BG */}
        <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-blue-600/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-500/10 blur-3xl rounded-full"></div>

        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        {/* MAIN */}
        <div className="max-w-6xl mx-auto relative z-10">

          <div className="grid lg:grid-cols-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] overflow-hidden shadow-2xl">

            {/* LEFT */}
            <div className="hidden lg:flex flex-col justify-center p-14 relative overflow-hidden">

              <div className="absolute top-10 left-10 w-60 h-60 bg-blue-500/20 blur-3xl rounded-full"></div>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
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
                      Modern Hiring Platform
                    </p>

                  </div>

                </div>

                {/* TITLE */}
                <h2 className="mt-14 text-5xl leading-tight font-black text-white">

                  Welcome Back

                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">

                    Start Your Career

                  </span>

                </h2>

                {/* DESC */}
                <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-md">

                  Discover top opportunities, connect with leading companies,
                  and apply for your dream jobs instantly.

                </p>

              </motion.div>

            </div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-[#0f172a]/80 backdrop-blur-2xl p-8 md:p-14 flex flex-col justify-center"
            >

              {/* HEADING */}
              <div className="text-center">

                <h2 className="text-4xl font-black text-white">

                  Login Account

                </h2>

                <p className="mt-3 text-gray-400">

                  Access your account and continue your journey

                </p>

              </div>

              {/* ROLE SELECT */}
              <div className="mt-8 grid grid-cols-2 gap-4">

                {/* CANDIDATE */}
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

                {/* RECRUITER */}
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

              {/* LOGIN SWITCH */}
              <div className="mt-10 flex items-center bg-white/5 border border-white/10 rounded-2xl p-2">

                <button
                  type="button"
                  onClick={() => setLoginType("password")}
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
                  onClick={() => setLoginType("otp")}
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

                {/* PASSWORD LOGIN */}
                {loginType === "password" && (
                  <>
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
                          placeholder="Enter your password"
                          className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                        />

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

                {/* OTP LOGIN */}
                {loginType === "otp" && (
                  <>

                    {!showOtpField && (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
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

                          <div className={`flex items-center gap-4 bg-white/5 border rounded-2xl px-5 py-4 ${
                            errors.otp
                              ? "border-red-500"
                              : "border-white/10"
                          }`}>

                            <FaLock className="text-cyan-400" />

                            <input
                              type="text"
                              name="otp"
                              value={formData.otp}
                              onChange={handleChange}
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

                        <div className="flex items-center justify-between">

                          <p className="text-gray-400 text-sm">

                            {otpTimer > 0
                              ? `Resend OTP in ${otpTimer}s`
                              : "Didn't receive OTP?"}

                          </p>

                          {otpTimer <= 0 && (
                            <button
                              type="button"
                              onClick={handleSendOtp}
                              className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
                            >

                              Resend OTP

                            </button>
                          )}

                        </div>
                      </>
                    )}
                  </>
                )}

                {/* LOGIN BUTTON */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-3 text-white"
                >

                  {loading
                    ? "Please wait..."
                    : "Login Now"}

                  <FaArrowRight />

                </motion.button>

              </form>

              {/* DIVIDER */}
              <div className="flex items-center gap-4 my-8">

                <div className="flex-1 h-[1px] bg-white/10"></div>

                <span className="text-gray-500 text-sm">
                  OR
                </span>

                <div className="flex-1 h-[1px] bg-white/10"></div>

              </div>

              {/* GOOGLE */}
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3">

                <FaGoogle />

                Continue with Google

              </button>

              {/* SIGNUP */}
              <p className="text-center mt-8 text-gray-400">

                Don’t have an account?

                <Link
                  to="/signup"
                  className="text-cyan-400 hover:text-cyan-300 ml-2 font-semibold transition"
                >

                  Create Account

                </Link>

              </p>

            </motion.div>

          </div>

        </div>

      </section>
    </>
  );
}

export default Login;