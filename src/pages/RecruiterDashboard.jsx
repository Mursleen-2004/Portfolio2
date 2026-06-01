import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaDownload,
  FaCalendarAlt,
  FaPrint,
  FaCopy,
  FaCheck,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaCertificate,
  FaBriefcase,
  FaRocket,
  FaCode,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";
import { projects } from "../data/projects";
import heroImage from "../assets/Mussa.jpg";

// ─────────────────────────────────────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.08 },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────
const topSkills = [
  { name: "React.js", level: "Advanced", percent: 80 },
  { name: "JavaScript", level: "Advanced", percent: 82 },
  { name: "Tailwind CSS", level: "Advanced", percent: 85 },
  { name: "Node.js", level: "Advanced", percent: 75 },
  { name: "MongoDB", level: "Advanced", percent: 72 },
  { name: "Python", level: "Intermediate", percent: 70 },
];

const levelColorMap = {
  Expert: "bg-green-500",
  Advanced: "bg-violet-500",
  Intermediate: "bg-yellow-400",
  Learning: "bg-orange-400",
};

const education = [
  {
    degree: "BS Computer Science",
    institution: "NFC IET Multan",
    period: "2021 – 2025",
    description:
      "Focused on Web Development, Data Structures, Algorithms, AI & Machine Learning.",
    icon: "🎓",
  },
  {
    degree: "Intermediate – ICS",
    institution: "FG Degree College, Multan Cantt",
    period: "2019 – 2021",
    description:
      "Studied Mathematics, Statistics, and Computer fundamentals.",
    icon: "📚",
  },
  {
    degree: "Matriculation – Science",
    institution: "Al-Noor Secondary School, Karachi",
    period: "2019",
    description: "Major in Science. Developed early passion for programming.",
    icon: "🏫",
  },
];

const quickStats = [
  { label: "Projects Built", value: "5", icon: <FaCode /> },
  { label: "Certifications", value: "6", icon: <FaCertificate /> },
  { label: "Years Study", value: "4", icon: <FaGraduationCap /> },
  { label: "AI Projects", value: "3+", icon: <FaRocket /> },
];

