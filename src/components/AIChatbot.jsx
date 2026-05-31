import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaPaperPlane, FaTimes } from "react-icons/fa";

const SUGGESTED = [
  "What are your skills?",
  "Tell me about your projects",
  "Are you open to work?",
  "How to contact you?",
];

function getMockResponse(msg) {
  const m = msg.toLowerCase();
  if (/skill|tech|stack|react|mern|node|mongo/.test(m))
    return "I'm proficient in the full MERN stack:\n• React.js (80%) — Advanced\n• JavaScript (82%) — Advanced\n• Node.js (72%) — Intermediate\n• MongoDB (70%) — Intermediate\n• Tailwind CSS (85%) — Advanced\n• Python (70%) + ML (55%)\n\nI also integrate AI APIs in my projects!";
  if (/project|built|work|made|portfolio/.test(m))
    return "Here are my 5 major projects:\n\n🧠 PromptIQ — AI Quiz Generator (MERN + OpenAI)\n🎨 Mind2Vision — AI Image Generator (MERN)\n💪 AthletIQ — AI Personal Trainer (React + Clerk)\n🏠 Real Estate Platform (React + Redux)\n🏨 QuickLodge — Hotel Booking App\n\nCheck the Projects section for live demos!";
  if (/contact|email|reach|message/.test(m))
    return "You can reach Mursleen at:\n📧 musabukhari20@gmail.com\n💼 LinkedIn: /mursleen-bukhari-322a86259\n🐙 GitHub: Mursleen-2004\n\nOr use the Contact section on this page!";
  if (/resume|cv|download/.test(m))
    return "📄 Download Mursleen's resume from the hero section above, or directly at /Resume.pdf\n\nIt covers his full MERN stack experience, AI projects, and certifications.";
  if (/educat|degree|university|study|college/.test(m))
    return "🎓 Mursleen is completing BS Computer Science at NFC Institute of Engineering & Technology, Multan (2021–2025).\n\nPreviously: FSc (ICS) at FG Degree College, Multan.";
  if (/availa|open|freelance|hire|job/.test(m))
    return "✅ Yes! Mursleen is currently open to:\n\n• Full-time positions\n• Freelance projects\n• Contract work\n\nFeel free to reach out at musabukhari20@gmail.com";
  if (/cert|coursera|meta|ibm/.test(m))
    return "🏆 Mursleen holds 6 certifications:\n\n• Meta Frontend Developer\n• Advanced React (Meta)\n• Python for Everybody\n• What is Data Science (IBM)\n• Tools of Data Science (IBM)\n• Data Science Methodologies (IBM)";
  if (/experience|background|about|who/.test(m))
    return "👋 Mursleen Bukhari is a MERN Stack Developer & AI Enthusiast from Multan, Pakistan.\n\nHe builds full-stack web apps and loves integrating AI. He's completed 5 production projects and 6 professional certifications, and is graduating in 2025.";
  return "Great question! I'd suggest browsing the portfolio sections for detailed info. For direct questions, reach Mursleen at musabukhari20@gmail.com 📬";
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi there! 👋 I'm Mursleen's AI assistant. Ask me about his skills, projects, experience, or availability!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    setMessages((p) => [...p, { role: "user", text: msg }]);
    setTyping(true);
    await new Promise((r) => setTimeout(r, 800));
    setTyping(false);
    setMessages((p) => [...p, { role: "ai", text: getMockResponse(msg) }]);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full text-white flex items-center justify-center shadow-2xl shadow-violet-500/30"
        style={{ background: "linear-gradient(135deg,#7C3AED,#22D3EE)" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Chat"
      >
        <motion.div
          className="absolute w-14 h-14 rounded-full bg-violet-500/30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {open ? <FaTimes size={20} /> : <FaRobot size={20} />}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 sm:bottom-24 z-50 flex flex-col rounded-2xl shadow-2xl shadow-violet-500/10 overflow-hidden border border-white/[0.07] bg-[#050B1A]/96 backdrop-blur-2xl"
            style={{ right: '1rem', width: 'min(22rem, calc(100vw - 2rem))', height: 'min(500px, calc(100vh - 120px))' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]" style={{ background:"linear-gradient(90deg,#0F172A,#1a0a2e)" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background:"linear-gradient(135deg,#7C3AED,#22D3EE)" }}>
                <FaRobot size={14} className="text-[#020817]" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">Mursleen's AI Assistant</p>
                <p className="text-[#22D3EE] text-xs">Ask me anything!</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white transition">
                <FaTimes size={14} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {SUGGESTED.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-xs px-3 py-1.5 rounded-full border border-[#22D3EE]/40 text-[#22D3EE] hover:bg-[#22D3EE]/10 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-violet-600 to-violet-500 text-white font-medium rounded-br-sm"
                        : "bg-white/[0.06] text-slate-200 rounded-bl-sm border border-white/[0.07]"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-2.5 flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-[#22D3EE]"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="flex gap-2 px-3 py-3 border-t border-white/10 bg-[#020817]/50"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/10 text-white placeholder-gray-400 rounded-xl px-3 py-2 text-sm outline-none border border-white/10 focus:border-[#22D3EE]/50 transition"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center disabled:opacity-40 hover:bg-violet-500 transition"
              >
                <FaPaperPlane size={13} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
