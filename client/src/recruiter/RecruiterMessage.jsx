import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FaSearch,
  FaPaperPlane,
  FaUserTie,
  FaCircle,
  FaImage,
  FaSmile,
} from "react-icons/fa";

function RecruiterMessages() {

  // =========================
  // CHAT USERS
  // =========================

  const [chatUsers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Frontend Developer",
      online: true,
      unread: 2,
      image:
        "https://i.pravatar.cc/150?img=11",
    },

    {
      id: 2,
      name: "Priya Verma",
      role: "UI/UX Designer",
      online: false,
      unread: 0,
      image:
        "https://i.pravatar.cc/150?img=32",
    },

    {
      id: 3,
      name: "Aman Yadav",
      role: "Backend Developer",
      online: true,
      unread: 1,
      image:
        "https://i.pravatar.cc/150?img=15",
    },
  ]);

  // =========================
  // ACTIVE CHAT
  // =========================

  const [activeUser, setActiveUser] =
    useState(chatUsers[0]);

  // =========================
  // MESSAGES
  // =========================

  const [messages, setMessages] =
    useState([
      {
        sender: "candidate",
        text: "Hello sir, I applied for Frontend Developer role.",
        time: "10:00 AM",
      },

      {
        sender: "recruiter",
        text: "Great Rahul! Your profile looks impressive.",
        time: "10:02 AM",
      },

      {
        sender: "candidate",
        text: "Thank you sir 😊",
        time: "10:03 AM",
      },
    ]);

  // =========================
  // NEW MESSAGE
  // =========================

  const [newMessage, setNewMessage] =
    useState("");

  // =========================
  // SEND MESSAGE
  // =========================

  const handleSendMessage = () => {

    if (!newMessage.trim())
      return;

    const newMsg = {
      sender: "recruiter",
      text: newMessage,
      time: "Now",
    };

    setMessages([
      ...messages,
      newMsg,
    ]);

    setNewMessage("");

  };

  return (
    <div className="min-h-screen bg-[#050816] pt-28 px-4 pb-10 overflow-hidden">

      {/* BG EFFECTS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-8"
        >

          <h1 className="text-4xl font-extrabold text-white flex items-center gap-4">

            <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl">

              <FaUserTie className="text-white text-2xl" />

            </div>

            Recruiter Inbox

          </h1>

          <p className="text-gray-400 mt-3 text-lg">

            Connect with candidates instantly.

          </p>

        </motion.div>

        {/* MAIN */}
        <div className="grid lg:grid-cols-[350px_1fr] gap-6">

          {/* SIDEBAR */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-2xl overflow-hidden h-[75vh]"
          >

            {/* SEARCH */}
            <div className="p-5 border-b border-white/10">

              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl">

                <FaSearch className="text-gray-400" />

                <input
                  type="text"
                  placeholder="Search candidate..."
                  className="bg-transparent outline-none text-white w-full placeholder:text-gray-500"
                />

              </div>

            </div>

            {/* USERS */}
            <div className="overflow-y-auto h-full pb-28">

              {chatUsers.map(
                (user) => (
                  <motion.div
                    key={user.id}
                    whileHover={{
                      scale: 1.01,
                    }}
                    onClick={() =>
                      setActiveUser(user)
                    }
                    className={`flex items-center gap-4 p-5 cursor-pointer border-b border-white/5 transition-all duration-300 ${
                      activeUser.id ===
                      user.id
                        ? "bg-cyan-500/10"
                        : "hover:bg-white/5"
                    }`}
                  >

                    {/* IMAGE */}
                    <div className="relative">

                      <img
                        src={user.image}
                        alt=""
                        className="w-14 h-14 rounded-2xl object-cover"
                      />

                      {user.online && (
                        <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#050816]"></span>
                      )}

                    </div>

                    {/* INFO */}
                    <div className="flex-1">

                      <div className="flex items-center justify-between">

                        <h3 className="text-white font-semibold">

                          {user.name}

                        </h3>

                        {user.unread >
                          0 && (
                          <span className="min-w-[22px] h-[22px] rounded-full bg-cyan-500 text-white text-xs flex items-center justify-center font-bold">

                            {
                              user.unread
                            }

                          </span>
                        )}

                      </div>

                      <p className="text-gray-400 text-sm mt-1">

                        {user.role}

                      </p>

                    </div>

                  </motion.div>
                )
              )}

            </div>

          </motion.div>

          {/* CHAT AREA */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-2xl overflow-hidden flex flex-col h-[75vh]"
          >

            {/* TOP */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/5">

              <div className="flex items-center gap-4">

                <div className="relative">

                  <img
                    src={
                      activeUser.image
                    }
                    alt=""
                    className="w-14 h-14 rounded-2xl object-cover"
                  />

                  {activeUser.online && (
                    <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#050816]"></span>
                  )}

                </div>

                <div>

                  <h2 className="text-white font-bold text-lg">

                    {
                      activeUser.name
                    }

                  </h2>

                  <p className="text-sm text-gray-400 flex items-center gap-2">

                    <FaCircle className="text-green-400 text-[10px]" />

                    {activeUser.online
                      ? "Online"
                      : "Offline"}

                  </p>

                </div>

              </div>

            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">

              <AnimatePresence>

                {messages.map(
                  (
                    message,
                    index
                  ) => (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className={`flex ${
                        message.sender ===
                        "recruiter"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >

                      <div
                        className={`max-w-[70%] px-5 py-4 rounded-3xl shadow-xl ${
                          message.sender ===
                          "recruiter"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-md"
                            : "bg-white/10 border border-white/10 text-gray-200 rounded-bl-md"
                        }`}
                      >

                        <p className="leading-relaxed">

                          {
                            message.text
                          }

                        </p>

                        <p className="text-xs mt-2 opacity-70 text-right">

                          {
                            message.time
                          }

                        </p>

                      </div>

                    </motion.div>
                  )
                )}

              </AnimatePresence>

            </div>

            {/* INPUT */}
            <div className="p-5 border-t border-white/10 bg-white/5">

              <div className="flex items-center gap-4 bg-[#0b1120]/80 border border-white/10 rounded-2xl px-4 py-3">

                <button className="text-gray-400 hover:text-cyan-400 transition">

                  <FaSmile />

                </button>

                <button className="text-gray-400 hover:text-cyan-400 transition">

                  <FaImage />

                </button>

                <input
                  type="text"
                  placeholder="Type your message..."
                  value={
                    newMessage
                  }
                  onChange={(e) =>
                    setNewMessage(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) =>
                    e.key ===
                      "Enter" &&
                    handleSendMessage()
                  }
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
                />

                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={
                    handleSendMessage
                  }
                  className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-xl"
                >

                  <FaPaperPlane />

                </motion.button>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
}

export default RecruiterMessages;