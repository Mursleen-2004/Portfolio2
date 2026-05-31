import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const PROMPT = "visitor@mursleen:~$ ";

const COMMANDS = {
  help: () => ({
    type: "success",
    lines: [
      { text: "┌─────────────────────────────────────────────┐", color: "cyan" },
      { text: "│           Available Commands                │", color: "cyan" },
      { text: "├──────────────┬──────────────────────────────┤", color: "cyan" },
      { text: "│  help        │  Show this help menu         │", color: "white" },
      { text: "│  about       │  About Mursleen              │", color: "white" },
      { text: "│  skills      │  Technical skills list       │", color: "white" },
      { text: "│  projects    │  View my projects            │", color: "white" },
      { text: "│  contact     │  Contact information         │", color: "white" },
      { text: "│  resume      │  View/download resume        │", color: "white" },
      { text: "│  download    │  Download resume PDF         │", color: "white" },
      { text: "│  github      │  GitHub profile              │", color: "white" },
      { text: "│  clear       │  Clear terminal              │", color: "white" },
      { text: "└──────────────┴──────────────────────────────┘", color: "cyan" },
    ],
  }),

  about: () => ({
    type: "success",
    lines: [
      { text: "👋 Hi! I'm Mursleen Bukhari, a MERN Stack Developer and AI Enthusiast.", color: "green" },
      { text: "   I build full-stack web apps and love integrating AI into products.", color: "green" },
      { text: "   Currently open to work!", color: "yellow" },
      { text: "", color: "white" },
      { text: "   📍 Location : Multan, Pakistan", color: "white" },
      { text: "   🎓 Degree   : BS Computer Science (2021–2025)", color: "white" },
      { text: "   💡 Focus    : MERN Stack | AI Integration | React", color: "white" },
    ],
  }),

  skills: () => ({
    type: "success",
    lines: [
      { text: "⚡ Technical Skills", color: "yellow" },
      { text: "─────────────────────────────────────────────", color: "cyan" },
      { text: "  Frontend", color: "cyan" },
      { text: "    HTML5         ████████████████████ 92%", color: "green" },
      { text: "    CSS3          ████████████████████ 88%", color: "green" },
      { text: "    JavaScript    ████████████████     82%", color: "green" },
      { text: "    React.js      ████████████████     80%", color: "green" },
      { text: "    Tailwind CSS  █████████████████    85%", color: "green" },
      { text: "", color: "white" },
      { text: "  Backend", color: "cyan" },
      { text: "    Node.js       ██████████████       75%", color: "yellow" },
      { text: "    Express.js    ██████████████       73%", color: "yellow" },
      { text: "    MongoDB       ██████████████       72%", color: "yellow" },
      { text: "    REST APIs     ████████████████     78%", color: "yellow" },
      { text: "", color: "white" },
      { text: "  AI & ML", color: "cyan" },
      { text: "    Python        ██████████████       70%", color: "white" },
      { text: "    OpenAI API    ████████████         60%", color: "white" },
      { text: "    LangChain     ███████              35%", color: "white" },
    ],
  }),

  projects: () => ({
    type: "success",
    lines: [
      { text: "🚀 My Projects", color: "yellow" },
      { text: "─────────────────────────────────────────────", color: "cyan" },
      { text: "  1. PromptIQ – AI Quiz Generator", color: "green" },
      { text: "     🔗 https://prompt-iq-ai-powered-quiz-generator-six.vercel.app/", color: "yellow" },
      { text: "", color: "white" },
      { text: "  2. Mind2Vision – AI Image Generator", color: "green" },
      { text: "     🔗 https://github.com/Mursleen-2004/AI-Powered-Text-To-image-Genrator", color: "yellow" },
      { text: "", color: "white" },
      { text: "  3. AthletIQ – AI Personal Trainer", color: "green" },
      { text: "     🔗 https://athelet-iq-personal-trainer.vercel.app/", color: "yellow" },
      { text: "", color: "white" },
      { text: "  4. Real Estate Website", color: "green" },
      { text: "     🔗 https://estate-reall.netlify.app/", color: "yellow" },
      { text: "", color: "white" },
      { text: "  5. QuickLodge – Hotel Booking App", color: "green" },
      { text: "     🔗 https://hotel-booking-app-lyart-beta.vercel.app/", color: "yellow" },
    ],
  }),

  contact: () => ({
    type: "success",
    lines: [
      { text: "📬 Contact Information", color: "yellow" },
      { text: "─────────────────────────────────────────────", color: "cyan" },
      { text: "  📧 Email    : musabukhari20@gmail.com", color: "green" },
      { text: "  💼 LinkedIn : /mursleen-bukhari-322a86259", color: "yellow" },
      { text: "  🐙 GitHub   : Mursleen-2004", color: "white" },
      { text: "  📍 Location : Multan, Pakistan", color: "white" },
      { text: "", color: "white" },
      { text: "  ✅ Status: Open to Work!", color: "green" },
    ],
  }),

  resume: () => ({
    type: "success",
    lines: [
      { text: "📄 Resume available at: /Resume.pdf", color: "green" },
      { text: "   Type 'download' to download it!", color: "yellow" },
    ],
  }),

  download: () => {
    if (typeof window !== "undefined") {
      window.open("/Resume.pdf", "_blank");
    }
    return {
      type: "success",
      lines: [
        { text: "📥 Opening resume PDF...", color: "green" },
        { text: "   If it didn't open, visit: /Resume.pdf", color: "yellow" },
      ],
    };
  },

  github: () => ({
    type: "success",
    lines: [
      { text: "🐙 GitHub: https://github.com/Mursleen-2004", color: "green" },
      { text: "   Check out my repos! I'm always building something new.", color: "yellow" },
    ],
  }),
};

