import { useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import {
  FaLock,
} from "react-icons/fa";

function ProfileSetting() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [
    passwordLoading,
    setPasswordLoading,
  ] = useState(false);

  const [
    passwordData,
    setPasswordData,
  ] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // =========================
  // HANDLE CHANGE
  // =========================

  const handlePasswordChange = (
    e
  ) => {

    setPasswordData({
      ...passwordData,
      [e.target.name]:
        e.target.value,
    });

  };

  // =========================
  // CHANGE PASSWORD
  // =========================

  const handleUpdatePassword =
    async (e) => {

      e.preventDefault();

      if (
        passwordData.newPassword !==
        passwordData.confirmPassword
      ) {

        return toast.error(
          "Passwords do not match"
        );

      }

      try {

        setPasswordLoading(true);

        const res = await axios.put(
          "http://localhost:5002/api/auth/change-password",
          {
            userId: user._id,
            oldPassword:
              passwordData.oldPassword,
            newPassword:
              passwordData.newPassword,
          }
        );

        if (res.data.success) {

          toast.success(
            "Password Updated Successfully"
          );

          setPasswordData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });

        }

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Password Update Failed"
        );

      } finally {

        setPasswordLoading(false);

      }

    };

  return (

    <section className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] pt-32 pb-20 px-6">

      <div className="max-w-2xl mx-auto">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] p-8 md:p-12 shadow-2xl"
        >

          {/* TITLE */}
          <div className="mb-10 text-center">

            <h1 className="text-4xl font-black text-white">

              Change Password

            </h1>

            <p className="text-gray-400 mt-2">

              Secure your account with a new password

            </p>

          </div>

          {/* PASSWORD FORM */}
          <form
            onSubmit={
              handleUpdatePassword
            }
            className="space-y-6"
          >

            {/* OLD PASSWORD */}
            <div>

              <label className="text-gray-300 text-sm block mb-3">

                Current Password

              </label>

              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

                <FaLock className="text-cyan-400" />

                <input
                  type="password"
                  name="oldPassword"
                  value={
                    passwordData.oldPassword
                  }
                  onChange={
                    handlePasswordChange
                  }
                  placeholder="Enter current password"
                  className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                />

              </div>

            </div>

            {/* NEW PASSWORD */}
            <div>

              <label className="text-gray-300 text-sm block mb-3">

                New Password

              </label>

              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

                <FaLock className="text-cyan-400" />

                <input
                  type="password"
                  name="newPassword"
                  value={
                    passwordData.newPassword
                  }
                  onChange={
                    handlePasswordChange
                  }
                  placeholder="Enter new password"
                  className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                />

              </div>

            </div>

            {/* CONFIRM PASSWORD */}
            <div>

              <label className="text-gray-300 text-sm block mb-3">

                Confirm Password

              </label>

              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

                <FaLock className="text-cyan-400" />

                <input
                  type="password"
                  name="confirmPassword"
                  value={
                    passwordData.confirmPassword
                  }
                  onChange={
                    handlePasswordChange
                  }
                  placeholder="Confirm new password"
                  className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                />

              </div>

            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-3 shadow-2xl"
            >

              <FaLock />

              {passwordLoading
                ? "Updating..."
                : "Update Password"}

            </motion.button>

          </form>

        </motion.div>

      </div>

    </section>

  );

}

export default ProfileSetting;