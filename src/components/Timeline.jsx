import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { timelineItems } from "../data/timeline.js";

const typeBadgeStyles = {
  education: {
    bg: "bg-violet-500/20",
    text: "text-cyan-300",
    border: "border-cyan-500/40",
    dot: "bg-cyan-400",
  },
  certification: {
    bg: "bg-yellow-500/20",
    text: "text-yellow-300",
    border: "border-yellow-500/40",
    dot: "bg-yellow-400",
  },
  project: {
    bg: "bg-purple-500/20",
    text: "text-purple-300",
    border: "border-purple-500/40",
    dot: "bg-purple-400",
  },
};

const typeBadgeStylesLight = {
  education: {
    bg: "bg-cyan-100",
    text: "text-cyan-700",
    border: "border-violet-300",
    dot: "bg-violet-500",
  },
  certification: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-400",
    dot: "bg-yellow-500",
  },
  project: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    border: "border-purple-300",
    dot: "bg-purple-500",
  },
};

const TimelineCard = ({ item, index, isDark }) => {
  const isLeft = index % 2 === 0;
  const badgeStyles = isDark
    ? typeBadgeStyles[item.type] || typeBadgeStyles.project
    : typeBadgeStylesLight[item.type] || typeBadgeStylesLight.project;

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isLeft ? -60 : 60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardBase = isDark
    ? "backdrop-blur-md bg-white/5 border border-white/10 text-white"
    : "backdrop-blur-md bg-white/80 border border-gray-200 text-gray-800 shadow-md";

  const orgColor = isDark ? "text-[#F59E0B]" : "text-yellow-600";
  const periodColor = isDark ? "text-gray-400" : "text-gray-500";
  const descColor = isDark ? "text-gray-300" : "text-gray-600";

  return (
    <>
      {/* Desktop layout */}
      <div className="hidden md:flex items-center w-full mb-12 relative">
        {/* Left side content */}
        <div className="w-5/12 flex justify-end pr-8">
          {isLeft && (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className={`rounded-2xl p-5 max-w-sm w-full ${cardBase}`}
              style={{ borderLeft: `3px solid ${item.color}` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{item.icon}</span>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeStyles.bg} ${badgeStyles.text} ${badgeStyles.border}`}
                >
                  {item.type}
                </span>
              </div>
              <h3 className="font-bold text-base leading-snug mb-1">{item.title}</h3>
              <p className={`text-sm font-medium mb-1 ${orgColor}`}>{item.organization}</p>
              <p className={`text-xs mb-2 ${periodColor}`}>{item.period}</p>
              <p className={`text-sm leading-relaxed ${descColor}`}>{item.description}</p>
            </motion.div>
          )}
        </div>

        {/* Center dot */}
        <div className="w-2/12 flex flex-col items-center">
          <div
            className={`w-4 h-4 rounded-full border-2 border-white shadow-lg z-10 ${badgeStyles.dot}`}
          />
        </div>

        {/* Right side content */}
        <div className="w-5/12 flex justify-start pl-8">
          {!isLeft && (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className={`rounded-2xl p-5 max-w-sm w-full ${cardBase}`}
              style={{ borderLeft: `3px solid ${item.color}` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{item.icon}</span>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeStyles.bg} ${badgeStyles.text} ${badgeStyles.border}`}
                >
                  {item.type}
                </span>
              </div>
              <h3 className="font-bold text-base leading-snug mb-1">{item.title}</h3>
              <p className={`text-sm font-medium mb-1 ${orgColor}`}>{item.organization}</p>
              <p className={`text-xs mb-2 ${periodColor}`}>{item.period}</p>
              <p className={`text-sm leading-relaxed ${descColor}`}>{item.description}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden items-start w-full mb-10 relative">
        {/* Left dot + line */}
        <div className="flex flex-col items-center mr-4 pt-1">
          <div
            className={`w-3 h-3 rounded-full border-2 border-white shadow z-10 flex-shrink-0 ${badgeStyles.dot}`}
          />
        </div>

        {/* Card */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -40 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className={`rounded-2xl p-4 flex-1 ${cardBase}`}
          style={{ borderLeft: `3px solid ${item.color}` }}
        >
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xl">{item.icon}</span>
            <span
              className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeStyles.bg} ${badgeStyles.text} ${badgeStyles.border}`}
            >
              {item.type}
            </span>
          </div>
          <h3 className="font-bold text-sm leading-snug mb-1">{item.title}</h3>
          <p className={`text-xs font-medium mb-1 ${orgColor}`}>{item.organization}</p>
          <p className={`text-xs mb-2 ${periodColor}`}>{item.period}</p>
          <p className={`text-xs leading-relaxed ${descColor}`}>{item.description}</p>
        </motion.div>
      </div>
    </>
  );
};

const Timeline = () => {
  const { isDark } = useTheme();

  const sectionBg = isDark ? "" : "bg-[#F8FAFC]";
  const headingColor = isDark ? "text-white" : "text-gray-900";
  const subColor = isDark ? "text-gray-400" : "text-gray-500";
  const accentColor = isDark ? "text-[#F59E0B]" : "text-yellow-600";

  return (
    <section
      id="timeline"
      className={`py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden ${sectionBg}`}
    >
      {/* Background blobs (dark only) */}
      {isDark && (
        <>
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="max-w-5xl mx-auto relative">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 ${headingColor}`}>
            Experience &{" "}
            <span className={accentColor}>Journey</span>
          </h2>
          <p className={`text-sm md:text-base ${subColor}`}>
            A timeline of my education, projects, and certifications
          </p>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#22D3EE]" />
        </motion.div>

        {/* Timeline container (desktop: relative for center line) */}
        <div className="relative">
          {/* Center line — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#F59E0B] via-[#22D3EE] to-[#F59E0B] opacity-40 rounded-full" />

          {/* Left line — mobile only */}
          <div className="md:hidden absolute left-[5px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F59E0B] via-[#22D3EE] to-[#F59E0B] opacity-40 rounded-full" />

          {/* Timeline items */}
          {timelineItems.map((item, index) => (
            <TimelineCard key={item.id} item={item} index={index} isDark={isDark} />
          ))}
        </div>

        {/* End cap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-4"
        >
          <div className="px-6 py-2 rounded-full bg-gradient-to-r from-[#F59E0B]/20 to-[#22D3EE]/20 border border-white/20 text-sm font-medium text-white/70">
            The journey continues... 🚀
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
