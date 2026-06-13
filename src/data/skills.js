import html from "../assets/html.png";
import css from "../assets/tailwindcss.png";
import js from "../assets/js.png";
import react from "../assets/react.png";
import node from "../assets/node.png";
import mongo from "../assets/mongodb.png";
import ML from "../assets/machine_learning.png";
import python from "../assets/python.png";

import angular from "../assets/angular.svg";
import postgresql from "../assets/postgresql.svg";
import typescript from "../assets/typescript.svg";
import graphql from "../assets/graphql.svg";
import vscode from "../assets/vscode.svg";
import swagger from "../assets/swagger.svg";
import claude from "../assets/claude.svg";
import openaiApi from "../assets/openai.png";
import codex from "../assets/codex.png";

export const skillCategories = ["All", "Frontend", "Backend", "AI & ML", "Tools & APIs"];

export const skills = [
  { name: "HTML/CSS", icon: html, percent: 90, category: "Frontend", level: "Expert" },
  { name: "Tailwind CSS", icon: css, percent: 85, category: "Frontend", level: "Advanced" },
  { name: "JavaScript", icon: js, percent: 82, category: "Frontend", level: "Advanced" },
  { name: "TypeScript", icon: typescript, percent: 78, category: "Frontend", level: "Advanced" },
  { name: "React.js", icon: react, percent: 80, category: "Frontend", level: "Advanced" },
  { name: "Angular", icon: angular, percent: 75, category: "Frontend", level: "Intermediate" },
  { name: "Node.js", icon: node, percent: 72, category: "Backend", level: "Intermediate" },
  { name: "GraphQL", icon: graphql, percent: 65, category: "Backend", level: "Intermediate" },
  { name: "MongoDB", icon: mongo, percent: 70, category: "Backend", level: "Intermediate" },
  { name: "PostgreSQL", icon: postgresql, percent: 68, category: "Backend", level: "Intermediate" },
  { name: "Python", icon: python, percent: 70, category: "AI & ML", level: "Intermediate" },
  { name: "Machine Learning", icon: ML, percent: 55, category: "AI & ML", level: "Learning" },
  { name: "VS Code", icon: vscode, percent: 95, category: "Tools & APIs", level: "Expert" },
  { name: "Claude AI", icon: claude, percent: 90, category: "Tools & APIs", level: "Expert" },
  { name: "OpenAI", icon: openaiApi, percent: 80, category: "Tools & APIs", level: "Advanced" },
  { name: "Swagger", icon: swagger, percent: 72, category: "Tools & APIs", level: "Intermediate" },
  { name: "OpenAI Codex", icon: codex, percent: 70, category: "Tools & APIs", level: "Intermediate" },
];

export const radarSkills = [
  { name: "React", percent: 80 },
  { name: "Angular", percent: 75 },
  { name: "Node.js", percent: 72 },
  { name: "MongoDB", percent: 70 },
  { name: "PostgreSQL", percent: 68 },
  { name: "JavaScript", percent: 82 },
];

export const levelColors = {
  Expert: "#22c55e",
  Advanced: "#66fcf1",
  Intermediate: "#FCDE59",
  Learning: "#f97316",
};
