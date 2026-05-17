import { useState } from "react";

import { motion } from "framer-motion";

import {
  FaBell,
  FaCheckCircle,
  FaBriefcase,
  FaUserTie,
  FaSearch,
} from "react-icons/fa";

function RecruiterNotifications() {

  const [search, setSearch] =
    useState("");

  const notifications = [
    {
      id: 1,
      title: "New Applicant Applied",
      message:
        "Rahul Sharma applied for Frontend Developer role.",
      time: "2 min ago",
      type: "applicant",
      unread: true,
    },

    {
      id: 2,
      title: "Job Posted Successfully",
      message:
        "Your UI/UX Designer job is now live.",
      time: "1 hour ago",
      type: "job",
      unread: false,
    },

    {
      id: 3,
      title: "Interview Scheduled",
      message:
        "Interview scheduled with Aman Verma.",
      time: "3 hours ago",
      type: "interview",
      unread: true,
    },

    {
      id: 4,
      title: "Profile Updated",
      message:
        "Your recruiter profile was updated.",
      time: "Yesterday",
      type: "profile",
      unread: false,
    },
  ];

  const filteredNotifications =
    notifications.filter((item) =>
      item.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const getIcon = (type) => {

    switch (type) {

      case "applicant":
        return (
          <FaUserTie className="text-cyan-400" />
        );

      case "job":
        return (
          <FaBriefcase className="text-green-400" />
        );

      default:
        return (
          <FaCheckCircle className="text-yellow-400" />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-28">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

        <div>

          <h1 className="text-4xl font-extrabold">

            Notifications

          </h1>

          <p className="text-gray-400 mt-2">

            Stay updated with recruiter activities

          </p>

        </div>

        {/* SEARCH */}
        <div className="flex items-center gap-3 bg-white/10 border border-white/10 px-5 py-3 rounded-2xl w-full lg:w-[350px]">

          <FaSearch className="text-cyan-400" />

          <input
            type="text"
            placeholder="Search notifications..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
          />

        </div>

      </div>

      {/* NOTIFICATIONS */}
      <div className="grid gap-5">

        {filteredNotifications.map(
          (notification, index) => (

            <motion.div
              key={notification.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                scale: 1.01,
              }}
              className={`relative bg-white/5 border rounded-3xl p-6 backdrop-blur-xl transition-all duration-300 ${
                notification.unread
                  ? "border-cyan-400/40"
                  : "border-white/10"
              }`}
            >

              {/* UNREAD DOT */}
              {notification.unread && (
                <span className="absolute top-5 right-5 w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
              )}

              <div className="flex items-start gap-5">

                {/* ICON */}
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">

                  {getIcon(notification.type)}

                </div>

                {/* CONTENT */}
                <div className="flex-1">

                  <div className="flex items-center justify-between gap-5">

                    <h2 className="text-xl font-bold">

                      {notification.title}

                    </h2>

                    <span className="text-sm text-gray-500 whitespace-nowrap">

                      {notification.time}

                    </span>

                  </div>

                  <p className="text-gray-400 mt-2 leading-relaxed">

                    {notification.message}

                  </p>

                </div>

              </div>

            </motion.div>
          )
        )}

      </div>

    </div>
  );
}

export default RecruiterNotifications;