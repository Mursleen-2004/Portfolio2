import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaGithub,
  FaChevronRight,
  FaCheckCircle,
  FaRocket,
  FaLightbulb,
  FaBullseye,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";
import { projects } from "../data/projects";

// ─────────────────────────────────────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────────────────────────────────────
const pageVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemFade = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper sub-components
// ─────────────────────────────────────────────────────────────────────────────
const ContentCard = ({ children, className = "", isDark }) => (
  <div
    className={`rounded-2xl p-6 md:p-8 shadow-lg ${
      isDark ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200"
    } ${className}`}
  >
    {children}
  </div>
);

const CardHeading = ({ icon, children, isDark }) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="text-2xl">{icon}</span>
    <h2
      className={`text-xl font-bold ${isDark ? "text-[#22D3EE]" : "text-cyan-700"}`}
    >
      {children}
    </h2>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const project = projects.find((p) => p.id === id);

  // Scroll to top on project change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // ── Colour helpers ──────────────────────────────────────────────────────
  const bg = isDark
    ? "bg-gradient-to-br from-[#020817] to-[#0F172A]"
    : "bg-[#F8FAFC]";
  const textMain = isDark ? "text-white" : "text-gray-900";
  const textMuted = isDark ? "text-gray-300" : "text-gray-600";
  const accent = isDark ? "text-[#22D3EE]" : "text-violet-600";

  // ── 404 State ───────────────────────────────────────────────────────────
  if (!project) {
    return (
      <div className={`min-h-screen ${bg} ${textMain}`}>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`rounded-3xl p-12 text-center max-w-md shadow-2xl ${
              isDark ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200"
            }`}
          >
            <div className="text-7xl mb-6">🔍</div>
            <h1 className="text-3xl font-extrabold mb-3">Project Not Found</h1>
            <p className={`mb-8 ${textMuted}`}>
              The project you&apos;re looking for doesn&apos;t exist or may have been
              moved.
            </p>
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F59E0B] text-gray-900 font-bold rounded-xl hover:bg-yellow-300 transition-all duration-300 hover:scale-105"
            >
              <FaArrowLeft /> Back to Projects
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Next project ─────────────────────────────────────────────────────────
  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className={`min-h-screen ${bg} ${textMain}`}>
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="pt-20 pb-24"
        >
          {/* ── Back Button ─────────────────────────────────────────────────── */}
          <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto pt-6 pb-4">
            <button
              onClick={() => navigate(-1)}
              className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "border-white/20 text-gray-300 hover:bg-white/10"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaArrowLeft /> Back to Projects
            </button>
          </div>

          {/* ── Hero Section ─────────────────────────────────────────────────── */}
          <div className="relative w-full overflow-hidden max-h-[480px] md:max-h-[560px]">
            <motion.img
              src={project.image}
              alt={project.name}
              className="w-full object-cover max-h-[480px] md:max-h-[560px]"
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Overlaid text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-7xl mx-auto"
              >
                <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                  {project.name}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-[#22D3EE]/20 text-[#22D3EE] border border-[#22D3EE]/40 backdrop-blur-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Main Content + Sidebar Layout ─────────────────────────────── */}
          <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto mt-10">
            <div className="flex flex-col lg:flex-row gap-10">

              {/* ── Left: Content Sections ────────────────────────────────── */}
              <div className="flex-1 space-y-6">

                {/* 1. Overview */}
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  <ContentCard isDark={isDark}>
                    <CardHeading icon="📋" isDark={isDark}>Overview</CardHeading>
                    <p className={`leading-relaxed ${textMuted}`}>{project.overview}</p>
                  </ContentCard>
                </motion.div>

                {/* 2. Problem Statement */}
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  <ContentCard isDark={isDark}>
                    <CardHeading icon="🎯" isDark={isDark}>Problem Statement</CardHeading>
                    <div className="flex gap-3">
                      <FaBullseye
                        className={`mt-1 flex-shrink-0 ${accent}`}
                        size={16}
                      />
                      <p className={`leading-relaxed ${textMuted}`}>{project.problem}</p>
                    </div>
                  </ContentCard>
                </motion.div>

                {/* 3. Solution */}
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <ContentCard isDark={isDark}>
                    <CardHeading icon="💡" isDark={isDark}>Solution</CardHeading>
                    <div className="flex gap-3">
                      <FaLightbulb
                        className="mt-1 flex-shrink-0 text-[#F59E0B]"
                        size={16}
                      />
                      <p className={`leading-relaxed ${textMuted}`}>{project.solution}</p>
                    </div>
                  </ContentCard>
                </motion.div>

                {/* 4. Key Features */}
                {project.features && project.features.length > 0 && (
                  <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                  >
                    <ContentCard isDark={isDark}>
                      <CardHeading icon="⚡" isDark={isDark}>Key Features</CardHeading>
                      <motion.ul
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="space-y-3"
                      >
                        {project.features.map((feature, i) => (
                          <motion.li
                            key={i}
                            variants={itemFade}
                            className="flex items-start gap-3"
                          >
                            <FaCheckCircle
                              className="text-green-400 flex-shrink-0 mt-0.5"
                              size={16}
                            />
                            <span className={`text-sm leading-relaxed ${textMuted}`}>
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </ContentCard>
                  </motion.div>
                )}

                {/* 5. Tech Stack */}
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                >
                  <ContentCard isDark={isDark}>
                    <CardHeading icon="🛠️" isDark={isDark}>Tech Stack</CardHeading>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-300 hover:scale-105 ${
                            isDark
                              ? "bg-[#22D3EE]/10 border-[#22D3EE]/40 text-[#22D3EE]"
                              : "bg-violet-50 border-violet-300 text-cyan-700"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </ContentCard>
                </motion.div>

                {/* 6. Architecture */}
                {project.architecture && (
                  <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    custom={5}
                  >
                    <ContentCard isDark={isDark}>
                      <CardHeading icon="🏗️" isDark={isDark}>Architecture</CardHeading>
                      <div
                        className={`rounded-xl p-5 overflow-x-auto ${
                          isDark ? "bg-black/40 border border-white/10" : "bg-gray-50 border border-gray-200"
                        }`}
                      >
                        <pre
                          className={`font-mono text-sm leading-relaxed whitespace-pre-wrap ${
                            isDark ? "text-[#22D3EE]" : "text-cyan-700"
                          }`}
                        >
                          {project.architecture}
                        </pre>
                      </div>
                    </ContentCard>
                  </motion.div>
                )}

                {/* 7. Challenges */}
                {project.challenges && project.challenges.length > 0 && (
                  <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    custom={6}
                  >
                    <ContentCard isDark={isDark}>
                      <CardHeading icon="🧩" isDark={isDark}>Challenges</CardHeading>
                      <motion.ol
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                      >
                        {project.challenges.map((challenge, i) => (
                          <motion.li
                            key={i}
                            variants={itemFade}
                            className="flex items-start gap-4"
                          >
                            <span
                              className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                                isDark
                                  ? "bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/30"
                                  : "bg-cyan-100 text-cyan-700 border border-violet-300"
                              }`}
                            >
                              {i + 1}
                            </span>
                            <span className={`text-sm leading-relaxed pt-0.5 ${textMuted}`}>
                              {challenge}
                            </span>
                          </motion.li>
                        ))}
                      </motion.ol>
                    </ContentCard>
                  </motion.div>
                )}

                {/* 8. Results */}
                {project.results && (
                  <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    custom={7}
                  >
                    <div
                      className={`rounded-2xl p-6 md:p-8 shadow-xl ${
                        isDark
                          ? "bg-gradient-to-br from-[#F59E0B]/15 to-[#F59E0B]/5 border border-[#F59E0B]/30"
                          : "bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">🚀</span>
                        <h2
                          className={`text-xl font-bold ${
                            isDark ? "text-[#F59E0B]" : "text-yellow-700"
                          }`}
                        >
                          Results &amp; Impact
                        </h2>
                      </div>
                      <div className="flex gap-3">
                        <FaRocket
                          className={`mt-0.5 flex-shrink-0 ${
                            isDark ? "text-[#F59E0B]" : "text-yellow-600"
                          }`}
                          size={16}
                        />
                        <p className={`leading-relaxed ${textMuted}`}>{project.results}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

              </div>

              {/* ── Right: Sticky Sidebar (desktop) ──────────────────────── */}
              <div className="lg:w-72 xl:w-80 flex-shrink-0">
                <div className="lg:sticky lg:top-24 space-y-4">
                  {/* CTA Card */}
                  <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                  >
                    <ContentCard isDark={isDark}>
                      <h3 className={`text-lg font-bold mb-4 ${textMain}`}>
                        View Project
                      </h3>
                      <div className="space-y-3">
                        <a
                          href={project.preview}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#F59E0B] text-gray-900 font-bold rounded-xl text-sm hover:bg-yellow-300 transition-all duration-300 hover:scale-105 shadow-md shadow-yellow-500/20"
                        >
                          <FaExternalLinkAlt size={13} /> Live Demo
                        </a>
                        <a
                          href={project.code}
                          target="_blank"
                          rel="noreferrer"
                          className={`flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold border transition-all duration-300 hover:scale-105 ${
                            isDark
                              ? "bg-[#22D3EE]/10 border-[#22D3EE]/40 text-[#22D3EE] hover:bg-[#22D3EE]/20"
                              : "bg-violet-50 border-violet-400 text-cyan-700 hover:bg-violet-50"
                          }`}
                        >
                          <FaGithub size={15} /> View Source Code
                        </a>
                      </div>
                    </ContentCard>
                  </motion.div>

                  {/* Category badge */}
                  <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                  >
                    <ContentCard isDark={isDark}>
                      <h3 className={`text-sm font-semibold mb-3 ${textMuted}`}>
                        Category
                      </h3>
                      <span
                        className={`inline-block px-4 py-2 rounded-xl text-sm font-semibold ${
                          isDark
                            ? "bg-[#22D3EE]/10 border border-[#22D3EE]/30 text-[#22D3EE]"
                            : "bg-violet-50 border border-violet-300 text-cyan-700"
                        }`}
                      >
                        {project.category}
                      </span>
                    </ContentCard>
                  </motion.div>

                  {/* All projects link */}
                  <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                  >
                    <Link
                      to="/#projects"
                      className={`flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold border transition-all duration-300 hover:scale-105 ${
                        isDark
                          ? "border-white/20 text-gray-300 hover:bg-white/10"
                          : "border-gray-300 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      View All Projects
                    </Link>
                  </motion.div>
                </div>
              </div>

            </div>

            {/* ── Mobile bottom bar ────────────────────────────────────────── */}
            <div
              className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 py-3 flex gap-3 ${
                isDark ? "bg-[#020817]/95 backdrop-blur-md border-t border-white/10" : "bg-white/95 backdrop-blur-md border-t border-gray-200"
              } shadow-2xl`}
            >
              <a
                href={project.preview}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#F59E0B] text-gray-900 font-bold rounded-xl text-sm hover:bg-yellow-300 transition-colors duration-300"
              >
                <FaExternalLinkAlt size={12} /> Live Demo
              </a>
              <a
                href={project.code}
                target="_blank"
                rel="noreferrer"
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border transition-colors duration-300 ${
                  isDark
                    ? "border-[#22D3EE]/50 text-[#22D3EE] hover:bg-[#22D3EE]/10"
                    : "border-violet-400 text-cyan-700 hover:bg-violet-50"
                }`}
              >
                <FaGithub size={14} /> Source
              </a>
            </div>

            {/* ── Next Project ─────────────────────────────────────────────── */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={8}
              className="mt-12 mb-24 lg:mb-0"
            >
              <p className={`text-sm font-medium mb-3 ${textMuted}`}>Next Project</p>
              <Link
                to={`/projects/${nextProject.id}`}
                className={`group flex items-center justify-between rounded-2xl p-5 md:p-6 border transition-all duration-300 hover:scale-[1.01] shadow-lg hover:shadow-xl ${
                  isDark
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white border-gray-200 hover:border-violet-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={nextProject.image}
                    alt={nextProject.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div>
                    <h4 className={`font-bold ${textMain}`}>{nextProject.name}</h4>
                    <p className={`text-sm ${accent}`}>{nextProject.category}</p>
                  </div>
                </div>
                <FaChevronRight
                  className={`flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${textMuted}`}
                />
              </Link>
            </motion.div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetail;
