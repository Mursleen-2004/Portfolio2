import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt, FaBookOpen } from "react-icons/fa";
import { projects, categories } from "../data/projects.js";
import { useTheme } from "../context/ThemeContext";

// --------------------------------------------------------------------------
// Debounce hook
// --------------------------------------------------------------------------
const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

// --------------------------------------------------------------------------
// Project Card
// --------------------------------------------------------------------------
const ProjectCard = ({ project, isDark, index }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      className={`group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
        isDark
          ? "bg-white/5 border-white/10 backdrop-blur-sm hover:border-[#22D3EE]/30 hover:shadow-[#22D3EE]/5"
          : "bg-white/80 border-gray-200/80 backdrop-blur-sm hover:border-violet-300 hover:shadow-gray-300/40"
      }`}
    >
      {/* Image area */}
      <div className="relative h-44 overflow-hidden">
        {!imageError ? (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center text-4xl font-extrabold ${
              isDark
                ? "bg-gradient-to-br from-[#020817] to-[#0F172A] text-[#22D3EE]/30"
                : "bg-gradient-to-br from-blue-50 to-cyan-100 text-cyan-300"
            }`}
          >
            {project.name.charAt(0)}
          </div>
        )}

        {/* Hover darkened overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 pointer-events-none" />

        {/* Featured badge */}
        {project.featured && (
          <span className="absolute top-3 left-3 bg-[#F59E0B] text-gray-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
            Featured
          </span>
        )}

        {/* Category badge */}
        <span
          className={`absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full ${
            isDark
              ? "bg-[#020817]/80 text-[#22D3EE] border border-[#22D3EE]/30 backdrop-blur-sm"
              : "bg-white/80 text-cyan-700 border border-cyan-200 backdrop-blur-sm"
          }`}
        >
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Project name */}
        <h3
          className={`text-base font-bold leading-snug ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {project.name}
        </h3>

        {/* Description — clamped to 2 lines */}
        <p
          className={`text-sm leading-relaxed line-clamp-2 flex-1 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {project.description}
        </p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                isDark
                  ? "bg-white/8 border border-white/12 text-gray-300"
                  : "bg-gray-100 border border-gray-200 text-gray-600"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-2 flex-wrap">
          {/* Live Demo */}
          {project.preview && (
            <a
              href={project.preview}
              target="_blank"
              rel="noreferrer"
              className="flex-1 min-w-[80px] flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 bg-[#F59E0B] text-gray-900 hover:bg-yellow-300 hover:scale-105"
            >
              <FaExternalLinkAlt size={10} />
              Live Demo
            </a>
          )}

          {/* GitHub */}
          {project.code && (
            <a
              href={project.code}
              target="_blank"
              rel="noreferrer"
              className={`flex-1 min-w-[80px] flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-105 ${
                isDark
                  ? "bg-white/8 border border-white/15 text-gray-200 hover:bg-white/15"
                  : "bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaGithub size={11} />
              GitHub
            </a>
          )}

          {/* Case Study */}
          <Link
            to={`/projects/${project.id}`}
            className={`flex-1 min-w-[80px] flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-105 ${
              isDark
                ? "border border-[#22D3EE]/30 text-[#22D3EE] hover:bg-[#22D3EE]/10"
                : "border border-violet-300 text-cyan-700 hover:bg-violet-50"
            }`}
          >
            <FaBookOpen size={10} />
            Case Study
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// --------------------------------------------------------------------------
// Main Projects Component
// --------------------------------------------------------------------------
const Projects = () => {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 280);

  const filteredProjects = useMemo(() => {
    let result = projects.filter(Boolean); // remove any null/undefined entries

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeCategory, debouncedSearch]);

  return (
    <section
      id="projects"
      className={`py-16 sm:py-24 px-4 sm:px-6 md:px-16 ${
        isDark ? "text-white" : "bg-[#F8FAFC] text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Featured{" "}
            <span className="text-[#F59E0B]">Projects</span>
          </h2>
          <p
            className={`text-base max-w-xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Things I&apos;ve built — from AI tools to full-stack web apps.
          </p>
        </motion.div>

        {/* Search + Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-10 items-start sm:items-center justify-between"
        >
          {/* Search Input */}
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-4 pr-10 py-2 rounded-xl text-sm border outline-none transition-all duration-300 ${
                isDark
                  ? "bg-white/8 border-white/15 text-white placeholder-gray-500 focus:border-[#22D3EE]/50 focus:bg-white/12"
                  : "bg-white/80 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-violet-300 focus:bg-white"
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${
                  isDark ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-gray-700"
                }`}
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileTap={{ scale: 0.94 }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#F59E0B] text-gray-900 shadow-md shadow-yellow-500/20"
                    : isDark
                    ? "bg-white/10 text-gray-300 hover:bg-white/15 border border-white/10"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        {(debouncedSearch || activeCategory !== "All") && (
          <p
            className={`text-xs mb-6 ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          >
            {filteredProjects.length} project
            {filteredProjects.length !== 1 ? "s" : ""} found
            {debouncedSearch ? ` for "${debouncedSearch}"` : ""}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
          </p>
        )}

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${debouncedSearch}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isDark={isDark}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-24 gap-4"
            >
              <div className="text-5xl opacity-20 select-none">🔍</div>
              <h3
                className={`text-xl font-bold ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                No projects found
              </h3>
              <p
                className={`text-sm text-center max-w-xs ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Try a different search term or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className={`mt-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isDark
                    ? "bg-[#F59E0B]/90 text-gray-900 hover:bg-[#F59E0B]"
                    : "bg-[#F59E0B] text-gray-900 hover:bg-yellow-300"
                }`}
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
