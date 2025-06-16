import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import html from "../assets/html.png";
import css from "../assets/tailwindcss.png";
import js from "../assets/js.png";
import react from "../assets/react.png";
import node from "../assets/node.png";
import mongo from "../assets/mongodb.png";
import ML from "../assets/machine_learning.png";
import python from "../assets/python.png";

const skills = [
  { name: "HTML", icon: html, percent: 80 },
  { name: "Tailwind CSS", icon: css, percent: 70 },
  { name: "JavaScript", icon: js, percent: 80 },
  { name: "React.js", icon: react, percent: 70 },
  { name: "Node.js", icon: node, percent: 70 },
  { name: "MongoDB", icon: mongo, percent: 70 },
  { name: "Python", icon: python, percent: 70 },
  { name: "ML", icon: ML, percent: 50 },
];

const SkillCircle = ({ name, icon, percent }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = percent / (duration / 20);
    const interval = setInterval(() => {
      start += increment;
      if (start >= percent) {
        start = percent;
        clearInterval(interval);
      }
      setProgress(Math.round(start));
    }, 20);
    return () => clearInterval(interval);
  }, [percent]);

  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        rotateX: 8,
        rotateY: 8,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="transform-style-3d perspective-[1000px] transition-transform duration-500 ease-in-out"
    >
      <div className="flex flex-col items-center justify-center space-y-3">
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center relative"
          style={{
            background: `conic-gradient(#FACF55 ${progress * 3.6}deg, #2c2c2c ${progress * 3.6}deg)`,
          }}
        >
          <div className="absolute w-[90px] h-[90px] cursor-pointer bg-[#020818] rounded-full flex flex-col items-center justify-center border border-white shadow-lg">
            <img src={icon} alt={name} className="w-10 h-10 mb-1" />
            <h4 className="text-xs font-bold text-white">{name}</h4>
            <p className="text-[10px] text-gray-300">{progress}%</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen py-20 px-6  text-white flex flex-col items-center justify-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white drop-shadow-xl">
        Skills
      </h2>

      <div className="grid grid-cols-2 gap-8 max-w-3xl w-full">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <SkillCircle {...skill}  />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
