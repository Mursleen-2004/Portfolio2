import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-[#c5c6c7] px-6 pt-14 pb-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white">Mursleen Bukhari</h3>
          <p className="text-sm mt-1 text-gray-400">Web Developer & AI Enthusiast</p>
        </motion.div>

        {/* Navigation Links */}
        <motion.ul
          className="flex gap-6 text-sm font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {["Home", "Projects", "Contact"].map((link, i) => {
            const isContact = link === "Contact";
            const href = isContact ? "/contact" : `#${link.toLowerCase()}`;

            return (
              <motion.li
                key={i}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a
                  href={href}
                  className="hover:text-[#FCDE59] transition duration-300"
                >
                  {link}
                </a>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Social Icons */}
        <motion.div
          className="flex gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { href: "https://github.com/Mursleen-2004", icon: <FaGithub /> },
            { href: "https://www.linkedin.com/in/mursleen-bukhari-322a86259/", icon: <FaLinkedin /> },
            { href: "musabukhari20@gmail.com", icon: <FaEnvelope /> },
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-xl hover:text-[#FCDE59] transition duration-300"
            >
              {item.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Horizontal Line */}
      <hr className="my-6 border-t   border-[#ffffff7c]" />

      {/* Bottom Copyright */}
      <p className="text-center text-xs text-white tracking-wide">
        © {new Date().getFullYear()} Portfolio. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
