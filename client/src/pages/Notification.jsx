import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FaBell,
  FaBriefcase,
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
} from "react-icons/fa";

function Notifications() {

  const [notifications, setNotifications] =
    useState([
      {
        id: 1,
        title: "Application Submitted",
        message:
          "Your application for Frontend Developer has been submitted successfully.",
        time: "2 min ago",
        read: false,
        type: "success",
      },

      {
        id: 2,
        title: "Interview Scheduled",
        message:
          "TechNova scheduled your interview for tomorrow at 11:00 AM.",
        time: "1 hour ago",
        read: false,
        type: "interview",
      },

      {
        id: 3,
        title: "Application Rejected",
        message:
          "Unfortunately your application was not shortlisted.",
        time: "Yesterday",
        read: true,
        type: "rejected",
      },
    ]);

  // =========================
  // MARK AS READ
  // =========================

  const markAsRead = (id) => {

    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              read: true,
            }
          : item
      )
    );

  };

  // =========================
  // DELETE NOTIFICATION
  // =========================

  const deleteNotification = (
    id
  ) => {

    setNotifications((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

  };

  // =========================
  // CLEAR ALL
  // =========================

  const clearAll = () => {

    setNotifications([]);

  };

  // =========================
  // ICONS
  // =========================

  const getIcon = (type) => {

    switch (type) {

      case "success":
        return (
          <FaCheckCircle className="text-green-400 text-xl" />
        );

      case "rejected":
        return (
          <FaTimesCircle className="text-red-400 text-xl" />
        );

      default:
        return (
          <FaBriefcase className="text-cyan-400 text-xl" />
        );

    }

  };

  return (
    <div className="min-h-screen bg-[#050816] pt-32 px-5 pb-20 relative overflow-hidden">

      {/* BG EFFECTS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full"></div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* HEADER */}
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
            duration: 0.5,
          }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10"
        >

          <div>

            <h1 className="text-4xl font-extrabold text-white flex items-center gap-4">

              <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl">

                <FaBell className="text-white text-2xl" />

              </div>

              Notifications

            </h1>

            <p className="text-gray-400 mt-3 text-lg">

              Stay updated with your latest activities.

            </p>

          </div>

          {notifications.length > 0 && (
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={clearAll}
              className="px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-semibold hover:bg-red-500/20 transition-all duration-300"
            >

              Clear All

            </motion.button>
          )}

        </motion.div>

        {/* EMPTY */}
        {notifications.length === 0 ? (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="bg-white/5 border border-white/10 rounded-3xl p-20 text-center backdrop-blur-xl"
          >

            <FaBell className="text-7xl text-cyan-400 mx-auto mb-6" />

            <h2 className="text-3xl font-bold text-white mb-4">

              No Notifications

            </h2>

            <p className="text-gray-400 text-lg">

              You're all caught up 🎉

            </p>

          </motion.div>
        ) : (
          <div className="space-y-5">

            <AnimatePresence>

              {notifications.map(
                (
                  notification,
                  index
                ) => (
                  <motion.div
                    key={
                      notification.id
                    }
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: 100,
                    }}
                    transition={{
                      duration: 0.3,
                      delay:
                        index * 0.1,
                    }}
                    className={`relative p-6 rounded-3xl border backdrop-blur-2xl overflow-hidden transition-all duration-300 ${
                      notification.read
                        ? "bg-white/5 border-white/10"
                        : "bg-cyan-500/10 border-cyan-500/30 shadow-xl shadow-cyan-500/10"
                    }`}
                  >

                    {/* UNREAD DOT */}
                    {!notification.read && (
                      <span className="absolute top-5 right-5 w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
                    )}

                    <div className="flex gap-5">

                      {/* ICON */}
                      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">

                        {getIcon(
                          notification.type
                        )}

                      </div>

                      {/* CONTENT */}
                      <div className="flex-1">

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

                          <div>

                            <h2 className="text-xl font-bold text-white">

                              {
                                notification.title
                              }

                            </h2>

                            <p className="text-gray-400 mt-2 leading-relaxed">

                              {
                                notification.message
                              }

                            </p>

                          </div>

                          <p className="text-sm text-gray-500 whitespace-nowrap">

                            {
                              notification.time
                            }

                          </p>

                        </div>

                        {/* ACTIONS */}
                        <div className="flex items-center gap-4 mt-5">

                          {!notification.read && (
                            <motion.button
                              whileHover={{
                                scale: 1.05,
                              }}
                              whileTap={{
                                scale: 0.95,
                              }}
                              onClick={() =>
                                markAsRead(
                                  notification.id
                                )
                              }
                              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-lg"
                            >

                              Mark as Read

                            </motion.button>
                          )}

                          <motion.button
                            whileHover={{
                              scale: 1.05,
                            }}
                            whileTap={{
                              scale: 0.95,
                            }}
                            onClick={() =>
                              deleteNotification(
                                notification.id
                              )
                            }
                            className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition"
                          >

                            <FaTrash />

                          </motion.button>

                        </div>

                      </div>

                    </div>

                  </motion.div>
                )
              )}

            </AnimatePresence>

          </div>
        )}

      </div>

    </div>
  );
}

export default Notifications;