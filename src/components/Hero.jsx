import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import heroImage from "../assets/musa.jpg";
import { useTheme } from "../context/ThemeContext";

const orbs = [
  { w: 500, h: 500, top: "-15%", left: "-10%", color: "rgba(139,92,246,0.12)", y: [0, 50, 0], d: 10 },
  { w: 350, h: 350, top: "55%", left: "3%", color: "rgba(34,211,238,0.08)", y: [0, -40, 0], d: 8 },
  { w: 420, h: 420, top: "-5%", right: "-8%", color: "rgba(139,92,246,0.09)", y: [0, 35, 0], d: 12 },
  { w: 300, h: 300, top: "60%", right: "4%", color: "rgba(245,158,11,0.07)", y: [0, -30, 0], d: 9 },
  { w: 200, h: 200, top: "38%", left: "42%", color: "rgba(34,211,238,0.06)", y: [0, 20, 0], d: 7 },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.13 } } };
const item = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };

const socials = [
  { href: "https://github.com/Mursleen-2004", icon: <FaGithub size={18} />, label: "GitHub" },
  { href: "https://www.linkedin.com/in/mursleen-bukhari-322a86259/", icon: <FaLinkedin size={18} />, label: "LinkedIn" },
  { href: "mailto:musabukhari20@gmail.com", icon: <FaEnvelope size={18} />, label: "Email" },
];

export default function Hero() {
  const { isDark } = useTheme();

  const pill = isDark ? "border-[#8B5CF6]/40 text-[#A78BFA] bg-[#8B5CF6]/10"
    : "border-violet-400/50 text-violet-600 bg-violet-50";
  const bio = isDark ? "text-slate-300" : "text-slate-500";
  const socialBtn = isDark
    ? "bg-white/5 hover:bg-[#8B5CF6]/20 text-slate-300 hover:text-[#A78BFA] border border-white/8 hover:border-[#8B5CF6]/40"
    : "bg-slate-100 hover:bg-violet-50 text-slate-500 hover:text-violet-600 border border-slate-200 hover:border-violet-300";

  return (
    <section id="home" className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-4 sm:px-8 md:px-16 pt-24 pb-16 md:py-28 gap-8 md:gap-14 overflow-hidden">

      {/* Orbs */}
      {orbs.map((o, i) => (
        <motion.div key={i} className="absolute rounded-full blur-3xl pointer-events-none"
          style={{ width: o.w, height: o.h, top: o.top, left: o.left, right: o.right, backgroundColor: o.color }}
          animate={{ y: o.y }} transition={{ duration: o.d, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      ))}

      {/* Left */}
      <motion.div className="w-full md:w-1/2 space-y-5 text-center md:text-left z-10"
        variants={container} initial="hidden" animate="visible">

        <motion.div variants={item}>
          <span className={`inline-block text-xs font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full border ${pill}`}>
            Hi, I&apos;m
          </span>
        </motion.div>

        <motion.h1 variants={item}
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
          Mursleen{" "}
          <span style={{ background: "linear-gradient(135deg,#8B5CF6,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Bukhari
          </span>
        </motion.h1>

        <motion.div variants={item}
          className={`text-xl sm:text-2xl font-bold min-h-[2rem] ${isDark ? "text-[#A78BFA]" : "text-violet-600"}`}>
          <Typewriter options={{ strings: ["Full-Stack Web Developer", "Angular & React Developer", "MERN Stack Developer", "Available for Client Projects"], autoStart: true, loop: true }} />
        </motion.div>

        <motion.p variants={item} className={`max-w-lg mx-auto md:mx-0 text-base leading-relaxed ${bio}`}>
          I help businesses and startups turn ideas into fast, production-ready web applications.
          From clean React &amp; Angular frontends to scalable Node.js &amp; PostgreSQL backends — I deliver
          complete solutions that work for your users and grow with your business.
        </motion.p>

        <motion.div variants={item} className="flex justify-center md:justify-start">
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border ${isDark ? "bg-emerald-900/20 border-emerald-500/30 text-emerald-400" : "bg-emerald-50 border-emerald-400/50 text-emerald-600"}`}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Open to Work
          </span>
        </motion.div>

        <motion.div variants={item} className="flex justify-center md:justify-start gap-3">
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
              className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${socialBtn}`}>
              {s.icon}
            </a>
          ))}
        </motion.div>

        <motion.div variants={item} className="flex flex-wrap justify-center md:justify-start gap-3 pt-1">
          <a href="#projects"
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25"
            style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }}>
            View Projects
          </a>
          <a href="/Resume.pdf" download
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 border ${isDark ? "border-[#22D3EE]/40 text-[#22D3EE] hover:bg-[#22D3EE]/10" : "border-sky-400/50 text-sky-600 hover:bg-sky-50"}`}>
            Download CV
          </a>
          <a href="/contact"
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 border ${isDark ? "border-white/15 text-slate-300 hover:border-white/30 hover:bg-white/5" : "border-slate-300 text-slate-600 hover:bg-slate-50"}`}>
            Hire Me
          </a>
        </motion.div>
      </motion.div>

      {/* Right — Image */}
      <motion.div className="w-full md:w-1/2 flex justify-center z-10"
        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}>
        <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="relative">
          {/* Glow */}
          <div className="absolute inset-0 rounded-full blur-3xl opacity-30 scale-110 -z-10"
            style={{ background: "radial-gradient(circle,#7C3AED 0%,#22D3EE 60%,transparent 80%)" }} />
          {/* Gradient ring */}
          <div className="rounded-full p-[3px]" style={{ background: "linear-gradient(135deg,#7C3AED,#22D3EE,#F59E0B)" }}>
            <div className={`rounded-full p-1 ${isDark ? "bg-[#020817]" : "bg-white"}`}>
              <img src={heroImage} alt="Mursleen Bukhari"
                className="w-44 h-44 xs:w-52 xs:h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full object-cover" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
