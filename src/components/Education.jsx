import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const educationData = [
  {
    title: "Matriculation",
    institute: "Al-Noor Secondary School, Karachi",
    year: "2019",
    detail: "Major in Science with Computer Science. Secured A grade with deep interest in problem-solving and logical thinking.",
    icon: "🏫",
    accent: "#8B5CF6",
  },
  {
    title: "Intermediate (FSc)",
    institute: "FG Degree College For Boys, Multan Cantt",
    year: "2019 – 2021",
    detail: "Studied ICS. Developed strong foundational knowledge in Mathematics, Statistics, and Computer fundamentals.",
    icon: "📚",
    accent: "#22D3EE",
  },
  {
    title: "BS Computer Science",
    institute: "NFC Institute of Engineering & Technology, Multan",
    year: "2021 – 2025",
    detail: "Focused on Web Development, Data Structures, AI & Machine Learning. Built multiple MERN and AI-powered projects.",
    icon: "🎓",
    accent: "#F59E0B",
  },
];

export default function Education() {
  const { isDark } = useTheme();
  return (
    <section id="education" className="py-16 sm:py-24 px-4 sm:px-6 flex flex-col items-center">
      <motion.div className="text-center mb-14"
        initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}>
        <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
          Education
        </h2>
        <p className={`mt-3 text-base ${isDark ? "text-slate-400" : "text-slate-500"}`}>Academic journey & foundations</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl w-full">
        {educationData.map((item, i) => (
          <motion.div key={item.title}
            initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.55, delay:i*0.15 }} viewport={{ once:true }}
            whileHover={{ y:-4 }}
            className={`relative rounded-2xl p-6 border transition-all duration-300 cursor-default ${
              isDark
                ? "bg-[#0F172A]/70 border-white/[0.07] hover:border-white/15 backdrop-blur-sm"
                : "bg-white border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md"
            }`}
            style={{ borderLeftWidth:"3px", borderLeftColor: item.accent }}
          >
            <div className="text-3xl mb-4">{item.icon}</div>
            <h3 className="text-lg font-bold mb-1" style={{ color: item.accent }}>{item.title}</h3>
            <p className={`text-sm font-medium mb-1 ${isDark ? "text-slate-300" : "text-slate-700"}`}>{item.institute}</p>
            <span className={`text-xs italic mb-3 block ${isDark ? "text-slate-500" : "text-slate-400"}`}>{item.year}</span>
            <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>{item.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
