import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  FaBell,
  FaCheckCircle,
  FaBriefcase,
  FaUserTie,
  FaSearch,
  FaTrash,
} from "react-icons/fa";

import API from "../utils/api";

import toast from "react-hot-toast";

import moment from "moment";

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
  // FILTER
  // =========================

  const filteredNotifications =
    notifications.filter((item) =>
      item.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

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

      toast.error(
        "Failed to update"
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

      default:
        return (
          <FaBell className="text-yellow-400 text-2xl" />
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

            Stay updated with recruiter activities

          </p>

        </div>

        {/* RIGHT SIDE */}

        <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">

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

          {/* CLEAR BUTTON */}

          {notifications.length > 0 && (

            <button
              onClick={clearAll}
              className="px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-semibold hover:bg-red-500/20 transition"
            >

              Clear All

            </button>

          )}

        </div>

      </div>

      {/* LOADING */}

      {loading ? (

        <div className="text-center text-cyan-400 text-xl py-20">

          Loading Notifications...

        </div>

      ) : filteredNotifications.length === 0 ? (

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

          {filteredNotifications.map(
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
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{
                  scale: 1.01,
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

        </div>
      )}

    </div>
  );
}

export default RecruiterNotifications;