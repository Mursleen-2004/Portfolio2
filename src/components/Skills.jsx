import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills, radarSkills, skillCategories, levelColors } from "../data/skills.js";
import { useTheme } from "../context/ThemeContext";

// --------------------------------------------------------------------------
// SVG Radar Chart — pure SVG, no recharts
// radarSkills shape: [{ name: string, percent: number }]
// --------------------------------------------------------------------------
const RadarChart = ({ isDark }) => {
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = 100;
  const levels = 4; // concentric rings
  const count = radarSkills.length;

  // Compute angle for each axis (starting from top, going clockwise)
  const angle = (index) => (Math.PI * 2 * index) / count - Math.PI / 2;

  // Point on an axis at a given fraction of maxRadius
  const point = (index, fraction) => {
    const a = angle(index);
    return {
      x: cx + maxRadius * fraction * Math.cos(a),
      y: cy + maxRadius * fraction * Math.sin(a),
    };
  };

  // Build polygon points string for a given level ring
  const ringPoints = (fraction) =>
    Array.from({ length: count }, (_, i) => {
      const p = point(i, fraction);
      return `${p.x},${p.y}`;
    }).join(" ");

  // Build data polygon points string
  const dataPoints = radarSkills
    .map((skill, i) => {
      const p = point(i, skill.percent / 100);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  const ringColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const axisColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)";
  const labelColor = isDark ? "#e2e8f0" : "#374151";

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
      className="overflow-visible"
      style={{ maxWidth: size, maxHeight: size }}
    >
      {/* Level rings */}
      {Array.from({ length: levels }, (_, lvl) => {
        const fraction = (lvl + 1) / levels;
        return (
          <polygon
            key={lvl}
            points={ringPoints(fraction)}
            fill="none"
            stroke={ringColor}
            strokeWidth="1.5"
          />
        );
      })}

      {/* Axis lines */}
      {radarSkills.map((_, i) => {
        const outerPt = point(i, 1);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={outerPt.x}
            y2={outerPt.y}
            stroke={axisColor}
            strokeWidth="1.5"
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={dataPoints}
        fill="rgba(102,252,241,0.18)"
        stroke="#22D3EE"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Data point dots */}
      {radarSkills.map((skill, i) => {
        const p = point(i, skill.percent / 100);
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#22D3EE"
            stroke={isDark ? "#020817" : "#f0f9ff"}
            strokeWidth="2"
          />
        );
      })}

      {/* Axis labels */}
      {radarSkills.map((skill, i) => {
        const labelRadius = maxRadius + 22;
        const a = angle(i);
        const lx = cx + labelRadius * Math.cos(a);
        const ly = cy + labelRadius * Math.sin(a);
        // Determine text-anchor based on position
        let anchor = "middle";
        if (Math.cos(a) > 0.3) anchor = "start";
        else if (Math.cos(a) < -0.3) anchor = "end";

        return (
          <text
            key={i}
            x={lx}
            y={ly}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize="11"
            fontWeight="600"
            fill={labelColor}
          >
            {skill.name}
          </text>
        );
      })}
    </svg>
  );
};

// --------------------------------------------------------------------------
// Level badge using levelColors from data
// --------------------------------------------------------------------------
const LevelBadge = ({ level, isDark }) => {
  const colorMap = {
    Expert: isDark
      ? "bg-green-900/40 text-green-400 border border-green-500/40"
      : "bg-green-100 text-green-700 border border-green-300",
    Advanced: isDark
      ? "bg-cyan-900/40 text-[#22D3EE] border border-cyan-500/40"
      : "bg-cyan-100 text-cyan-700 border border-violet-300",
    Intermediate: isDark
      ? "bg-yellow-900/40 text-[#F59E0B] border border-yellow-500/40"
      : "bg-yellow-100 text-yellow-700 border border-yellow-300",
    Learning: isDark
      ? "bg-orange-900/40 text-orange-400 border border-orange-500/40"
      : "bg-orange-100 text-orange-700 border border-orange-300",
  };

  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
        colorMap[level] ?? "bg-gray-200 text-gray-700"
      }`}
    >
      {level}
    </span>
  );
};

// --------------------------------------------------------------------------
// Skill Card with animated progress bar via Framer Motion whileInView
// --------------------------------------------------------------------------
const SkillCard = ({ skill, isDark }) => {
  const progressColor = {
    Expert: "#22c55e",
    Advanced: "#22D3EE",
    Intermediate: "#F59E0B",
    Learning: "#f97316",
  };

  const barColor = progressColor[skill.level] ?? "#22D3EE";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`rounded-xl p-4 flex flex-col gap-3 border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
        isDark
          ? "bg-white/5 border-white/10 backdrop-blur-sm hover:border-[#22D3EE]/30"
          : "bg-white/70 border-gray-200/80 backdrop-blur-sm hover:border-violet-300"
      }`}
    >
      {/* Top row: icon + name + badge */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          {/* Icon — use image if available, else a colored circle */}
          {skill.icon ? (
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-7 h-7 object-contain"
            />
          ) : (
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-gray-900"
              style={{ backgroundColor: barColor }}
            >
              {skill.name.charAt(0)}
            </div>
          )}
          <span
            className={`text-sm font-semibold ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            {skill.name}
          </span>
        </div>
        <LevelBadge level={skill.level} isDark={isDark} />
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span
            className={`text-xs ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Proficiency
          </span>
          <span
            className={`text-xs font-semibold`}
            style={{ color: barColor }}
          >
            {skill.percent}%
          </span>
        </div>
        <div
          className={`w-full h-1.5 rounded-full overflow-hidden ${
            isDark ? "bg-white/10" : "bg-gray-200"
          }`}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: barColor }}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.percent}%` }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// --------------------------------------------------------------------------
