import React from "react";
import { motion } from "framer-motion";

const educationData = [
  {
    title: "Matriculation",
    institute: "Al-Noor Secondary School, Karachi",
    year: "2019",
    detail:
      "Major in Science with Computer Science. Secured A grade with deep interest in problem-solving and logical thinking.",
    color: "#5D1D5F",
  },
  {
    title: "Intermediate (FSc)",
    institute: "FG Degree College For Boys, Multan cant",
    year: "2019 - 2021",
    detail:
      "Studied ICS. Developed strong foundational knowledge in Mathematics, Statistics, and Computer fundamentals.",
    color: "#4A4215",
  },
  {
    title: "BS Computer Science",
    institute: " Nfc Institute OF Engineering and Technology, Multan ",
    year: "2021 - 2025",
    detail:
      "Focused on Web Development, Data Structures, AI, and Machine Learning. Built multiple MERN and AI-powered projects.",
    color: "#081840",
  },
];

const Education = () => {
  return (
    <section
      id="education"
      className="min-h-screen py-20 px-6  text-white flex flex-col items-center justify-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-10 text-white">
        Education
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl w-full">
        {educationData.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-6 shadow-md backdrop-blur-md border border-white bg-gradient-to-bl to-[#29323c]  from-[#485563] cursor-pointer hover:scale-105 transition-transform duration-500`}
          >
            <h3 className="text-2xl font-semibold text-[#FCDE59] mb-1">
              {item.title}
            </h3>
            <p className="text-md font-medium text-white/80 mb-1">
              {item.institute}
            </p>
            <span className="text-sm text-gray-300 italic mb-3 block">
              {item.year}
            </span>
            <p className="text-sm text-gray-200 leading-relaxed">
              {item.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
