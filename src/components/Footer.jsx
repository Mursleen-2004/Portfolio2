import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const socials = [
  { href:"https://github.com/Mursleen-2004",                         icon:<FaGithub size={18}/> },
  { href:"https://www.linkedin.com/in/mursleen-bukhari-322a86259/",  icon:<FaLinkedin size={18}/> },
  { href:"mailto:musabukhari20@gmail.com",                           icon:<FaEnvelope size={18}/> },
];

export default function Footer() {
  const { isDark } = useTheme();
  const border = isDark ? "border-white/[0.07]" : "border-slate-200";
  const tx2    = isDark ? "text-slate-400" : "text-slate-500";

  return (
    <footer className={`px-6 pt-12 pb-6 border-t ${border}`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
          <h3 className="text-xl font-extrabold gradient-text">Mursleen Bukhari</h3>
          <p className={`text-sm mt-1 ${tx2}`}>MERN Stack Developer &amp; AI Enthusiast</p>
        </motion.div>

        <motion.ul className="flex gap-6 text-sm" initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration:0.5, delay:0.1 }}>
          {["Home","Projects","Contact"].map((link,i) => (
            <li key={i}>
              <a href={link==="Contact"?"/contact":link==="Home"?"/":`#${link.toLowerCase()}`}
                className={`hover:text-violet-500 transition-colors ${tx2}`}>{link}</a>
            </li>
          ))}
        </motion.ul>

        <motion.div className="flex gap-3" initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration:0.5, delay:0.15 }}>
          {socials.map((s,i) => (
            <a key={i} href={s.href} target="_blank" rel="noreferrer"
              className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                isDark ? "bg-white/5 hover:bg-violet-500/15 text-slate-400 hover:text-violet-400"
                       : "bg-slate-100 hover:bg-violet-50 text-slate-500 hover:text-violet-600"
              }`}>
              {s.icon}
            </a>
          ))}
        </motion.div>
      </div>
      <hr className={`my-6 ${border}`} />
      <p className={`text-center text-xs ${tx2}`}>
        © {new Date().getFullYear()} Mursleen Bukhari. All rights reserved.
      </p>
    </footer>
  );
}
