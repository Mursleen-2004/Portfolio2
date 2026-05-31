import html from "../assets/html.png";
import css from "../assets/tailwindcss.png";
import js from "../assets/js.png";
import react from "../assets/react.png";
import node from "../assets/node.png";
import mongo from "../assets/mongodb.png";
import ML from "../assets/machine_learning.png";
import python from "../assets/python.png";

export const skillCategories = ["All", "Frontend", "Backend", "AI & ML"];

export const skills = [
  { name: "HTML/CSS", icon: html, percent: 90, category: "Frontend", level: "Expert" },
  { name: "Tailwind CSS", icon: css, percent: 85, category: "Frontend", level: "Advanced" },
  { name: "JavaScript", icon: js, percent: 82, category: "Frontend", level: "Advanced" },
  { name: "React.js", icon: react, percent: 80, category: "Frontend", level: "Advanced" },
  { name: "Node.js", icon: node, percent: 72, category: "Backend", level: "Intermediate" },
  { name: "MongoDB", icon: mongo, percent: 70, category: "Backend", level: "Intermediate" },
  { name: "Python", icon: python, percent: 70, category: "AI & ML", level: "Intermediate" },
  { name: "Machine Learning", icon: ML, percent: 55, category: "AI & ML", level: "Learning" },
];

export const radarSkills = [
  { name: "React", percent: 80 },
  { name: "Node.js", percent: 72 },
  { name: "MongoDB", percent: 70 },
  { name: "JavaScript", percent: 82 },
  { name: "Python", percent: 70 },
  { name: "ML/AI", percent: 55 },
];

export const levelColors = {
  Expert: "#22c55e",
  Advanced: "#66fcf1",
  Intermediate: "#FCDE59",
  Learning: "#f97316",
};
