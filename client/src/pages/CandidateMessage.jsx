import {
  useState,
  useEffect,
  useRef,
} from "react";

import axios from "axios";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FaSearch,
  FaPaperPlane,
  FaBriefcase,
  FaCircle,
  FaSmile,
  FaImage,
} from "react-icons/fa";

function CandidateMessages() {

  // =========================
  // STATES
  // =========================

  const [recruiters, setRecruiters] =
    useState([]);

  const [
    activeRecruiter,
    setActiveRecruiter,
  ] = useState(null);

  const [messages, setMessages] =
    useState([]);

  const [newMessage, setNewMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const messagesEndRef = useRef(null);

  // =========================
  // TOKEN
  // =========================

  const token =
    localStorage.getItem("token");

  // =========================
  // FETCH RECRUITERS
  // =========================

  const fetchRecruiters =
    async () => {

      try {

        const { data } =
          await axios.get(
            "http://localhost:5000/api/recruiters",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setRecruiters(data.data);

        if (
          data.data.length > 0
        ) {
          setActiveRecruiter(
            data.data[0]
          );
        }

      } catch (error) {

        console.log(error);

      }
    };

  // =========================
  // FETCH MESSAGES
  // =========================

  const fetchMessages =
    async () => {

      if (!activeRecruiter)
        return;

      try {

        setLoading(true);

        const { data } =
          await axios.get(
            `http://localhost:5000/api/messages/${activeRecruiter._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setMessages(
          data.data
        );

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);

      }
    };

  // =========================
  // SEND MESSAGE
  // =========================

  const handleSendMessage =
    async () => {

      if (!newMessage.trim())
        return;

      try {

        const { data } =
          await axios.post(
            "http://localhost:5000/api/messages/send",
            {
              receiver:
                activeRecruiter._id,
              text: newMessage,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setMessages((prev) => [
          ...prev,
          data.data,
        ]);

        setNewMessage("");

      } catch (error) {

        console.log(error);

      }
    };

  // =========================
  // AUTO SCROLL
  // =========================

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  // =========================
  // INITIAL FETCH
  // =========================

  useEffect(() => {

    fetchRecruiters();

  }, []);

  // =========================
  // FETCH CHAT WHEN USER CHANGE
  // =========================

  useEffect(() => {

    if (activeRecruiter) {
      fetchMessages();
    }

  }, [activeRecruiter]);

  return (
    <div className="min-h-screen bg-[#050816] pt-28 px-4 pb-10 overflow-hidden">

      {/* BG EFFECTS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"></div>

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

            <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-2xl">

              <FaBriefcase className="text-white text-2xl" />

            </div>

            Candidate Messages

          </h1>

          <p className="text-gray-400 mt-3 text-lg">

            Chat with recruiters and companies instantly.

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
                  placeholder="Search recruiter..."
                  className="bg-transparent outline-none text-white w-full placeholder:text-gray-500"
                />

              </div>

            </div>

            {/* USERS */}
            <div className="overflow-y-auto h-full pb-28">

              {recruiters.map(
                (recruiter) => (
                  <motion.div
                    key={
                      recruiter._id
                    }
                    whileHover={{
                      scale: 1.01,
                    }}
                    onClick={() =>
                      setActiveRecruiter(
                        recruiter
                      )
                    }
                    className={`flex items-center gap-4 p-5 cursor-pointer border-b border-white/5 transition-all duration-300 ${
                      activeRecruiter?._id ===
                      recruiter._id
                        ? "bg-cyan-500/10"
                        : "hover:bg-white/5"
                    }`}
                  >

                    {/* IMAGE */}
                    <div className="relative">

                      <img
                        src={
                          recruiter.profileImage ||
                          "https://i.pravatar.cc/150"
                        }
                        alt=""
                        className="w-14 h-14 rounded-2xl object-cover"
                      />

                      {recruiter.online && (
                        <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#050816]"></span>
                      )}

                    </div>

                    {/* INFO */}
                    <div className="flex-1">

                      <div className="flex items-center justify-between">

                        <h3 className="text-white font-semibold">

                          {
                            recruiter.name
                          }

                        </h3>

                      </div>

                      <p className="text-gray-400 text-sm mt-1">

                        {
                          recruiter.companyName
                        }

                      </p>

                    </div>

                  </motion.div>
                )
              )}

            </div>

          </motion.div>

          {/* CHAT */}
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
            {activeRecruiter && (
              <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/5">

                <div className="flex items-center gap-4">

                  <div className="relative">

                    <img
                      src={
                        activeRecruiter.profileImage ||
                        "https://i.pravatar.cc/150"
                      }
                      alt=""
                      className="w-14 h-14 rounded-2xl object-cover"
                    />

                    {activeRecruiter.online && (
                      <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#050816]"></span>
                    )}

                  </div>

                  <div>

                    <h2 className="text-white font-bold text-lg">

                      {
                        activeRecruiter.name
                      }

                    </h2>

                    <p className="text-sm text-gray-400 flex items-center gap-2">

                      <FaCircle className="text-green-400 text-[10px]" />

                      {activeRecruiter.online
                        ? "Online"
                        : "Offline"}

                    </p>

                  </div>

                </div>

              </div>
            )}

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">

              {loading ? (
                <p className="text-gray-400 text-center">
                  Loading messages...
                </p>
              ) : (
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
                          activeRecruiter._id
                            ? "justify-start"
                            : "justify-end"
                        }`}
                      >

                        <div
                          className={`max-w-[70%] px-5 py-4 rounded-3xl shadow-xl ${
                            message.sender ===
                            activeRecruiter._id
                              ? "bg-white/10 border border-white/10 text-gray-200 rounded-bl-md"
                              : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-md"
                          }`}
                        >

                          <p className="leading-relaxed">

                            {
                              message.text
                            }

                          </p>

                          <p className="text-xs mt-2 opacity-70 text-right">

                            {new Date(
                              message.createdAt
                            ).toLocaleTimeString()}

                          </p>

                        </div>

                      </motion.div>
                    )
                  )}

                </AnimatePresence>
              )}

              <div ref={messagesEndRef}></div>

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

export default CandidateMessages;