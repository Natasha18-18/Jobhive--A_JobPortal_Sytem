import { useEffect, useMemo, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  FaBell,
  FaCheckCircle,
  FaBriefcase,
  FaUserTie,
  FaSearch,
  FaTrash,
  FaEnvelopeOpenText,
} from "react-icons/fa";

import toast from "react-hot-toast";

import moment from "moment";

import API from "../utils/api";

function RecruiterNotifications() {

  const [search, setSearch] =
    useState("");

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

        setLoading(true);

        const { data } =
          await API.get(
            "/notifications/my"
          );

        setNotifications(
          data.notifications || data
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load notifications"
        );

      } finally {

        setLoading(false);

      }

    };

  // =========================
  // FILTER NOTIFICATIONS
  // =========================

  const filteredNotifications =
    useMemo(() => {

      return notifications.filter(
        (item) => {

          const title =
            item.title?.toLowerCase() || "";

          const message =
            item.message?.toLowerCase() || "";

          const keyword =
            search.toLowerCase();

          return (
            title.includes(keyword) ||
            message.includes(keyword)
          );

        }
      );

    }, [
      notifications,
      search,
    ]);

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

      toast.success(
        "Notification marked as read"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to mark as read"
      );

    }

  };

  // =========================
  // DELETE NOTIFICATION
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

        console.log(error);

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

      console.log(error);

      toast.error(
        "Failed to clear notifications"
      );

    }

  };

  // =========================
  // ICONS
  // =========================

  const getIcon = (type) => {

    switch (type) {

      case "applicant":

        return (
          <FaUserTie className="text-cyan-400 text-2xl" />
        );

      case "job":

        return (
          <FaBriefcase className="text-green-400 text-2xl" />
        );

      case "success":

        return (
          <FaCheckCircle className="text-green-400 text-2xl" />
        );

      case "interview":

        return (
          <FaEnvelopeOpenText className="text-yellow-400 text-2xl" />
        );

      default:

        return (
          <FaBell className="text-blue-400 text-2xl" />
        );

    }

  };

  // =========================
  // UNREAD COUNT
  // =========================

  const unreadCount =
    notifications.filter(
      (item) => !item.read
    ).length;

  return (

    <div className="min-h-screen bg-[#050816] text-white px-4 sm:px-6 py-28">

      {/* HEADER */}

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-10">

        {/* LEFT */}

        <div>

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl">

              <FaBell className="text-white text-2xl" />

            </div>

            <div>

              <h1 className="text-4xl font-extrabold">

                Recruiter Notifications

              </h1>

              <p className="text-gray-400 mt-1">

                Stay updated with applications,
                interviews and hiring activities

              </p>

            </div>

          </div>

          {/* STATS */}

          <div className="flex items-center gap-4 mt-5">

            <div className="px-5 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-semibold">

              Total:
              {" "}
              {notifications.length}

            </div>

            <div className="px-5 py-2 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-semibold">

              Unread:
              {" "}
              {unreadCount}

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">

          {/* SEARCH */}

          <div className="flex items-center gap-3 bg-white/10 border border-white/10 px-5 py-3 rounded-2xl w-full sm:w-[350px]">

            <FaSearch className="text-cyan-400" />

            <input
              type="text"
              placeholder="Search notifications..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
            />

          </div>

          {/* CLEAR BUTTON */}

          {notifications.length > 0 && (

            <button
              onClick={clearAll}
              className="px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-semibold hover:bg-red-500/20 transition-all duration-300"
            >

              Clear All

            </button>

          )}

        </div>

      </div>

      {/* LOADING */}

      {loading ? (

        <div className="flex justify-center items-center py-32">

          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

        </div>

      ) : filteredNotifications.length === 0 ? (

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="bg-white/5 border border-white/10 rounded-3xl p-20 text-center backdrop-blur-xl"
        >

          <FaBell className="text-7xl text-cyan-400 mx-auto mb-6" />

          <h2 className="text-3xl font-bold mb-4">

            No Notifications

          </h2>

          <p className="text-gray-400">

            You're all caught up 🎉

          </p>

        </motion.div>

      ) : (

        <div className="grid gap-5">

          <AnimatePresence>

            {filteredNotifications.map(
              (
                notification,
                index
              ) => (

                <motion.div
                  key={
                    notification._id
                  }
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
                    y: -10,
                  }}
                  transition={{
                    delay:
                      index * 0.05,
                  }}
                  whileHover={{
                    scale: 1.01,
                  }}
                  className={`relative bg-white/5 border rounded-3xl p-6 backdrop-blur-xl transition-all duration-300 shadow-xl ${
                    notification.read
                      ? "border-white/10"
                      : "border-cyan-400/40 shadow-cyan-500/10"
                  }`}
                >

                  {/* UNREAD DOT */}

                  {!notification.read && (

                    <span className="absolute top-5 right-5 w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>

                  )}

                  <div className="flex items-start gap-5">

                    {/* ICON */}

                    <div className="min-w-[60px] w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">

                      {getIcon(
                        notification.type
                      )}

                    </div>

                    {/* CONTENT */}

                    <div className="flex-1">

                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">

                        <h2 className="text-xl font-bold break-words">

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

                      <p className="text-gray-400 mt-3 leading-relaxed">

                        {
                          notification.message
                        }

                      </p>

                      {/* ACTIONS */}

                      <div className="flex items-center gap-4 mt-6 flex-wrap">

                        {!notification.read && (

                          <button
                            onClick={() =>
                              markAsRead(
                                notification._id
                              )
                            }
                            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:scale-105 transition-all duration-300"
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
                          className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-all duration-300"
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

export default RecruiterNotifications;