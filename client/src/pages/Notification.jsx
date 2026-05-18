import { useEffect, useState } from "react";

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

import toast from "react-hot-toast";

import moment from "moment";

import API from "../utils/api";

function Notifications() {

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH NOTIFICATIONS
  // =========================

  useEffect(() => {

    fetchNotifications();

  }, []);

  const fetchNotifications =
    async () => {

      try {

        const { data } =
          await API.get(
            "/notifications/my"
          );

        setNotifications(data);

      } catch (error) {

        toast.error(
          "Failed to load notifications"
        );

      } finally {

        setLoading(false);

      }
    };

  // =========================
  // MARK AS READ
  // =========================

  const markAsRead = async (
    id
  ) => {

    try {

      await API.put(
        `/notifications/read/${id}`
      );

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                read: true,
              }
            : item
        )
      );

    } catch (error) {

      toast.error(
        "Failed to mark as read"
      );

    }
  };

  // =========================
  // DELETE
  // =========================

  const deleteNotification =
    async (id) => {

      try {

        await API.delete(
          `/notifications/delete/${id}`
        );

        setNotifications((prev) =>
          prev.filter(
            (item) =>
              item._id !== id
          )
        );

        toast.success(
          "Notification deleted"
        );

      } catch (error) {

        toast.error(
          "Delete failed"
        );

      }
    };

  // =========================
  // CLEAR ALL
  // =========================

  const clearAll = async () => {

    try {

      await API.delete(
        "/notifications/clear"
      );

      setNotifications([]);

      toast.success(
        "All notifications cleared"
      );

    } catch (error) {

      toast.error(
        "Failed to clear"
      );

    }
  };

  // =========================
  // ICONS
  // =========================

  const getIcon = (type) => {

    switch (type) {

      case "success":
        return (
          <FaCheckCircle className="text-green-400 text-2xl" />
        );

      case "rejected":
        return (
          <FaTimesCircle className="text-red-400 text-2xl" />
        );

      case "interview":
        return (
          <FaBriefcase className="text-yellow-400 text-2xl" />
        );

      default:
        return (
          <FaBriefcase className="text-cyan-400 text-2xl" />
        );

    }

  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-28">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

        <div>

          <h1 className="text-4xl font-extrabold flex items-center gap-4">

            <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl">

              <FaBell className="text-white text-2xl" />

            </div>

            Notifications

          </h1>

          <p className="text-gray-400 mt-2">

            Stay updated with your activities

          </p>

        </div>

        {notifications.length > 0 && (

          <button
            onClick={clearAll}
            className="px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-semibold hover:bg-red-500/20 transition"
          >

            Clear All

          </button>

        )}

      </div>

      {/* LOADING */}

      {loading ? (

        <div className="text-center text-cyan-400 text-xl py-20">

          Loading Notifications...

        </div>

      ) : notifications.length === 0 ? (

        <div className="bg-white/5 border border-white/10 rounded-3xl p-20 text-center">

          <FaBell className="text-7xl text-cyan-400 mx-auto mb-6" />

          <h2 className="text-3xl font-bold mb-4">

            No Notifications

          </h2>

          <p className="text-gray-400">

            You're all caught up 🎉

          </p>

        </div>

      ) : (

        <div className="grid gap-5">

          <AnimatePresence>

            {notifications.map(
              (notification, index) => (

                <motion.div
                  key={notification._id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className={`relative bg-white/5 border rounded-3xl p-6 backdrop-blur-xl transition-all duration-300 ${
                    notification.read
                      ? "border-white/10"
                      : "border-cyan-400/40"
                  }`}
                >

                  {!notification.read && (
                    <span className="absolute top-5 right-5 w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
                  )}

                  <div className="flex items-start gap-5">

                    {/* ICON */}

                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">

                      {getIcon(
                        notification.type
                      )}

                    </div>

                    {/* CONTENT */}

                    <div className="flex-1">

                      <div className="flex items-center justify-between gap-5">

                        <h2 className="text-xl font-bold">

                          {
                            notification.title
                          }

                        </h2>

                        <span className="text-sm text-gray-500 whitespace-nowrap">

                          {moment(
                            notification.createdAt
                          ).fromNow()}

                        </span>

                      </div>

                      <p className="text-gray-400 mt-2 leading-relaxed">

                        {
                          notification.message
                        }

                      </p>

                      {/* ACTIONS */}

                      <div className="flex items-center gap-4 mt-5">

                        {!notification.read && (

                          <button
                            onClick={() =>
                              markAsRead(
                                notification._id
                              )
                            }
                            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium"
                          >

                            Mark as Read

                          </button>

                        )}

                        <button
                          onClick={() =>
                            deleteNotification(
                              notification._id
                            )
                          }
                          className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition"
                        >

                          <FaTrash />

                        </button>

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
  );
}

export default Notifications;