const colorMap = {
  green: "text-green-400",
  yellow: "text-yellow-300",
  cyan: "text-cyan-400",
  white: "text-gray-200",
  red: "text-red-400",
};

const WELCOME_LINES = [
  { text: "╔══════════════════════════════════════════════╗", color: "cyan" },
  { text: "║   Welcome to Mursleen's Portfolio Terminal   ║", color: "cyan" },
  { text: "║              v1.0 — CLI Edition              ║", color: "cyan" },
  { text: "╚══════════════════════════════════════════════╝", color: "cyan" },
  { text: "", color: "white" },
  { text: "  Type 'help' to see available commands.", color: "yellow" },
  { text: "", color: "white" },
];

const Terminal = () => {
  const { isDark } = useTheme();

  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [initialized, setInitialized] = useState(false);

  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  // Add welcome message on mount
  useEffect(() => {
    if (!initialized) {
      setHistory(
        WELCOME_LINES.map((line, i) => ({
          id: `welcome-${i}`,
          type: "output",
          ...line,
        }))
      );
      setInitialized(true);
    }
  }, [initialized]);

  // Scroll to bottom on new output
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = useCallback(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const processCommand = useCallback(
    (rawCmd) => {
      const cmd = rawCmd.trim().toLowerCase();

      // Add the typed command line to history
      const commandLine = {
        id: `cmd-${Date.now()}`,
        type: "command",
        text: `${PROMPT}${rawCmd}`,
        color: "white",
      };

      if (cmd === "") {
        setHistory((prev) => [...prev, commandLine]);
        return;
      }

      if (cmd === "clear") {
        setHistory([]);
        return;
      }

      let outputLines = [];

      if (COMMANDS[cmd]) {
        const result = COMMANDS[cmd]();
        outputLines = result.lines.map((line, i) => ({
          id: `out-${Date.now()}-${i}`,
          type: "output",
          text: line.text,
          color: line.color,
        }));
      } else {
        outputLines = [
          {
            id: `err-${Date.now()}`,
            type: "output",
            text: `Command not found: '${rawCmd}'. Type 'help' to see available commands.`,
            color: "red",
          },
        ];
      }

      setHistory((prev) => [
        ...prev,
        commandLine,
        ...outputLines,
        { id: `spacer-${Date.now()}`, type: "output", text: "", color: "white" },
      ]);
    },
    []
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        const cmd = inputValue;
        if (cmd.trim()) {
          setCmdHistory((prev) => [cmd, ...prev]);
        }
        processCommand(cmd);
        setInputValue("");
        setHistoryIndex(-1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHistoryIndex((prev) => {
          const next = Math.min(prev + 1, cmdHistory.length - 1);
          if (cmdHistory[next] !== undefined) {
            setInputValue(cmdHistory[next]);
          }
          return next;
        });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setHistoryIndex((prev) => {
          const next = Math.max(prev - 1, -1);
          if (next === -1) {
            setInputValue("");
          } else if (cmdHistory[next] !== undefined) {
            setInputValue(cmdHistory[next]);
          }
          return next;
        });
      }
    },
    [inputValue, cmdHistory, processCommand]
  );

  const sectionBg = isDark ? "" : "bg-[#F8FAFC]";
  const headingColor = isDark ? "text-white" : "text-gray-900";
  const subColor = isDark ? "text-gray-400" : "text-gray-500";
  const accentColor = isDark ? "text-[#F59E0B]" : "text-yellow-600";

  return (
    <section
      id="terminal"
      className={`py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden ${sectionBg}`}
    >
      {isDark && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-20 w-80 h-80 bg-green-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 ${headingColor}`}>
            Developer <span className={accentColor}>Terminal</span>
          </h2>
          <p className={`text-sm md:text-base ${subColor}`}>
            Interact with my portfolio via the command line
          </p>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#22D3EE]" />
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          onClick={focusInput}
        >
          {/* macOS title bar */}
          <div className="bg-[#1e1e1e] flex items-center gap-2 px-4 py-3 border-b border-white/5">
            {/* Traffic lights */}
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-300 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer" />
            {/* Title */}
            <div className="flex-1 text-center">
              <span className="text-gray-400 text-xs font-medium">
                mursleen@portfolio: ~
              </span>
            </div>
          </div>

          {/* Terminal body */}
          <div
            ref={bodyRef}
            className="bg-[#0d1117] h-64 sm:h-80 md:h-96 overflow-y-auto overflow-x-auto p-3 sm:p-4 font-mono text-xs sm:text-sm cursor-text"
            onClick={focusInput}
          >
            {/* Output history */}
            {history.map((line) => (
              <div key={line.id} className={`leading-relaxed whitespace-pre ${colorMap[line.color] || "text-gray-200"}`}>
                {line.type === "command" ? (
                  <span className="text-gray-200">{line.text}</span>
                ) : (
                  <span className={colorMap[line.color] || "text-gray-200"}>
                    {line.text}
                  </span>
                )}
              </div>
            ))}

            {/* Input line */}
            <div className="flex items-center mt-1">
              <span className="text-green-400 select-none whitespace-pre text-xs sm:text-sm">{PROMPT}</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-gray-200 caret-green-400 font-mono text-xs sm:text-sm min-w-0"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                aria-label="Terminal input"
              />
            </div>
          </div>

          {/* Status bar */}
          <div className="bg-[#161b22] px-4 py-1.5 border-t border-white/5 flex items-center justify-between">
            <span className="text-green-500 text-xs font-mono">● connected</span>
            <span className="text-gray-500 text-xs font-mono">
              ↑↓ history • Enter to run
            </span>
          </div>
        </motion.div>

        {/* Hint chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mt-6"
        >
          {["help", "about", "skills", "projects", "contact"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                setInputValue(cmd);
                processCommand(cmd);
                setInputValue("");
                focusInput();
              }}
              className={`px-3 py-1 text-xs rounded-full border font-mono transition-all duration-200 ${
                isDark
                  ? "border-white/20 text-gray-400 hover:border-[#F59E0B] hover:text-[#F59E0B] bg-white/5"
                  : "border-gray-300 text-gray-600 hover:border-yellow-500 hover:text-yellow-600 bg-gray-100"
              }`}
            >
              $ {cmd}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Terminal;