// Main Skills Component
// --------------------------------------------------------------------------
const Skills = () => {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className={`py-16 sm:py-24 px-4 sm:px-6 md:px-16 ${
        isDark
          ? "bg-gradient-to-br from-[#020817] to-[#0F172A] text-white"
          : "bg-[#F8FAFC] text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2
            className={`text-4xl md:text-5xl font-extrabold mb-3 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Skills &amp;{" "}
            <span className="text-[#22D3EE]">Expertise</span>
          </h2>
          <p
            className={`text-base max-w-xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Technologies I use to deliver complete, production-ready solutions — from responsive frontends to robust backends and databases.
          </p>
        </motion.div>

        {/* Radar Chart + Category Filter Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start justify-between mb-10 lg:mb-14">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-shrink-0 flex flex-col items-center gap-4 w-full max-w-[300px] mx-auto lg:mx-0"
          >
            <h3
              className={`text-sm font-semibold uppercase tracking-widest ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Skill Radar
            </h3>
            <div
              className={`p-4 sm:p-6 rounded-2xl border w-full ${
                isDark
                  ? "bg-white/5 border-white/10 backdrop-blur-sm"
                  : "bg-white/70 border-gray-200/80 backdrop-blur-sm"
              }`}
            >
              <RadarChart isDark={isDark} />
            </div>
          </motion.div>

          {/* Category Filter Tabs + Info */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h3
                className={`text-sm font-semibold uppercase tracking-widest mb-4 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Filter by Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillCategories.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
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
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Expert", count: skills.filter((s) => s.level === "Expert").length, color: "text-green-400" },
                { label: "Advanced", count: skills.filter((s) => s.level === "Advanced").length, color: "text-[#22D3EE]" },
                { label: "Intermediate", count: skills.filter((s) => s.level === "Intermediate").length, color: "text-[#F59E0B]" },
                { label: "Learning", count: skills.filter((s) => s.level === "Learning").length, color: "text-orange-400" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-xl p-3 text-center border ${
                    isDark
                      ? "bg-white/5 border-white/10"
                      : "bg-white/70 border-gray-200/80"
                  }`}
                >
                  <p className={`text-2xl font-extrabold ${stat.color}`}>
                    {stat.count}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <SkillCard skill={skill} isDark={isDark} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-16">
            <p
              className={`text-lg ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No skills found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