const availabilityOptions = [
  { id: "open", label: "Open to Work", emoji: "🟢", color: "green" },
  { id: "freelance", label: "Available for Freelance", emoji: "🔵", color: "blue" },
  { id: "contract", label: "Available for Contract", emoji: "🟡", color: "yellow" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helper: Section heading
// ─────────────────────────────────────────────────────────────────────────────
const SectionHeading = ({ children, isDark }) => (
  <h2
    className={`text-2xl md:text-3xl font-bold mb-6 ${
      isDark ? "text-[#22D3EE]" : "text-cyan-700"
    }`}
  >
    {children}
  </h2>
);

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
const RecruiterDashboard = () => {
  const { isDark } = useTheme();
  const [availability, setAvailability] = useState("open");
  const [copied, setCopied] = useState(false);

  const featuredProjects = projects.filter((p) => p.featured);

  const bg = isDark
    ? "bg-gradient-to-br from-[#020817] to-[#0F172A]"
    : "bg-[#F8FAFC]";
  const cardBg = isDark
    ? "bg-white/5 border border-white/10"
    : "bg-white border border-gray-200";
  const textMain = isDark ? "text-white" : "text-gray-900";
  const textMuted = isDark ? "text-gray-300" : "text-gray-600";
  const accent = isDark ? "text-[#22D3EE]" : "text-violet-600";
  const accentBg = isDark ? "bg-[#22D3EE]/10" : "bg-violet-50";
  const accentBorder = isDark ? "border-[#22D3EE]/30" : "border-violet-300";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("musabukhari20@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => window.print();

  const selectedOption = availabilityOptions.find((o) => o.id === availability);

  const availabilityBadgeColor = {
    green: isDark
      ? "bg-green-900/30 border-green-500/50 text-green-400"
      : "bg-green-50 border-green-400 text-green-700",
    blue: isDark
      ? "bg-blue-900/30 border-blue-500/50 text-blue-400"
      : "bg-blue-50 border-blue-400 text-blue-700",
    yellow: isDark
      ? "bg-yellow-900/30 border-yellow-500/50 text-yellow-300"
      : "bg-yellow-50 border-yellow-400 text-yellow-700",
  };

  return (
    <div className={`min-h-screen ${bg} ${textMain} print:bg-white print:text-black`}>
      {/* Navbar */}
      <Navbar />

      <div className="pt-20 pb-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto space-y-12">

        {/* ── Hero Card ────────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className={`rounded-3xl p-5 sm:p-6 md:p-8 lg:p-12 ${cardBg} shadow-2xl mt-8`}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              <div
                className={`rounded-full p-1.5 ${
                  isDark
                    ? "bg-gradient-to-br from-[#22D3EE] via-[#F59E0B] to-[#0F172A]"
                    : "bg-gradient-to-br from-cyan-400 via-yellow-300 to-blue-400"
                }`}
              >
                <div className={`rounded-full p-1 ${isDark ? "bg-[#020817]" : "bg-white"}`}>
                  <img
                    src={heroImage}
                    alt="Mursleen Bukhari"
                    className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover shadow-xl"
                  />
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <motion.div variants={fadeUp} custom={1}>
                <h1 className="text-3xl md:text-4xl font-extrabold">
                  Mursleen{" "}
                  <span className="text-[#F59E0B]">Bukhari</span>
                </h1>
                <p className={`text-lg font-medium mt-1 ${accent}`}>
                  MERN Stack Developer &amp; AI Engineer
                </p>
              </motion.div>

              {/* Availability badge */}
              {/* <motion.div variants={fadeUp} custom={2}>
                <span
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border ${
                    availabilityBadgeColor[selectedOption.color]
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-current animate-pulse" />
                  {selectedOption.label}
                </span>
              </motion.div> */}

              {/* Availability Selector */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-3 justify-center md:justify-start"
              >
                {availabilityOptions.map((opt) => (
                  <motion.button
                    key={opt.id}
                    variants={fadeUp}
                    onClick={() => setAvailability(opt.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                      availability === opt.id
                        ? isDark
                          ? "bg-[#22D3EE]/20 border-[#22D3EE] text-[#22D3EE]"
                          : "bg-cyan-100 border-cyan-500 text-cyan-700"
                        : isDark
                        ? "bg-white/5 border-white/20 text-gray-300 hover:border-white/40"
                        : "bg-gray-50 border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {opt.emoji} {opt.label}
                  </motion.button>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUp}
                custom={3}
                className="flex flex-wrap gap-3 justify-center md:justify-start pt-2"
              >
                <a
                  href="/Resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#F59E0B] text-gray-900 font-bold rounded-xl text-sm hover:bg-yellow-300 transition-all duration-300 hover:scale-105 shadow-lg shadow-yellow-500/20 print:hidden"
                >
                  <FaDownload /> Download Resume
                </a>
                <a
                  href="mailto:musabukhari20@gmail.com?subject=Meeting Request - Portfolio"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 border print:hidden ${
                    isDark
                      ? "bg-[#22D3EE]/15 border-[#22D3EE]/50 text-[#22D3EE] hover:bg-[#22D3EE]/25"
                      : "bg-violet-50 border-violet-400 text-cyan-700 hover:bg-violet-50"
                  }`}
                >
                  <FaCalendarAlt /> Schedule a Meeting
                </a>
                <button
                  onClick={handlePrint}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 border print:hidden ${
                    isDark
                      ? "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
                      : "bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FaPrint /> Print
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Quick Stats ──────────────────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {quickStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i}
              className={`${cardBg} rounded-2xl p-6 text-center shadow-lg hover:scale-105 transition-transform duration-300`}
            >
              <div className={`text-3xl mb-2 ${accent}`}>{stat.icon}</div>
              <div className="text-4xl font-extrabold text-[#F59E0B]">{stat.value}</div>
              <div className={`text-sm mt-1 font-medium ${textMuted}`}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Top Skills ───────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <SectionHeading isDark={isDark}>Top Skills</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i}
                className={`${cardBg} rounded-2xl p-5 shadow-lg`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className={`font-semibold text-sm ${textMain}`}>{skill.name}</span>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      levelColorMap[skill.level] || "bg-gray-500"
                    } text-white`}
                  >
                    {skill.level}
                  </span>
                </div>
                <div
                  className={`w-full h-2 rounded-full ${
                    isDark ? "bg-white/10" : "bg-gray-200"
                  }`}
                >
                  <motion.div
                    className={`h-2 rounded-full ${
                      levelColorMap[skill.level] || "bg-gray-500"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percent}%` }}
                    transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  />
                </div>
                <div className={`text-right text-xs mt-1 font-medium ${textMuted}`}>
                  {skill.percent}%
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Education Snapshot ───────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <SectionHeading isDark={isDark}>Education</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i}
                className={`${cardBg} rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition-transform duration-300`}
              >
                <div className="text-3xl mb-3">{edu.icon}</div>
                <h3 className={`font-bold text-base ${textMain}`}>{edu.degree}</h3>
                <p className={`text-sm font-medium mt-1 ${accent}`}>{edu.institution}</p>
                <p className={`text-xs mt-1 ${textMuted}`}>{edu.period}</p>
                <p className={`text-sm mt-2 leading-relaxed ${textMuted}`}>{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Featured Projects ─────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <SectionHeading isDark={isDark}>Featured Projects</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i}
                className={`${cardBg} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group`}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-xs rounded-full bg-black/50 text-[#22D3EE] border border-[#22D3EE]/40"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className={`font-bold text-lg leading-tight ${textMain}`}>
                    {project.name}
                  </h3>
                  <p className={`text-sm leading-relaxed ${textMuted}`}>
                    {project.description}
                  </p>
                  <div className="flex gap-3 pt-2">
                    <a
                      href={project.preview}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F59E0B] text-gray-900 text-xs font-bold rounded-lg hover:bg-yellow-300 transition-colors duration-300"
                    >
                      <FaExternalLinkAlt size={10} /> Live Demo
                    </a>
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border transition-colors duration-300 ${
                        isDark
                          ? "border-[#22D3EE]/50 text-[#22D3EE] hover:bg-[#22D3EE]/10"
                          : "border-violet-400 text-cyan-700 hover:bg-violet-50"
                      }`}
                    >
                      <FaGithub size={12} /> Code
                    </a>
                    <Link
                      to={`/projects/${project.id}`}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border transition-colors duration-300 ${
                        isDark
                          ? "border-white/20 text-gray-300 hover:bg-white/10"
                          : "border-gray-300 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Case Study
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Contact Info Card ─────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <SectionHeading isDark={isDark}>Get in Touch</SectionHeading>
          <div className={`${cardBg} rounded-2xl p-8 shadow-xl`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Email with copy */}
              <div
                className={`flex flex-col gap-2 p-5 rounded-xl ${accentBg} border ${accentBorder}`}
              >
                <div className={`flex items-center gap-2 ${accent} font-semibold text-sm`}>
                  <FaEnvelope /> Email
                </div>
                <span className={`text-sm font-medium ${textMain}`}>
                  musabukhari20@gmail.com
                </span>
                <button
                  onClick={handleCopyEmail}
                  className={`inline-flex items-center gap-2 mt-1 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-300 w-fit print:hidden ${
                    copied
                      ? isDark
                        ? "border-green-500/50 bg-green-900/20 text-green-400"
                        : "border-green-400 bg-green-50 text-green-700"
                      : isDark
                      ? "border-[#22D3EE]/30 text-[#22D3EE] hover:bg-[#22D3EE]/10"
                      : "border-violet-400 text-cyan-700 hover:bg-violet-50"
                  }`}
                >
                  {copied ? (
                    <>
                      <FaCheck size={10} /> Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy size={10} /> Copy Email
                    </>
                  )}
                </button>
              </div>

              {/* LinkedIn */}
              <div
                className={`flex flex-col gap-2 p-5 rounded-xl ${accentBg} border ${accentBorder}`}
              >
                <div className={`flex items-center gap-2 ${accent} font-semibold text-sm`}>
                  <FaLinkedin /> LinkedIn
                </div>
                <span className={`text-sm font-medium ${textMain}`}>
                  mursleen-bukhari-322a86259
                </span>
                <a
                  href="https://www.linkedin.com/in/mursleen-bukhari-322a86259/"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 mt-1 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-300 w-fit ${
                    isDark
                      ? "border-[#22D3EE]/30 text-[#22D3EE] hover:bg-[#22D3EE]/10"
                      : "border-violet-400 text-cyan-700 hover:bg-violet-50"
                  }`}
                >
                  <FaExternalLinkAlt size={10} /> View Profile
                </a>
              </div>

              {/* GitHub */}
              <div
                className={`flex flex-col gap-2 p-5 rounded-xl ${accentBg} border ${accentBorder}`}
              >
                <div className={`flex items-center gap-2 ${accent} font-semibold text-sm`}>
                  <FaGithub /> GitHub
                </div>
                <span className={`text-sm font-medium ${textMain}`}>
                  Mursleen-2004
                </span>
                <a
                  href="https://github.com/Mursleen-2004"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 mt-1 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-300 w-fit ${
                    isDark
                      ? "border-[#22D3EE]/30 text-[#22D3EE] hover:bg-[#22D3EE]/10"
                      : "border-violet-400 text-cyan-700 hover:bg-violet-50"
                  }`}
                >
                  <FaExternalLinkAlt size={10} /> View GitHub
                </a>
              </div>
            </div>

            {/* Bottom CTA bar */}
            <div className="mt-6 pt-6 border-t border-current/10 flex flex-wrap gap-4 items-center justify-between">
              <p className={`text-sm ${textMuted}`}>
                Interested in working together? Let&apos;s connect.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="mailto:musabukhari20@gmail.com?subject=Meeting Request - Portfolio"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F59E0B] text-gray-900 font-bold text-sm rounded-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105 print:hidden"
                >
                  <FaCalendarAlt /> Schedule a Meeting
                </a>
                <a
                  href="/Resume.pdf"
                  download
                  className={`inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-sm rounded-lg border transition-all duration-300 hover:scale-105 print:hidden ${
                    isDark
                      ? "bg-[#22D3EE]/15 border-[#22D3EE]/50 text-[#22D3EE] hover:bg-[#22D3EE]/25"
                      : "bg-violet-50 border-violet-400 text-cyan-700 hover:bg-violet-50"
                  }`}
                >
                  <FaDownload /> Resume
                </a>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          .print\\:bg-white { background: white !important; }
          .print\\:text-black { color: black !important; }
          body { background: white; color: black; }
        }
      `}</style>
    </div>
  );
};

export default RecruiterDashboard;
