import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Plus, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { analyzeHealthReportAPI } from "../services/apiServices";

const HealthAIModal = ({ open, close }) => {
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const [file, setFile] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // 🔥 Animated AI loading messages
  const loadingMessages = [
    "Analyzing report",
    "Checking blood values",
    "Detecting abnormalities",
    "Generating insights"
  ];
  const [loadingIndex, setLoadingIndex] = useState(0);

  useEffect(() => {
    if (aiLoading) {
      const interval = setInterval(() => {
        setLoadingIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [aiLoading]);

  useEffect(() => {
    if (open) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setChat((prev) => [
      ...prev,
      { role: "user", text: message },
      { role: "ai", text: "..." }
    ]);

    setMessage("");
  };

  const typeMessage = (fullText) => {
    let i = 0;
    let current = "";

    const interval = setInterval(() => {
      current += fullText[i];
      i++;

      setChat((prev) => [
        ...prev.slice(0, -1),
        { role: "ai", text: current }
      ]);

      if (i >= fullText.length) clearInterval(interval);
    }, 15);
  };

  const handleFileUpload = async (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setShowMenu(false);

    setChat((prev) => [
      ...prev,
      { role: "user", text: `Uploaded: ${selectedFile.name}` },
      { role: "ai", text: "" }
    ]);

    try {
      setAiLoading(true);

      const formData = new FormData();
      formData.append("report", selectedFile);

      const res = await analyzeHealthReportAPI(formData);
      const data = res.data; // FIXED

      const formatted = [
        `🧾 Summary: ${data.summary || "No summary available"}`,

        `⚠️ Issues:\n${
          data.healthIssues?.length
            ? data.healthIssues.map(i => `• ${i.testName}: ${i.issue}`).join("\n")
            : "No issues found"
        }`,

        `🚨 Risks:\n${
          data.risks?.length
            ? data.risks.map(r => `• ${r}`).join("\n")
            : "No risks identified"
        }`,

        `💡 Plan:\n${
          data.improvementPlan?.length
            ? data.improvementPlan.map(p => `• ${p.diet}`).join("\n")
            : "No plan available"
        }`,

        `📅 Recovery:\n${
          data.recoveryPlan?.length
            ? data.recoveryPlan.map(r => `• Day ${r.day}: ${r.plan}`).join("\n")
            : "No recovery plan available"
        }`,

        `❓ Common Questions:\n${
          data.userQuestions?.length
            ? data.userQuestions
                .map(q => `Q: ${q.question}\nA: ${q.answer}`)
                .join("\n\n")
            : "No questions generated"
        }`
      ].join("\n\n");

      setChat((prev) => [
        ...prev.slice(0, -1),
        { role: "ai", text: "" }
      ]);

      typeMessage(formatted);

    } catch (err) {
      setChat((prev) => [
        ...prev.slice(0, -1),
        { role: "ai", text: " Failed to analyze report" }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50"
            onClick={close}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 80 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 60 }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
            className="fixed left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[690px] z-[60] rounded-[32px] overflow-hidden bg-white/60 backdrop-blur-2xl border border-white/30 shadow-[0_30px_100px_rgba(0,0,0,0.35)] flex flex-col"
          >
            <div className="flex items-center justify-between px-7 py-5 border-b border-white/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                  🧠
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-800">
                    AI Health Assistant
                  </h2>
                  <p className="text-xs text-gray-400">
                    Intelligent diagnostics & insights
                  </p>
                </div>
              </div>

              <button onClick={close} className="p-2 rounded-xl hover:bg-white/50 transition">
                <X size={20} />
              </button>
            </div>

            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-16 h-16 rounded-full border-4 border-cyan-500 border-t-transparent"
                />
                <p className="text-gray-500 text-sm">Initializing AI Engine...</p>
              </div>
            ) : (
              <>
                <div className="flex-1 px-7 py-6 overflow-y-auto space-y-4">
                  {chat.length === 0 && (
                    <div className="text-center mt-32 text-gray-400">
                      Ask anything about your health
                    </div>
                  )}

                  {chat.map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${c.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm max-w-[75%] whitespace-pre-line ${
                          c.role === "user"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                            : "bg-white/80 border backdrop-blur"
                        }`}
                      >
                        {aiLoading && i === chat.length - 1 ? (
                          <div className="flex items-center gap-2">
                            <span>{loadingMessages[loadingIndex]}</span>
                            <motion.span
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                            >
                              ...
                            </motion.span>
                          </div>
                        ) : (
                          c.text
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="relative p-5 border-t border-white/20 bg-white/50 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowMenu(!showMenu)}
                      className="p-3 rounded-xl bg-white/70 hover:bg-white transition"
                    >
                      <Plus size={18} />
                    </button>

                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask anything about your health..."
                      className="flex-1 px-5 py-4 rounded-2xl text-sm bg-white/70 backdrop-blur border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={sendMessage}
                      className="px-5 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                    >
                      <Send size={18} />
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {showMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-20 left-5 w-60 bg-white/90 backdrop-blur-xl border rounded-2xl shadow-xl overflow-hidden"
                      >
                        <label className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
                          <Upload size={18} />
                          Upload Report
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e.target.files[0])}
                          />
                        </label>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HealthAIModal;